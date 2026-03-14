import { Lesson } from '../../courses';

export const ch15_04: Lesson = {
            id: 'ch15-04',
            title: '15.4 Rc<T>, Smart Pointer Đếm Tham chiếu',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong phần lớn các trường hợp, ownership rõ ràng: Bạn biết chính xác biến nào sở hữu một giá trị nhất định. Tuy nhiên, có những trường hợp một giá trị duy nhất có thể có nhiều owners. Ví dụ, trong cấu trúc dữ liệu đồ thị, nhiều edges có thể trỏ đến cùng một node, và node đó về mặt khái niệm được sở hữu bởi tất cả các edges trỏ đến nó. Một node không nên được dọn dẹp trừ khi nó không có bất kỳ edges nào trỏ đến nó và do đó không có owners.</p>

<p>Bạn phải enable multiple ownership một cách explicit bằng cách sử dụng kiểu Rust Rc&lt;T&gt;, là viết tắt của reference counting. Kiểu Rc&lt;T&gt; theo dõi số lượng references đến một giá trị để xác định xem giá trị đó có còn đang được sử dụng hay không. Nếu có zero references đến một giá trị, giá trị có thể được cleaned up mà không có bất kỳ references nào trở nên invalid.</p>

<p>Hãy tưởng tượng Rc&lt;T&gt; như một chiếc TV trong phòng khách. Khi một người vào xem TV, họ bật TV lên. Người khác có thể vào phòng và xem TV. Khi người cuối cùng rời khỏi phòng, họ tắt TV vì nó không còn được sử dụng nữa. Nếu ai đó tắt TV trong khi những người khác vẫn đang xem, sẽ có một cuộc náo động từ những người xem TV còn lại!</p>

<p>Chúng ta sử dụng kiểu Rc&lt;T&gt; khi chúng ta muốn allocate một số dữ liệu trên heap cho nhiều parts của chương trình để đọc và chúng ta không thể xác định tại compile time phần nào sẽ finish sử dụng dữ liệu cuối cùng. Nếu chúng ta biết phần nào sẽ finish cuối cùng, chúng ta có thể làm cho phần đó trở thành owner của dữ liệu, và các normal ownership rules được enforce tại compile time sẽ có hiệu lực.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Rc&lt;T&gt; chỉ để sử dụng trong các kịch bản single-threaded. Khi chúng ta thảo luận về concurrency trong Chương 16, chúng ta sẽ cover cách làm reference counting trong các chương trình multithreaded.
</div>

<h3 class="task-heading">Sharing Data (Chia Sẻ Dữ Liệu)</h3>
<p>Hãy trở lại với ví dụ cons list trong Listing 15-5. Nhớ rằng chúng ta định nghĩa nó sử dụng Box&lt;T&gt;. Lần này, chúng ta sẽ tạo hai lists cùng sở hữu một third list. Về mặt khái niệm, nó trông tương tự như Hình 15-3.</p>

<p>Một linked list với nhãn 'a' trỏ đến ba phần tử. Phần tử đầu tiên chứa integer 5 và trỏ đến phần tử thứ hai. Phần tử thứ hai chứa integer 10 và trỏ đến phần tử thứ ba. Phần tử thứ ba chứa giá trị 'Nil' đánh dấu cuối của list; nó không trỏ đâu cả. Một linked list với nhãn 'b' trỏ đến một phần tử chứa integer 3 và trỏ đến phần tử đầu tiên của list 'a'. Một linked list với nhãn 'c' trỏ đến một phần tử chứa integer 4 và cũng trỏ đến phần tử đầu tiên của list 'a' để tails của lists 'b' và 'c' đều là list 'a'.</p>

<p>Chúng ta sẽ tạo list a chứa 5 và sau đó 10. Sau đó, chúng ta sẽ tạo hai lists khác: b bắt đầu với 3 và c bắt đầu với 4. Cả b và c sẽ tiếp tục đến first a list chứa 5 và 10. Nói cách khác, cả hai lists sẽ share first list chứa 5 và 10.</p>

<p>Việc implement kịch bản này sử dụng định nghĩa của List với Box&lt;T&gt; sẽ không hoạt động, như trong Listing 15-17.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
enum List {
    Cons(i32, Box&lt;List&gt;),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a));
    let c = Cons(4, Box::new(a));
}</code></pre>
</div>
<p><em>Listing 15-17: Demonstrating that we're not allowed to have two lists using Box&lt;T&gt; that try to share ownership of a third list</em></p>

<p>Khi chúng ta compile code này, chúng ta nhận được lỗi này:</p>

<pre><code>$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
error[E0382]: use of moved value: \`a\`
  --&gt; src/main.rs:11:30
   |
 9 |     let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
   |         - move occurs because \`a\` has type \`List\`, which does not implement the \`Copy\` trait
10 |     let b = Cons(3, Box::new(a));
   |                              - value moved here
11 |     let c = Cons(4, Box::new(a));
   |                              ^ value used here after move
   |
note: if \`List\` implemented \`Clone\`, you could clone the value
  --&gt; src/main.rs:1:1
   |
 1 | enum List {
   | ^^^^^^^^^ consider implementing \`Clone\` for this type
...
10 |     let b = Cons(3, Box::new(a));
   |                              - you could clone this value</code></pre>

<p>Các Cons variants sở hữu dữ liệu mà chúng giữ, vì vậy khi chúng ta tạo list b, a được move vào b và b sở hữu a. Sau đó, khi chúng ta cố sử dụng a một lần nữa khi tạo c, chúng ta không được phép vì a đã được move.</p>

<p>Chúng ta có thể thay đổi định nghĩa của Cons để giữ references thay vì, nhưng sau đó chúng ta phải specify lifetime parameters. Bằng cách specify lifetime parameters, chúng ta sẽ specify rằng mọi element trong list sẽ sống ít nhất là như entire list. Đây là trường hợp cho các elements và lists trong Listing 15-17, nhưng không phải trong mọi scenario.</p>

<p>Thay vào đó, chúng ta sẽ thay đổi định nghĩa của List để sử dụng Rc&lt;T&gt; thay vì Box&lt;T&gt;, như trong Listing 15-18. Mỗi Cons variant bây giờ sẽ giữ một giá trị và một Rc&lt;T&gt; trỏ đến một List. Khi chúng ta tạo b, thay vì take ownership của a, chúng ta sẽ clone Rc&lt;List&gt; mà a đang giữ, từ đó tăng số lượng references từ một lên hai và cho phép a và b chia sẻ ownership của dữ liệu trong Rc&lt;List&gt; đó. Chúng ta cũng sẽ clone a khi tạo c, tăng số lượng references từ hai lên ba. Mỗi khi chúng ta gọi Rc::clone, reference count đến dữ liệu trong Rc&lt;List&gt; sẽ tăng, và dữ liệu sẽ không được cleaned up trừ khi có zero references đến nó.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum List {
    Cons(i32, Rc&lt;List&gt;),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}</code></pre>
</div>
<p><em>Listing 15-18: A definition of List that uses Rc&lt;T&gt;</em></p>

<p>Chúng ta cần thêm một use statement để đưa Rc&lt;T&gt; vào scope vì nó không có trong prelude. Trong main, chúng ta tạo list chứa 5 và 10 và lưu trữ nó trong một Rc&lt;List&gt; mới trong a. Sau đó, khi chúng ta tạo b và c, chúng ta gọi hàm Rc::clone và truyền một reference đến Rc&lt;List&gt; trong a như một argument.</p>

<p>Chúng ta có thể gọi a.clone() thay vì Rc::clone(&a), nhưng convention của Rust là sử dụng Rc::clone trong trường hợp này. Implementation của Rc::clone không làm deep copy của tất cả dữ liệu như hầu hết các implementations của clone. Lời gọi đến Rc::clone chỉ tăng reference count, không tốn nhiều thời gian. Deep copies của dữ liệu có thể tốn rất nhiều thời gian. Bằng cách sử dụng Rc::clone cho reference counting, chúng ta có thể visually distinguish giữa deep-copy kinds of clones và kinds of clones tăng reference count. Khi tìm kiếm performance problems trong code, chúng ta chỉ cần consider deep-copy clones và có thể disregard các calls đến Rc::clone.</p>

<h3 class="task-heading">Cloning để Tăng Reference Count</h3>
<p>Hãy thay đổi working example của chúng ta trong Listing 15-18 để chúng ta có thể thấy reference counts thay đổi khi chúng ta tạo và drop references đến Rc&lt;List&gt; trong a.</p>

<p>Trong Listing 15-19, chúng ta sẽ thay đổi main để nó có một inner scope xung quanh list c; sau đó, chúng ta có thể thấy reference count thay đổi như thế nào khi c ra khỏi scope.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}</code></pre>
</div>
<p><em>Listing 15-19: Printing the reference count</em></p>

<p>Tại mỗi điểm trong chương trình nơi reference count thay đổi, chúng ta in reference count, mà chúng ta lấy bằng cách gọi hàm Rc::strong_count. Hàm này được đặt tên là strong_count thay vì count vì kiểu Rc&lt;T&gt; cũng có một weak_count; chúng ta sẽ xem weak_count được sử dụng cho gì trong phần "Preventing Reference Cycles Using Weak&lt;T&gt;".</p>

<p>Code này in ra như sau:</p>

<pre><code>$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.45s
     Running \`target/debug/cons-list\`
count after creating a = 1
count after creating b = 2
count after creating c = 3
count after c goes out of scope = 2</code></pre>

<p>Chúng ta có thể thấy rằng Rc&lt;List&gt; trong a có reference count ban đầu là 1; sau đó, mỗi lần chúng ta gọi clone, count tăng lên 1. Khi c ra khỏi scope, count giảm đi 1. Chúng ta không phải gọi một hàm để giảm reference count như chúng ta phải gọi Rc::clone để tăng reference count: Implementation của trait Drop giảm reference count tự động khi một giá trị Rc&lt;T&gt; ra khỏi scope.</p>

<p>Điều chúng ta không thể thấy trong ví dụ này là khi b và sau đó a ra khỏi scope ở cuối main, count là 0, và Rc&lt;List&gt; được cleaned up hoàn toàn. Sử dụng Rc&lt;T&gt; cho phép một giá trị duy nhất có nhiều owners, và count đảm bảo giá trị vẫn valid miễn là bất kỳ owners nào vẫn tồn tại.</p>

<p>Thông qua immutable references, Rc&lt;T&gt; cho phép bạn chia sẻ dữ liệu giữa nhiều parts của chương trình để chỉ đọc. Nếu Rc&lt;T&gt; cho phép bạn có nhiều mutable references too, bạn có thể vi phạm một trong các borrowing rules được thảo luận trong Chương 4: Multiple mutable borrows đến cùng một place có thể gây ra data races và inconsistencies. Nhưng việc có thể mutate dữ liệu rất hữu ích! Trong phần tiếp theo, chúng ta sẽ thảo luận về interior mutability pattern và kiểu RefCell&lt;T&gt; mà bạn có thể sử dụng kết hợp với Rc&lt;T&gt; để làm việc với immutability restriction này.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Rc&lt;T&gt;:</strong>
  <ul>
    <li><strong>Rc&lt;T&gt;</strong> - Smart pointer đếm tham chiếu, cho phép nhiều owners</li>
    <li><strong>Reference count</strong> - Theo dõi số lượng references đến giá trị</li>
    <li><strong>Auto cleanup</strong> - Tự động giải phóng khi count = 0</li>
    <li><strong>Rc::clone</strong> - Tăng count, không deep copy dữ liệu</li>
    <li><strong>Drop trait</strong> - Tự động giảm count khi ra khỏi scope</li>
    <li><strong>Chỉ immutable</strong> - Chỉ cho phép đọc, không mutable</li>
    <li><strong>Single-threaded</strong> - Chỉ dùng trong single-thread</li>
  </ul>
</div>
`,
            defaultCode: `use std::rc::Rc;

enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    // Tạo list a với Rc để cho phép share ownership
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count sau khi tạo a = {}", Rc::strong_count(&a));

    // b share ownership với a - count tăng lên 2
    let b = Cons(3, Rc::clone(&a));
    println!("count sau khi tạo b = {}", Rc::strong_count(&a));

    // c cũng share ownership với a - count tăng lên 3
    let c = Cons(4, Rc::clone(&a));
    println!("count sau khi tạo c = {}", Rc::strong_count(&a));

    // Khi c ra khỏi scope, count giảm xuống 2
    // Khi b và a ra khỏi scope, count = 0 và được cleaned up
}
`,
            expectedOutput: `count sau khi tạo a = 1
count sau khi tạo b = 2
count sau khi tạo c = 3`
        };
