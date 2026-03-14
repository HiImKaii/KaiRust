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

<p>Biến x chứa giá trị i32 là 5. Chúng ta đặt y bằng một reference đến x. Chúng ta có thể assert rằng x bằng 5. Tuy nhiên, nếu chúng ta muốn assert về giá trị trong y, chúng ta phải sử dụng *y để theo reference đến giá trị mà nó trỏ đến.</p>

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

<p>Cú pháp type Target = T; định nghĩa một associated type cho trait Deref sử dụng.</p>

<p>Chúng ta fill in body của phương thức deref với &self.0 để deref trả về một reference đến giá trị mà chúng ta muốn truy cập với toán tử *.</p>

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

<p>Ở đây chúng ta gọi hàm hello với argument &m, đó là một reference đến giá trị MyBox<String>. Bởi vì chúng ta đã implement trait Deref trên MyBox<T>, Rust có thể biến &MyBox<String> thành &String bằng cách gọi deref. Standard library cung cấp implementation của Deref trên String trả về một string slice.</p>

<p>Nếu Rust không implement deref coercion, chúng ta sẽ phải viết code khó đọc hơn nhiều.</p>

<h3 class="task-heading">Xử lý Deref Coercion với Mutable References</h3>
<p>Giống như cách bạn sử dụng trait Deref để override toán tử * trên immutable references, bạn có thể sử dụng trait DerefMut để override toán tử * trên mutable references.</p>

<p>Rust thực hiện deref coercion trong ba trường hợp:</p>
<ul>
  <li>Từ &T đến &U khi T: Deref<Target=U></li>
  <li>Từ &mut T đến &mut U khi T: DerefMut<Target=U></li>
  <li>Từ &mut T đến &U khi T: Deref<Target=U></li>
</ul>

<p>Trường hợp thứ ba khó hiểu hơn: Rust cũng sẽ coerce một mutable reference thành một immutable one. Nhưng ngược lại không thể: Immutable references sẽ không bao giờ coerce thành mutable references.</p>

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
