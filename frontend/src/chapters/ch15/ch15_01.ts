import { Lesson } from '../../courses';

export const ch15_01: Lesson = {
            id: 'ch15-01',
            title: '15.1 Box<T> — Dữ liệu trên Heap',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Smart pointer đơn giản nhất là một box, có kiểu được viết là Box<T>. Boxes cho phép bạn lưu trữ dữ liệu trên heap thay vì stack. Phần còn lại trên stack là pointer đến heap data. Hãy xem lại Chương 4 để xem sự khác biệt giữa stack và heap.</p>

<p>Boxes không có performance overhead, ngoài việc lưu trữ dữ liệu của chúng trên heap thay vì trên stack. Nhưng chúng cũng không có nhiều extra capabilities. Bạn sẽ sử dụng chúng nhất trong những tình huống sau:</p>

<ul>
  <li>Khi bạn có một kiểu mà kích thước không thể biết được tại compile time, và bạn muốn sử dụng một giá trị của kiểu đó trong một context yêu cầu một kích thước chính xác</li>
  <li>Khi bạn có một lượng lớn dữ liệu, và bạn muốn chuyển ownership nhưng đảm bảo rằng dữ liệu sẽ không được copy khi bạn làm điều đó</li>
  <li>Khi bạn muốn sở hữu một giá trị, và bạn chỉ quan tâm rằng đó là một kiểu implement một trait cụ thể thay vì là một kiểu cụ thể</li>
</ul>

<p>Chúng ta sẽ demonstrate tình huống đầu tiên trong "Enabling Recursive Types with Boxes". Trong trường hợp thứ hai, việc chuyển ownership của một lượng lớn dữ liệu có thể tốn thời gian vì dữ liệu được copy xung quanh trên stack. Để cải thiện hiệu suất trong tình huống này, chúng ta có thể lưu trữ lượng lớn dữ liệu trên heap trong một box. Sau đó, chỉ có một lượng nhỏ pointer data được copy xung quanh trên stack, trong khi dữ liệu mà nó tham chiếu vẫn ở một nơi trên heap. Trường hợp thứ ba được gọi là trait object, và "Using Trait Objects to Abstract over Shared Behavior" trong Chương 18 được dành cho chủ đề đó.</p>

<h3 class="task-heading">Lưu trữ Dữ liệu trên Heap</h3>
<p>Trước khi chúng ta thảo luận về use case lưu trữ heap cho Box<T>, chúng ta sẽ cover cú pháp và cách tương tác với các giá trị được lưu trữ trong một Box<T>.</p>

<p>Listing 15-1 cho thấy cách sử dụng một box để lưu trữ một giá trị i32 trên heap.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let b = Box::new(5);
    println!("b = {b}");
}</code></pre>
</div>
<p><em>Listing 15-1: Storing an i32 value on the heap using a box</em></p>

<p>Chúng ta định nghĩa biến b để có giá trị của một Box trỏ đến giá trị 5, được allocate trên heap. Chương trình này sẽ in b = 5; trong trường hợp này, chúng ta có thể truy cập dữ liệu trong box tương tự như cách chúng ta làm nếu dữ liệu này trên stack. Giống như bất kỳ owned value nào, khi một box ra khỏi scope, như b tại cuối main, nó sẽ được deallocate. Việc deallocation xảy ra cho cả box (được lưu trên stack) và dữ liệu mà nó trỏ đến (được lưu trên heap).</p>

<p>Việc đặt một giá trị đơn lẻ trên heap không hữu ích lắm, vì vậy bạn sẽ không sử dụng boxes theo cách này thường xuyên. Việc có các giá trị như một i32 đơn lẻ trên stack, nơi chúng được lưu theo mặc định, là phù hợp hơn trong hầu hết các tình huống. Hãy xem một trường hợp mà boxes cho phép chúng ta định nghĩa các kiểu mà chúng ta không được phép định nghĩa nếu không có boxes.</p>

<h3 class="task-heading">Cho phép Recursive Types với Boxes</h3>
<p>Một giá trị của kiểu recursive có thể có một giá trị khác cùng kiểu như một phần của chính nó. Các kiểu recursive đặt ra một vấn đề vì Rust cần biết tại compile time một kiểu chiếm bao nhiêu không gian. Tuy nhiên, việc lồng các giá trị của các kiểu recursive có thể tiếp tục vô hạn về mặt lý thuyết, vì vậy Rust không thể biết cần bao nhiêu không gian cho giá trị đó. Bởi vì boxes có kích thước đã biết, chúng ta có thể cho phép các kiểu recursive bằng cách chèn một box trong định nghĩa kiểu recursive.</p>

<p>Như một ví dụ về kiểu recursive, hãy khám phá cons list. Đây là một kiểu dữ liệu thường thấy trong các ngôn ngữ lập trình functional. Kiểu cons list mà chúng ta sẽ định nghĩa đơn giản ngoại trừ recursion; do đó, các khái niệm trong ví dụ chúng ta sẽ làm việc sẽ hữu ích bất cứ khi nào bạn vào các tình huống phức tạp hơn liên quan đến các kiểu recursive.</p>

<h4>Understanding the Cons List</h4>
<p>Một cons list là một cấu trúc dữ liệu đến từ ngôn ngữ lập trình Lisp và các dialect của nó, được tạo thành từ các cặp lồng nhau, và là phiên bản Lisp của một linked list. Tên của nó đến từ hàm cons (viết tắt của construct function) trong Lisp, hàm này construct một cặp mới từ hai arguments của nó. Bằng cách gọi cons trên một cặp bao gồm một giá trị và một cặp khác, chúng ta có thể construct các cons lists được tạo thành từ các cặp recursive.</p>

<p>Ví dụ, đây là một đại diện pseudocode của một cons list chứa list 1, 2, 3 với mỗi cặp trong ngoặc:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>(1, (2, (3, Nil)))</code></pre>
</div>

<p>Mỗi item trong một cons list chứa hai phần tử: giá trị của item hiện tại và của item tiếp theo. Item cuối cùng trong list chỉ chứa một giá trị được gọi là Nil mà không có item tiếp theo. Một cons list được produce bằng cách gọi hàm cons một cách recursive. Tên canonical để denote base case của recursion là Nil. Lưu ý rằng điều này không giống như khái niệm "null" hoặc "nil" được thảo luận trong Chương 6, đó là một giá trị không hợp lệ hoặc không có.</p>

<p>Cons list không phải là cấu trúc dữ liệu thường được sử dụng trong Rust. Hầu hết thời gian khi bạn có một list các items trong Rust, Vec<T> là lựa chọn tốt hơn để sử dụng. Các kiểu dữ liệu recursive phức tạp hơn khác hữu ích trong các tình huống khác nhau, nhưng bắt đầu với cons list trong chương này, chúng ta có thể khám phá cách boxes cho phép chúng ta định nghĩa một kiểu dữ liệu recursive mà không bị phân tâm nhiều.</p>

<p>Listing 15-2 chứa một định nghĩa enum cho một cons list. Lưu ý rằng code này sẽ không compile, vì kiểu List không có kích thước đã biết.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
enum List {
    Cons(i32, List),
    Nil,
}</code></pre>
</div>
<p><em>Listing 15-2: The first attempt at defining an enum to represent a cons list data structure of i32 values</em></p>

<p>Sử dụng kiểu List để lưu list 1, 2, 3 sẽ trông như code trong Listing 15-3.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Cons(2, Cons(3, Nil)));
}</code></pre>
</div>
<p><em>Listing 15-3: Using the List enum to store the list 1, 2, 3</em></p>

<p>Nếu chúng ta cố gắng compile code trong Listing 15-3, chúng ta sẽ nhận được error được hiển thị trong Listing 15-4.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
error[E0072]: recursive type \`List\` has infinite size
 --> src/main.rs:1:1
  |
1 | enum List {
  | ^^^^^^^^^
2 |     Cons(i32, List),
  |               ---- recursive without indirection
  |
help: insert some indirection (e.g., a \`Box\`, \`Rc\`, or \`&\`) to break the cycle
  |
2 |     Cons(i32, Box&lt;List&gt;),
  |               ++++    +

error[E0391]: cycle detected when computing when \`List\` needs drop</code></pre>
</div>
<p><em>Listing 15-4: The error we get when attempting to define a recursive enum</em></p>

<p>Error cho thấy kiểu này "has infinite size." Lý do là vì chúng ta đã định nghĩa List với một variant là recursive: Nó chứa một giá trị khác của chính nó một cách trực tiếp. Kết quả là, Rust không thể tìm ra cần bao nhiêu không gian để lưu trữ một giá trị List.</p>

<h3 class="task-heading">Lấy Recursive Type với Kích thước Đã biết</h3>
<p>Bởi vì Rust không thể tìm ra bao nhiêu không gian để allocate cho các kiểu recursive được định nghĩa, compiler đưa ra một error với đề xuất hữu ích này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>help: insert some indirection (e.g., a \`Box\`, \`Rc\`, or \`&\`) to break the cycle
  |
2 |     Cons(i32, Box&lt;List&gt;),
  |               ++++    +</code></pre>
</div>

<p>Trong đề xuất này, indirection có nghĩa là thay vì lưu trữ một giá trị trực tiếp, chúng ta nên thay đổi cấu trúc dữ liệu để lưu trữ giá trị gián tiếp bằng cách lưu trữ một pointer đến giá trị thay vì.</p>

<p>Bởi vì Box<T> là một pointer, Rust luôn biết Box<T> cần bao nhiêu không gian: Kích thước của một pointer không thay đổi dựa trên lượng dữ liệu mà nó đang trỏ đến. Điều này có nghĩa là chúng ta có thể đặt một Box<T> bên trong variant Cons thay vì một giá trị List khác trực tiếp. Box<T> sẽ trỏ đến giá trị List tiếp theo sẽ ở trên heap thay vì bên trong variant Cons. Về mặt khái niệm, chúng ta vẫn có một list, được tạo với các lists chứa các lists khác, nhưng implementation này giờ giống như đặt các items cạnh nhau hơn là bên trong nhau.</p>

<p>Chúng ta có thể thay đổi định nghĩa của List enum trong Listing 15-2 và việc sử dụng List trong Listing 15-3 thành code trong Listing 15-5, code này sẽ compile.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum List {
    Cons(i32, Box&lt;List&gt;),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}</code></pre>
</div>
<p><em>Listing 15-5: The definition of List that uses Box&lt;T&gt; in order to have a known size</em></p>

<p>Variant Cons cần kích thước của một i32 cộng với không gian để lưu trữ pointer data của box. Variant Nil không lưu giá trị nào, vì vậy nó cần ít không gian hơn trên stack so với variant Cons. Bây giờ chúng ta biết rằng bất kỳ giá trị List nào sẽ chiếm kích thước của một i32 cộng với kích thước của pointer data của một box. Bằng cách sử dụng box, chúng ta đã phá vỡ chuỗi recursive vô hạn, vì vậy compiler có thể tìm ra kích thước cần thiết để lưu trữ một giá trị List.</p>

<p>Boxes cung cấp chỉ indirection và heap allocation; chúng không có bất kỳ khả năng đặc biệt nào khác, như những gì chúng ta sẽ thấy với các loại smart pointer khác. Chúng cũng không có performance overhead mà các khả năng đặc biệt này gây ra, vì vậy chúng có thể hữu ích trong các trường hợp như cons list nơi indirection là tính năng duy nhất chúng ta cần.</p>

<p>Loại Box<T> là một smart pointer vì nó implement trait Deref, cho phép các giá trị Box<T> được đối xử như references. Khi một giá trị Box<T> ra khỏi scope, heap data mà box trỏ đến cũng được cleaned up nhờ implementation của trait Drop. Hai traits này sẽ còn quan trọng hơn đối với chức năng được cung cấp bởi các loại smart pointer khác mà chúng ta sẽ thảo luận trong phần còn lại của chương này.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Box&lt;T&gt;:</strong>
  <ul>
    <li><strong>Box::new()</strong> - Tạo box trên heap</li>
    <li><strong>Deref trait</strong> - Cho phép dereference với *</li>
    <li><strong>Drop trait</strong> - Tự động cleanup khi ra khỏi scope</li>
    <li><strong>Recursive types</strong> - Box cho phép định nghĩa kiểu recursive</li>
    <li><strong>Indirection</strong> - Lưu pointer thay vì giá trị trực tiếp</li>
  </ul>
</div>
`,
            defaultCode: `// Linked List với Box
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn list_to_vec(list: &List) -> Vec<i32> {
    let mut result = Vec::new();
    let mut current = list;
    loop {
        match current {
            Cons(val, next) => {
                result.push(*val);
                current = next;
            }
            Nil => break,
        }
    }
    result
}

fn main() {
    // Box cơ bản
    let boxed = Box::new(42);
    println!("Boxed value: {}", *boxed);

    // Linked List
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    let vec = list_to_vec(&list);
    println!("List -> Vec: {:?}", vec);

    // Box cho trait objects
    let animals: Vec<Box<dyn std::fmt::Display>> = vec![
        Box::new("Mèo"),
        Box::new(42),
        Box::new(3.14),
    ];
    print!("Mixed types: ");
    for a in &animals {
        print!("{a} ");
    }
    println!();
}
`,
            expectedOutput: 'Boxed value: 42\nList -> Vec: [1, 2, 3]\nMixed types: Mèo 42 3.14 '
        };
