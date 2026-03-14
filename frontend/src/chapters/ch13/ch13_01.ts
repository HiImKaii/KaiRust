import { Lesson } from '../../courses';

export const ch13_01: Lesson = {
            id: 'ch13-01',
            title: '13.1 Closures: Hàm ẩn danh',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Closures trong Rust là các hàm ẩn danh mà bạn có thể lưu trữ trong một biến hoặc truyền chúng như các đối số cho các hàm khác. Bạn có thể tạo closure ở một nơi và sau đó gọi closure ở nơi khác để đánh giá nó trong một ngữ cảnh khác. Không giống như các hàm, closures có thể capture các giá trị từ scope mà chúng được định nghĩa. Chúng ta sẽ demonstrate cách các tính năng này của closure cho phép tái sử dụng code và tùy chỉnh hành vi.</p>

<h3 class="task-heading">Capturing môi trường</h3>
<p>Trước tiên, chúng ta sẽ xem xét cách chúng ta có thể sử dụng closures để capture các giá trị từ môi trường mà chúng được định nghĩa để sử dụng sau đó. Đây là kịch bản: Thỉnh thoảng, công ty áo thun của chúng ta tặng một chiếc áo độc quyền, giới hạn cho một ai đó trong danh sách gửi thư như một khuyến mãi. Những người trong danh sách gửi thư có thể tùy chọn thêm màu yêu thích của họ vào hồ sơ. Nếu người được chọn nhận áo miễn phí có màu yêu thích được đặt, họ sẽ nhận được chiếc áo màu đó. Nếu người đó chưa chỉ định màu yêu thích, họ sẽ nhận được bất kỳ màu nào mà công ty hiện có nhiều nhất.</p>

<p>Có nhiều cách để implement điều này. Cho ví dụ này, chúng ta sẽ sử dụng một enum gọi là ShirtColor có các variants Red và Blue (giới hạn số lượng màu có sẵn để đơn giản hóa). Chúng ta biểu diễn inventory của công ty với một Inventory struct có một field tên là shirts chứa Vec<ShirtColor> đại diện cho các màu áo hiện có trong kho. Method giveaway được định nghĩa trên Inventory lấy shirt color preference tùy chọn của người thắng áo miễn phí, và nó trả về màu áo mà người đó sẽ nhận. Cài đặt này được hiển thị trong Listing 13-1.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug, PartialEq, Copy, Clone)]
enum ShirtColor {
    Red,
    Blue,
}

struct Inventory {
    shirts: Vec&lt;ShirtColor&gt;,
}

impl Inventory {
    fn giveaway(&self, user_preference: Option&lt;ShirtColor&gt;) -> ShirtColor {
        user_preference.unwrap_or_else(|| self.most_stocked())
    }

    fn most_stocked(&self) -> ShirtColor {
        let mut num_red = 0;
        let mut num_blue = 0;

        for color in &self.shirts {
            match color {
                ShirtColor::Red => num_red += 1,
                ShirtColor::Blue => num_blue += 1,
            }
        }
        if num_red > num_blue {
            ShirtColor::Red
        } else {
            ShirtColor::Blue
        }
    }
}

fn main() {
    let store = Inventory {
        shirts: vec![ShirtColor::Blue, ShirtColor::Red, ShirtColor::Blue],
    };

    let user_pref1 = Some(ShirtColor::Red);
    let giveaway1 = store.giveaway(user_pref1);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref1, giveaway1
    );

    let user_pref2 = None;
    let giveaway2 = store.giveaway(user_pref2);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref2, giveaway2
    );
}</code></pre>
</div>
<p><em>Listing 13-1: Shirt company giveaway situation</em></p>

<p>Store được định nghĩa trong main có hai chiếc áo màu xanh lam và một chiếc áo màu đỏ còn lại để phân phối cho khuyến mãi giới hạn này. Chúng ta gọi giveaway method cho một người dùng có preference cho một chiếc áo màu đỏ và một người dùng không có preference nào.</p>

<p>Một lần nữa, code này có thể được implement theo nhiều cách, và ở đây, để tập trung vào closures, chúng ta đã stick với các khái niệm bạn đã học, ngoại trừ body của giveaway method sử dụng một closure. Trong giveaway method, chúng ta lấy user preference như một tham số kiểu Option<ShirtColor> và gọi unwrap_or_else method trên user_preference. unwrap_or_else method trên Option<T> được định nghĩa bởi standard library. Nó nhận một đối số: một closure không có đối số nào trả về một giá trị T (cùng kiểu được lưu trữ trong Some variant của Option<T>, trong trường hợp này là ShirtColor). Nếu Option<T> là Some variant, unwrap_or_else trả về giá trị từ bên trong Some. Nếu Option<T> là None variant, unwrap_or_else gọi closure và trả về giá trị được trả về bởi closure.</p>

<p>Chúng ta specify closure expression || self.most_stocked() như đối số cho unwrap_or_else. Đây là một closure không nhận tham số nào (nếu closure có tham số, chúng sẽ xuất hiện giữa hai dấu gạch đứng). Body của closure gọi self.most_stocked(). Chúng ta đang định nghĩa closure ở đây, và implementation của unwrap_or_else sẽ evaluate closure sau đó nếu cần.</p>

<p>Chạy code này in ra:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling shirt-company v0.1.0 (file:///projects/shirt-company)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.27s
     Running \`target/debug/shirt-company\`
The user with preference Some(Red) gets Red
The user with preference None gets Blue</code></pre>
</div>

<p>Một khía cạnh thú vị ở đây là chúng ta đã truyền một closure gọi self.most_stocked() trên Inventory instance hiện tại. Standard library không cần biết gì về Inventory hoặc ShirtColor types mà chúng ta định nghĩa, hoặc logic chúng ta muốn sử dụng trong kịch bản này. Closure capture một immutable reference đến self Inventory instance và truyền nó với code chúng ta specify đến unwrap_or_else method. Functions, mặt khác, không thể capture môi trường của chúng theo cách này.</p>

<h3 class="task-heading">Inferring và Annotating Closure Types</h3>
<p>Có nhiều khác biệt hơn giữa functions và closures. Closures thường không yêu cầu bạn annotate các kiểu của các tham số hoặc kiểu trả về như các fn functions. Type annotations được yêu cầu trên functions vì các kiểu là một phần của interface explicit được expose cho người dùng. Định nghĩa interface này cứng nhắc là quan trọng để đảm bảo mọi người đồng ý về các kiểu giá trị mà một function sử dụng và trả về. Closures, mặt khác, không được sử dụng trong một exposed interface như vậy: Chúng được lưu trữ trong các biến, và chúng được sử dụng mà không đặt tên và expose chúng cho người dùng của thư viện.</p>

<p>Closures thường ngắn và chỉ relevant trong một ngữ cảnh hẹp thay vì trong bất kỳ scenario tùy ý nào. Trong những ngữ cảnh giới hạn này, compiler có thể infer các kiểu của các tham số và kiểu trả về, tương tự như cách nó có thể infer các kiểu của hầu hết các biến (có những trường hợp hiếm mà compiler cũng cần closure type annotations).</p>

<p>Giống như với các biến, chúng ta có thể thêm type annotations nếu chúng ta muốn tăng tính rõ ràng và minh bạch với chi phí là verbose hơn mức cần thiết. Annotating các kiểu cho một closure sẽ như định nghĩa được hiển thị trong Listing 13-2. Trong ví dụ này, chúng ta đang định nghĩa một closure và lưu trữ nó trong một biến thay vì định nghĩa closure ở nơi chúng ta truyền nó như một đối số, như chúng ta đã làm trong Listing 13-1.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    let expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };</code></pre>
</div>
<p><em>Listing 13-2: Adding optional type annotations of the parameter and return value types in the closure</em></p>

<p>Với type annotations được thêm vào, cú pháp của closures trông giống cú pháp của functions hơn. Ở đây, chúng ta định nghĩa một function cộng 1 vào tham số của nó và một closure có cùng hành vi, để so sánh. Chúng ta đã thêm một số khoảng trắng để align các phần liên quan. Điều này minh họa cú pháp closure tương tự cú pháp function ngoại trừ việc sử dụng pipes và số lượng cú pháp tùy chọn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn  add_one_v1   (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 };
let add_one_v4 = |x|               x + 1  ;</code></pre>
</div>

<p>Dòng đầu tiên cho thấy định nghĩa function và dòng thứ hai cho thấy closure definition được annotate đầy đủ. Trong dòng thứ ba, chúng ta remove type annotations từ closure definition. Trong dòng thứ tư, chúng ta remove các brackets, là tùy chọn vì closure body chỉ có một expression. Tất cả các định nghĩa này đều valid và sẽ produce cùng hành vi khi được gọi. Các dòng add_one_v3 và add_one_v4 yêu cầu closures được evaluate để có thể compile vì các kiểu sẽ được infer từ usage của chúng. Điều này tương tự như let v = Vec::new(); cần type annotations hoặc values của một số kiểu được insert vào Vec để Rust có thể infer kiểu.</p>

<p>Đối với closure definitions, compiler sẽ infer một concrete type cho mỗi tham số và cho kiểu trả về của chúng. Ví dụ, Listing 13-3 cho thấy định nghĩa của một closure ngắn chỉ trả về giá trị nó nhận như một tham số. Closure này không hữu ích lắm ngoại trừ cho mục đích của ví dụ này. Lưu ý rằng chúng ta đã không thêm bất kỳ type annotations nào vào định nghĩa. Vì không có type annotations, chúng ta có thể gọi closure với bất kỳ kiểu nào, điều chúng ta đã làm với String lần đầu tiên. Nếu sau đó chúng ta cố gọi example_closure với một integer, chúng ta sẽ get một error.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    let example_closure = |x| x;

    let s = example_closure(String::from("hello"));
    let n = example_closure(5);</code></pre>
</div>
<p><em>Listing 13-3: Attempting to call a closure whose types are inferred with two different types</em></p>

<p>Compiler cho chúng ta error này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling closure-example v0.1.0 (file:///projects/closure-example)
error[E0308]: mismatched types
 --> src/main.rs:5:29
  |
5 |     let n = example_closure(5);
  |             --------------- ^ expected \`String\`, found integer
  |             |
  |             arguments to this function are incorrect
  |
note: expected because the closure was earlier called with an argument of type \`String\`
 --> src/main.rs:4:29
  |
4 |     let s = example_closure(String::from("hello"));
  |             --------------- ^^^^^^^^^^^^^^^^^^^^^ expected because this argument is of type \`String\`
  |             |
  |             in this closure call
note: closure parameter defined here
 --> src/main.rs:2:28
  |
2 |     let example_closure = |x| x;
  |                            ^
help: try using a conversion method
  |
5 |     let n = example_closure(5.to_string());
  |                              ++++++++++++</code></pre>
</div>

<p>Lần đầu tiên chúng ta gọi example_closure với giá trị String, compiler infer kiểu của x và kiểu trả về của closure là String. Các kiểu đó sau đó bị lock vào closure trong example_closure, và chúng ta get một type error khi cố gắng sử dụng một kiểu khác với cùng closure.</p>

<h3 class="task-heading">Capturing References hoặc Moving Ownership</h3>
<p>Closures có thể capture các giá trị từ môi trường của chúng theo ba cách, which directly map đến ba cách một function có thể lấy một tham số: borrowing immutably, borrowing mutably, và taking ownership. Closure sẽ quyết định cái nào trong số này để sử dụng dựa trên body của function làm gì với các captured values.</p>

<p>Trong Listing 13-4, chúng ta định nghĩa một closure capture một immutable reference đến vector tên là list vì nó chỉ cần một immutable reference để in giá trị.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let only_borrows = || println!("From closure: {list:?}");

    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
}</code></pre>
</div>
<p><em>Listing 13-4: Defining and calling a closure that captures an immutable reference</em></p>

<p>Ví dụ này cũng minh họa rằng một biến có thể bind đến một closure definition, và chúng ta có thể sau đó gọi closure bằng cách sử dụng tên biến và dấu ngoặc đơn như thể tên biến là tên function.</p>

<p>Vì chúng ta có thể có nhiều immutable references đến list cùng lúc, list vẫn có thể truy cập được từ code trước closure definition, sau closure definition nhưng trước khi closure được gọi, và sau khi closure được gọi. Code này compiles, runs, và prints:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling closure-example v0.1.0 (file:///projects/closure-example)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running \`target/debug/closure-example\`
Before defining closure: [1, 2, 3]
Before calling closure: [1, 2, 3]
From closure: [1, 2, 3]
After calling closure: [1, 2, 3]</code></pre>
</div>

<p>Tiếp theo, trong Listing 13-5, chúng ta thay đổi closure body để nó thêm một element vào list vector. Closure bây giờ capture một mutable reference.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let mut borrows_mutably = || list.push(7);

    borrows_mutably();
    println!("After calling closure: {list:?}");
}</code></pre>
</div>
<p><em>Listing 13-5: Defining and calling a closure that captures a mutable reference</em></p>

<p>Code này compiles, runs, và prints:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling closure-example v0.1.0 (file:///projects/closure-example)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running \`target/debug/closure-example\`
Before defining closure: [1, 2, 3]
After calling closure: [1, 2, 3, 7]</code></pre>
</div>

<p>Lưu ý rằng không còn println! nào giữa definition và call của borrows_mutably closure: Khi borrows_mutably được định nghĩa, nó capture một mutable reference đến list. Chúng ta không sử dụng closure nữa sau khi closure được gọi, vì vậy mutable borrow kết thúc. Giữa closure definition và closure call, một immutable borrow để in không được cho phép, vì không có borrows nào khác được cho phép khi có một mutable borrow. Thử thêm println! ở đó để xem message error bạn get!</p>

<p>Nếu bạn muốn force closure để take ownership của các giá trị nó sử dụng trong môi trường ngay cả khi body của closure không cần ownership chặt chẽ, bạn có thể sử dụng từ khóa move trước parameter list.</p>

<p>Kỹ thuật này hữu ích nhất khi truyền một closure cho một new thread để move data để nó được sở hữu bởi thread mới. Chúng ta sẽ thảo luận về threads và tại sao bạn muốn sử dụng chúng trong Chương 16 khi nói về concurrency, nhưng bây giờ, hãy briefly explore spawning một new thread sử dụng một closure cần từ khóa move. Listing 13-6 cho thấy Listing 13-4 được sửa đổi để in vector trong một new thread thay vì trong main thread.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();
}</code></pre>
</div>
<p><em>Listing 13-6: Using move to force the closure for the thread to take ownership of list</em></p>

<p>Chúng ta spawn một new thread, cho thread một closure để chạy như một đối số. Closure body in ra list. Trong Listing 13-4, closure chỉ capture list sử dụng một immutable reference vì đó là ít quyền truy cập vào list cần để in nó. Trong ví dụ này, mặc dù closure body vẫn chỉ cần một immutable reference, chúng ta cần specify rằng list nên được move vào closure bằng cách đặt từ khóa move ở đầu closure definition. Nếu main thread thực hiện nhiều operations hơn trước khi gọi join trên new thread, new thread có thể kết thúc trước phần còn lại của main thread, hoặc main thread có thể kết thúc trước. Nếu main thread sở hữu list nhưng kết thúc trước new thread và drop list, immutable reference trong thread sẽ invalid. Do đó, compiler yêu cầu list được move vào closure được đưa cho new thread để reference sẽ valid. Thử remove từ khóa move hoặc sử dụng list trong main thread sau khi closure được định nghĩa để xem compiler errors bạn get!</p>

<h3 class="task-heading">Moving Captured Values Out of Closures</h3>
<p>Khi một closure đã capture một reference hoặc capture ownership của một giá trị từ môi trường nơi closure được định nghĩa (do đó ảnh hưởng đến điều gì, nếu có gì, được move vào closure), code trong body của closure định nghĩa điều gì xảy ra với các references hoặc values khi closure được evaluate sau đó (do đó ảnh hưởng đến điều gì, nếu có gì, được move ra khỏi closure).</p>

<p>Closure body có thể làm bất kỳ điều nào sau: Move một captured value ra khỏi closure, mutate captured value, không move cũng không mutate value, hoặc capture nothing từ môi trường ngay từ đầu.</p>

<p>Cách closure capture và xử lý các giá trị từ môi trường ảnh hưởng đến closure implement những traits nào, và traits là cách functions và structs có thể specify closures nào chúng có thể sử dụng. Closures sẽ tự động implement một, hai, hoặc cả ba Fn traits này, theo cách additive, tùy thuộc vào cách body của closure xử lý các giá trị:</p>

<ul>
  <li><strong>FnOnce</strong> áp dụng cho closures có thể được gọi một lần. Tất cả closures implement ít nhất trait này vì tất cả closures có thể được gọi. Một closure move captured values ra khỏi body của nó sẽ chỉ implement FnOnce và không có Fn traits nào khác vì nó chỉ có thể được gọi một lần.</li>
  <li><strong>FnMut</strong> áp dụng cho closures không move captured values ra khỏi body của chúng nhưng có thể mutate các captured values. Các closures này có thể được gọi nhiều hơn một lần.</li>
  <li><strong>Fn</strong> áp dụng cho closures không move captured values ra khỏi body của chúng và không mutate captured values, cũng như closures không capture gì từ môi trường của chúng. Các closures này có thể được gọi nhiều hơn một lần mà không mutate môi trường của chúng, điều quan trọng trong các cases như gọi một closure nhiều lần đồng thời.</li>
</ul>

<p>Hãy xem định nghĩa của unwrap_or_else method trên Option<T> mà chúng ta đã sử dụng trong Listing 13-1:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl&lt;T&gt; Option&lt;T&gt; {
    pub fn unwrap_or_else&lt;F&gt;(self, f: F) -> T
    where
        F: FnOnce() -> T
    {
        match self {
            Some(x) => x,
            None => f(),
        }
    }
}</code></pre>
</div>

<p>Nhớ rằng T là generic type đại diện cho kiểu của giá trị trong Some variant của Option. Kiểu T cũng là kiểu trả về của unwrap_or_else function: Code gọi unwrap_or_else trên Option<String>, ví dụ, sẽ nhận một String.</p>

<p>Tiếp theo, lưu ý rằng unwrap_or_else function có thêm generic type parameter F. Kiểu F là kiểu của tham số tên là f, đó là closure chúng ta cung cấp khi gọi unwrap_or_else.</p>

<p>Trait bound được specify trên generic type F là FnOnce() -> T, có nghĩa là F phải có thể được gọi một lần, không nhận đối số, và trả về T. Sử dụng FnOnce trong trait bound thể hiện rằng unwrap_or_else sẽ không gọi f nhiều hơn một lần. Trong body của unwrap_or_else, chúng ta có thể thấy rằng nếu Option là Some, f sẽ không được gọi. Nếu Option là None, f sẽ được gọi một lần. Vì tất cả closures implement FnOnce, unwrap_or_else chấp nhận cả ba loại closures và linh hoạt nhất có thể.</p>

<p>Lưu ý: Nếu điều chúng ta muốn làm không cần capture một giá trị từ môi trường, chúng ta có thể sử dụng tên của một function thay vì closure ở nơi chúng ta cần một thứ gì đó implement một trong các Fn traits. Ví dụ, trên một Option<Vec<T>> value, chúng ta có thể gọi unwrap_or_else(Vec::new) để nhận một vector rỗng mới nếu value là None. Compiler tự động implement bất kỳ Fn traits nào applicable cho một function definition.</p>

<p>Bây giờ hãy xem method sort_by_key được định nghĩa trên slices, để xem điều đó khác với unwrap_or_else như thế nào và tại sao sort_by_key sử dụng FnMut thay vì FnOnce cho trait bound. Closure nhận một đối số dưới dạng một reference đến item hiện tại trong slice đang được xem xét, và nó trả về một giá trị kiểu K có thể được order. Function này hữu ích khi bạn muốn sort một slice theo một thuộc tính cụ thể của mỗi item. Trong Listing 13-7, chúng ta có một danh sách các Rectangle instances, và chúng ta sử dụng sort_by_key để order chúng theo thuộc tính width từ thấp đến cao.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    list.sort_by_key(|r| r.width);
    println!("{list:#?}");
}</code></pre>
</div>
<p><em>Listing 13-7: Using sort_by_key to order rectangles by width</em></p>

<p>Code này prints:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.41s
     Running \`target/debug/rectangles\`
[
    Rectangle {
        width: 3,
        height: 5,
    },
    Rectangle {
        width: 7,
        height: 12,
    },
    Rectangle {
        width: 10,
        height: 1,
    },
]</code></pre>
</div>

<p>Lý do sort_by_key được định nghĩa để nhận một FnMut closure vì nó gọi closure nhiều lần: một lần cho mỗi item trong slice. Closure |r| r.width không capture, mutate, hoặc move bất kỳ gì từ môi trường của nó, vì vậy nó đáp ứng yêu cầu của trait bound.</p>

<p>Ngược lại, Listing 13-8 cho thấy một ví dụ về một closure chỉ implement FnOnce trait, vì nó move một giá trị ra khỏi môi trường. Compiler sẽ không cho phép chúng ta sử dụng closure này với sort_by_key.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut sort_operations = vec![];
    let value = String::from("closure called");

    list.sort_by_key(|r| {
        sort_operations.push(value);
        r.width
    });
    println!("{list:#?}");
}</code></pre>
</div>
<p><em>Listing 13-8: Attempting to use an FnOnce closure with sort_by_key</em></p>

<p>Đây là một contrived, convoluted way (không hoạt động) để cố đếm số lần sort_by_key gọi closure khi sorting list. Code này cố làm điều đó bằng cách push value—a String từ môi trường của closure—vào sort_operations vector. Closure capture value và sau đó move value ra khỏi closure bằng cách chuyển ownership của value sang sort_operations vector. Closure này có thể được gọi một lần; cố gọi nó lần thứ hai sẽ không hoạt động, vì value sẽ không còn trong môi trường để push vào sort_operations nữa! Do đó, closure này chỉ implement FnOnce. Khi chúng ta cố compile code này, chúng ta get error rằng value không thể move ra khỏi closure vì closure phải implement FnMut:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
error[E0507]: cannot move out of \`value\`, a captured variable in an \`FnMut\` closure
  --> src/main.rs:18:30
   |
15 |     let value = String::from("closure called");
   |         -----   ------------------------------ move occurs because \`value\` has type \`String\`, which does not implement the \`Copy\` trait
   |         |
   |         captured outer variable
16 |
17 |     list.sort_by_key(|r| {
   |                      --- captured by this \`FnMut\` closure
18 |         sort_operations.push(value);
   |                              ^^^^^ \`value\` is moved here
   |
help: consider cloning the value if the performance cost is acceptable
   |
18 |         sort_operations.push(value.clone());
   |                                   ++++++++</code></pre>
</div>

<p>Error trỏ đến dòng trong closure body move value ra khỏi môi trường. Để fix điều này, chúng ta cần thay đổi closure body để nó không move values ra khỏi môi trường. Giữ một counter trong môi trường và tăng giá trị của nó trong closure body là một cách straightforward hơn để đếm số lần closure được gọi. Closure trong Listing 13-9 hoạt động với sort_by_key vì nó chỉ capture một mutable reference đến num_sort_operations counter và có thể được gọi nhiều hơn một lần.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut num_sort_operations = 0;
    list.sort_by_key(|r| {
        num_sort_operations += 1;
        r.width
    });
    println!("{list:#?}, sorted in {num_sort_operations} operations");
}</code></pre>
</div>
<p><em>Listing 13-9: Using an FnMut closure with sort_by_key is allowed.</em></p>

<p>Các Fn traits quan trọng khi định nghĩa hoặc sử dụng functions hoặc types sử dụng closures. Trong phần tiếp theo, chúng ta sẽ thảo luận về iterators. Nhiều iterator methods nhận closure arguments, vì vậy hãy giữ những chi tiết closure này trong đầu khi chúng ta tiếp tục!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Closures:</strong>
  <ul>
    <li><strong>Closure syntax</strong> - |x| x + 1 hoặc |x: i32| -> i32 { x + 1 }</li>
    <li><strong>Capture environment</strong> - Có thể capture biến từ scope bao quanh</li>
    <li><strong>FnOnce</strong> - Có thể gọi một lần, move captured values</li>
    <li><strong>FnMut</strong> - Có thể gọi nhiều lần, mutate captured values</li>
    <li><strong>Fn</strong> - Có thể gọi nhiều lần, không mutate</li>
    <li><strong>move keyword</strong> - Force ownership transfer</li>
    <li><strong>unwrap_or_else</strong> - Sử dụng FnOnce trait</li>
    <li><strong>sort_by_key</strong> - Sử dụng FnMut trait</li>
  </ul>
</div>
`,
            defaultCode: `fn main() {
    // Closure co ban
    let square = |x: i32| x * x;
    println!("5^2 = {}", square(5));

    // Capture environment
    let multiplier = 3;
    let multiply = |x| x * multiplier;
    println!("7 * {multiplier} = {}", multiply(7));

    // Vec voi closure
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let evens: Vec<&i32> = numbers.iter()
        .filter(|x| *x % 2 == 0)
        .collect();
    println!("So chan: {:?}", evens);

    let squared: Vec<i32> = numbers.iter()
        .map(|x| x * x)
        .collect();
    println!("Binh phuong: {:?}", squared);

    let sum: i32 = numbers.iter().sum();
    println!("Tong: {sum}");
}
`,
            expectedOutput: '5^2 = 25\n7 * 3 = 21\nSo chan: [2, 4, 6, 8, 10]\nBinh phuong: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nTong: 55'
        };
