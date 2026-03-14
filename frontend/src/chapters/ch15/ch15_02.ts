import { Lesson } from '../../courses';

export const ch15_02: Lesson = {
            id: 'ch15-02',
            title: '15.2 Đối xử với Smart Pointers như Regular References',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Implement trait Deref cho phép bạn tùy chỉnh hành vi của toán tử dereference * (không nhầm lẫn với toán tử nhân hoặc toán tử glob). Bằng cách implement Deref theo cách smart pointer có thể được đối xử như regular reference, bạn có thể viết code operate trên references và sử dụng code đó với smart pointers.</p>

<h3 class="task-heading">Theo Reference đến Value</h3>
<p>Một regular reference là một loại pointer, và một cách để nghĩ về pointer là như một mũi tên đến một giá trị được lưu ở nơi khác. Trong Listing 15-6, chúng ta tạo một reference đến giá trị i32 và sau đó sử dụng toán tử dereference để theo reference đến giá trị đó.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}</code></pre>
</div>
<p><em>Listing 15-6: Using the dereference operator to follow a reference to an i32 value</em></p>

<p>Biến x chứa giá trị i32 là 5. Chúng ta đặt y bằng một reference đến x. Chúng ta có thể assert rằng x bằng 5. Tuy nhiên, nếu chúng ta muốn assert về giá trị trong y, chúng ta phải sử dụng <code>*y</code> để theo reference đến giá trị mà nó trỏ đến (do đó, gọi là dereference) để compiler có thể so sánh giá trị thực. Sau khi dereference y, chúng ta có quyền truy cập vào giá trị integer mà y trỏ đến để so sánh với 5.</p>

<p>Nếu chúng ta cố viết <code>assert_eq!(5, y);</code> thay vào đó, chúng ta sẽ nhận được lỗi compile như sau:</p>

<pre><code>$ cargo run
   Compiling deref-example v0.1.0 (file:///projects/deref-example)
error[E0277]: can&apos;t compare \`{integer}\` with \`&{integer}\`
 --&gt; src/main.rs:6:5
  |
6 |     assert_eq!(5, y);
  |     ^^^^^^^^^^^^^^^^ no implementation for \`{integer}\` == \`&{integer}\`
  |
  = help: the trait \`PartialEq<&{integer}&gt;\` is not implemented for \`{integer}\`
  = note: this error originates in the macro \`assert_eq\` (in Nightly builds, run with -Z macro-backtrace for more info)

For more information about this error, try \`rustc --explain E0277\`.
error: could not compile \`deref-example\` (bin "deref-example") due to 1 previous error</code></pre>

<p>Việc so sánh một số và một reference đến số không được cho phép vì chúng là các kiểu dữ liệu khác nhau. Chúng ta phải sử dụng toán tử dereference để theo reference đến giá trị mà nó trỏ đến.</p>

<h3 class="task-heading">Sử dụng Box<T> Như một Reference</h3>
<p>Chúng ta có thể viết lại code trong Listing 15-6 để sử dụng Box<T> thay vì reference; toán tử dereference được sử dụng trên Box<T> trong Listing 15-7 hoạt động theo cùng cách với toán tử dereference được sử dụng trên reference trong Listing 15-6.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}</code></pre>
</div>
<p><em>Listing 15-7: Using the dereference operator on a Box&lt;i32&gt;</em></p>

<p>Sự khác biệt chính giữa Listing 15-7 và Listing 15-6 là ở đây chúng ta đặt y thành một instance của một box trỏ đến một copied value của x thay vì một reference trỏ đến giá trị của x. Trong assertion cuối cùng, chúng ta có thể sử dụng toán tử dereference để theo pointer của box theo cùng cách mà chúng ta làm khi y là một reference.</p>

<h3 class="task-heading">Định nghĩa Smart Pointer Của Riêng Chúng Ta</h3>
<p>Hãy build một wrapper type tương tự như loại Box<T> được cung cấp bởi standard library để trải nghiệm smart pointer types behave khác với references như thế nào theo mặc định. Sau đó, chúng ta sẽ xem cách thêm khả năng sử dụng toán tử dereference.</p>

<p>Lưu ý: Có một sự khác biệt lớn giữa loại MyBox<T> mà chúng ta sắp build và Box<T> thực: Phiên bản của chúng ta sẽ không lưu dữ liệu trên heap. Chúng ta tập trung ví dụ này vào Deref, vì vậy nơi dữ liệu thực sự được lưu không quan trọng bằng hành vi giống pointer.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct MyBox&lt;T&gt;(T);

impl&lt;T&gt; MyBox&lt;T&gt; {
    fn new(x: T) -> MyBox&lt;T&gt; {
        MyBox(x)
    }
}</code></pre>
</div>
<p><em>Listing 15-8: Defining a MyBox&lt;T&gt; type</em></p>

<p>Hãy thử thêm main function vào Listing 15-8 và thay đổi để sử dụng MyBox<T> mà chúng ta đã định nghĩa thay vì Box<T>. Code trong Listing 15-9 sẽ không compile, vì Rust không biết cách dereference MyBox.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}</code></pre>
</div>
<p><em>Listing 15-9: Attempting to use MyBox&lt;T&gt; in the same way we used references and Box&lt;T&gt;</em></p>

<p>Đây là lỗi compile resulting:</p>

<pre><code>$ cargo run
   Compiling deref-example v0.1.0 (file:///projects/deref-example)
error[E0614]: type \`MyBox&lt;{integer}&gt;\` cannot be dereferenced
  --> src/main.rs:14:19
   |
14 |     assert_eq!(5, *y);
   |                   ^^ can't be dereferenced

For more information about this error, try \`rustc --explain E0614\`.
error: could not compile \`deref-example\` (bin "deref-example") due to 1 previous error</code></pre>

<p>Kiểu MyBox&lt;T&gt; của chúng ta không thể được dereference vì chúng ta chưa implement khả năng đó trên kiểu của mình. Để enable dereferencing với toán tử <code>*</code>, chúng ta implement trait Deref.</p>

<h3 class="task-heading">Implement Trait Deref</h3>
<p>Để enable dereferencing với toán tử *, chúng ta implement trait Deref.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::ops::Deref;

impl&lt;T&gt; Deref for MyBox&lt;T&gt; {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}</code></pre>
</div>
<p><em>Listing 15-10: Implementing Deref on MyBox&lt;T&gt;</em></p>

<p>Cú pháp <code>type Target = T;</code> định nghĩa một associated type cho trait Deref sử dụng. Associated types là một cách hơi khác để khai báo một generic parameter, nhưng bạn không cần lo lắng về chúng bây giờ; chúng ta sẽ cover chi tiết hơn trong Chương 20.</p>

<p>Chúng ta điền vào body của phương thức deref với <code>&self.0</code> để deref trả về một reference đến giá trị mà chúng ta muốn truy cập với toán tử <code>*</code>; nhớ lại từ "Creating Different Types with Tuple Structs" trong Chương 5 rằng <code>.0</code> truy cập giá trị đầu tiên trong một tuple struct. Main function trong Listing 15-9 gọi <code>*</code> trên giá trị MyBox<T> bây giờ sẽ compile, và các assertions đều pass!</p>

<h4 class="task-subheading">Cơ Chế Hoạt Động Của Dereference</h4>
<p>Không có trait Deref, compiler chỉ có thể dereference các reference <code>&</code>. Phương thức deref cung cấp cho compiler khả năng lấy giá trị của bất kỳ kiểu nào implement Deref và gọi phương thức deref để lấy một reference mà compiler biết cách dereference.</p>

<p>Khi chúng ta nhập <code>*y</code> trong Listing 15-9, đằng sau hậu trường Rust thực ra chạy code này:</p>

<pre><code>*(y.deref())</code></pre>

<p>Rust thay thế toán tử <code>*</code> bằng một lời gọi đến phương thức deref và sau đó là một plain dereference để chúng ta không phải suy nghĩ về việc có cần gọi phương thức deref hay không. Tính năng này của Rust cho phép chúng ta viết code hoạt động giống hệt nhau cho dù chúng ta có một regular reference hay một kiểu implement Deref.</p>

<p>Lý do phương thức deref trả về một reference đến giá trị, và plain dereference bên ngoài dấu ngoặc trong <code>*(y.deref())</code> vẫn cần thiết, có liên quan đến hệ thống ownership. Nếu phương thức deref trả về giá trị trực tiếp thay vì một reference đến giá trị, giá trị sẽ bị di chuyển ra khỏi self. Chúng ta không muốn take ownership của giá trị bên trong MyBox<T> trong trường hợp này hoặc trong hầu hết các trường hợp khi sử dụng toán tử dereference.</p>

<p>Lưu ý rằng toán tử <code>*</code> được thay thế bằng một lời gọi đến phương thức deref và sau đó là một lời gọi đến toán tử <code>*</code> chỉ một lần, mỗi khi chúng ta sử dụng <code>*</code> trong code. Vì sự thay thế của toán tử <code>*</code> không lặp lại vô hạn, chúng ta có được dữ liệu có kiểu i32, khớp với 5 trong assert_eq! trong Listing 15-9.</p>

<h3 class="task-heading">Sử dụng Deref Coercion trong Functions và Methods</h3>
<p>Deref coercion chuyển đổi một reference đến một loại implement trait Deref thành một reference đến loại khác. Ví dụ, deref coercion có thể chuyển đổi &String thành &str vì String implement trait Deref để nó trả về &str.</p>

<p>Deref coercion là một tiện lợi mà Rust thực hiện trên arguments cho functions và methods, và nó chỉ hoạt động trên các loại implement trait Deref.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn hello(name: &str) {
    println!("Hello, {name}!");
}</code></pre>
</div>
<p><em>Listing 15-11: A hello function that has the parameter name of type &str</em></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&m);
}</code></pre>
</div>
<p><em>Listing 15-12: Calling hello with a reference to a MyBox&lt;String&gt; value</em></p>

<p>Ở đây chúng ta gọi hàm hello với argument <code>&m</code>, đó là một reference đến giá trị MyBox<String>. Bởi vì chúng ta đã implement trait Deref trên MyBox<T>, Rust có thể biến <code>&MyBox&lt;String&gt;</code> thành <code>&String</code> bằng cách gọi deref. Standard library cung cấp implementation của Deref trên String trả về một string slice, và điều này có trong tài liệu API cho Deref. Rust gọi deref một lần nữa để biến <code>&String</code> thành <code>&str</code>, khớp với định nghĩa của hàm hello.</p>

<p>Nếu Rust không implement deref coercion, chúng ta sẽ phải viết code như trong Listing 15-13 thay vì code trong Listing 15-12 để gọi hello với giá trị kiểu <code>&MyBox&lt;String&gt;</code>.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&(*m)[..]);
}</code></pre>
</div>
<p><em>Listing 15-13: The code we would have to write if Rust didn't have deref coercion</em></p>

<p><code>(*m)</code> dereference MyBox<String> thành String. Sau đó, <code>&</code> và <code>[..]</code> lấy một string slice của String bằng toàn bộ string để khớp với signature của hello. Code này không có deref coercions khó đọc, khó viết và khó hiểu hơn với tất cả các ký hiệu liên quan. Deref coercion cho phép Rust xử lý các chuyển đổi này cho chúng ta một cách tự động.</p>

<p>Khi trait Deref được định nghĩa cho các kiểu liên quan, Rust sẽ phân tích các kiểu và sử dụng Deref::deref bao nhiêu lần tùy thích để lấy reference khớp với kiểu của tham số. Số lần Deref::deref cần được chèn được resolve tại compile time, vì vậy không có runtime penalty khi tận dụng deref coercion!</p>

<h3 class="task-heading">Xử lý Deref Coercion với Mutable References</h3>
<p>Giống như cách bạn sử dụng trait Deref để override toán tử * trên immutable references, bạn có thể sử dụng trait DerefMut để override toán tử * trên mutable references.</p>

<p>Rust thực hiện deref coercion trong ba trường hợp:</p>
<ul>
  <li>Từ &T đến &U khi T: Deref<Target=U></li>
  <li>Từ &mut T đến &mut U khi T: DerefMut<Target=U></li>
  <li>Từ &mut T đến &U khi T: Deref<Target=U></li>
</ul>

<p>Trường hợp thứ ba khó hiểu hơn: Rust cũng sẽ coerce một mutable reference thành một immutable one. Nhưng ngược lại không thể: Immutable references sẽ không bao giờ coerce thành mutable references. Bởi vì các borrowing rules, nếu bạn có một mutable reference, mutable reference đó phải là reference duy nhất đến dữ liệu đó (nếu không, chương trình sẽ không compile). Chuyển đổi một mutable reference thành một immutable reference sẽ không bao giờ phá vỡ các borrowing rules. Việc chuyển đổi một immutable reference thành một mutable reference sẽ yêu cầu rằng initial immutable reference là immutable reference duy nhất đến dữ liệu đó, nhưng các borrowing rules không đảm bảo điều đó. Do đó, Rust không thể giả định rằng việc chuyển đổi một immutable reference thành một mutable reference là có thể.</p>

<p>Deref coercion được thêm vào Rust để các lập trình viên viết function và method calls không cần thêm quá nhiều explicit references và dereferences với <code>&</code> và <code>*</code>. Tính năng deref coercion cũng cho phép chúng ta viết nhiều code hơn có thể hoạt động cho cả references hoặc smart pointers.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Deref Trait:</strong>
  <ul>
    <li><strong>Deref trait</strong> - Cho phép sử dụng * để dereference</li>
    <li><strong>deref() method</strong> - Trả về reference đến inner data</li>
    <li><strong>Deref coercion</strong> - Tự động chuyển đổi types</li>
    <li><strong>DerefMut trait</strong> - Cho mutable references</li>
    <li><strong>Không có runtime overhead</strong> - Được resolve tại compile time</li>
  </ul>
</div>
`,
            defaultCode: `use std::ops::Deref;

// Định nghĩa MyBox - smart pointer đơn giản
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

// Implement Deref để sử dụng như reference
impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn hello(name: &str) {
    println!("Xin chào, {name}!");
}

fn main() {
    // Sử dụng như regular value
    let x = 5;
    let y = MyBox::new(x);
    assert_eq!(5, *y); // Dereference với *

    // Sử dụng với function - Deref coercion
    let m = MyBox::new(String::from("Rust"));
    hello(&m); // Tự động coerce &MyBox<String> -> &String -> &str

    // So sánh với Box
    let boxed = Box::new(10);
    assert_eq!(10, *boxed);

    println!("Tất cả tests passed!");
}
`,
            expectedOutput: 'Tất cả tests passed!'
        };
