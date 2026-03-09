import { Lesson } from '../../courses';

export const ch03_03: Lesson = {
  id: 'ch03-03',
  title: '3.3 Hàm (Functions)',
  duration: '25 phút',
  type: 'theory',
  content: `
<p>Hàm (functions) có mặt ở khắp nơi trong code Rust. Bạn đã thấy một trong những hàm quan trọng nhất: hàm <code>main</code>, là điểm vào (entry point) của mọi chương trình. Bạn cũng đã thấy từ khóa <code>fn</code>, cho phép khai báo hàm mới.</p>

<p>Code Rust sử dụng quy ước <strong>snake_case</strong> cho tên hàm và tên biến, trong đó tất cả các chữ cái đều viết thường và các từ được phân tách bằng dấu gạch dưới.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello from main!");
    another_function();
}

fn another_function() {
    println!("Hello from another function!");
}</code></pre>
</div>

<p>Rust không quan tâm bạn định nghĩa hàm ở đâu, trước hay sau <code>main</code> đều được — miễn chúng được định nghĩa ở một nơi nào đó mà caller (phía gọi hàm) có thể thấy.</p>

<h3 class="task-heading">Tham số (Parameters)</h3>

<p>Chúng ta có thể định nghĩa hàm có <strong>tham số</strong> (parameters). Khi hàm có tham số, bạn cung cấp các giá trị cụ thể gọi là <strong>arguments</strong> (đối số). Trong Rust, bạn <strong>bắt buộc</strong> phải khai báo kiểu cho mỗi parameter.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Parameter</em> (tham số) là biến trong định nghĩa hàm. <em>Argument</em> (đối số) là giá trị cụ thể bạn truyền vào khi gọi hàm.
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}

fn main() {
    print_labeled_measurement(5, 'h');
}</code></pre>
</div>

<p>Kết quả: <code>The measurement is: 5h</code></p>

<h3 class="task-heading">Câu lệnh và Biểu thức (Statements vs Expressions)</h3>

<p>Thân hàm bao gồm một chuỗi câu lệnh (statements) và tùy chọn kết thúc bằng biểu thức (expression). Rust phân biệt rất rõ giữa hai khái niệm này:</p>

<table class="comparison-table">
  <tr>
    <th>Câu lệnh (Statements)</th>
    <th>Biểu thức (Expressions)</th>
  </tr>
  <tr>
    <td>Thực hiện hành động</td>
    <td>Tính toán và trả về giá trị</td>
  </tr>
  <tr>
    <td><strong>Không trả về</strong> giá trị</td>
    <td><strong>Trả về</strong> giá trị</td>
  </tr>
  <tr>
    <td>Ví dụ: <code>let y = 6;</code></td>
    <td>Ví dụ: <code>5 + 6</code>, block <code>{ ... }</code></td>
  </tr>
</table>

<div class="cyber-alert warning">
  <strong>Quan trọng:</strong> Expression <strong>không</strong> có dấu chấm phẩy ở cuối. Nếu thêm <code>;</code>, nó trở thành statement và không trả về giá trị nữa!
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let y = {
        let x = 3;
        x + 1  // Expression - không có ; nên trả về 4
    };
    println!("The value of y is: {y}"); // y = 4
}</code></pre>
</div>

<h3 class="task-heading">Giá trị Trả về (Return Values)</h3>

<p>Hàm có thể trả về giá trị. Khai báo kiểu trả về sau mũi tên <code>-></code>. Giá trị trả về là <strong>biểu thức cuối cùng</strong> trong thân hàm (implicit return). Bạn có thể dùng <code>return</code> sớm nếu cần.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn five() -> i32 {
    5  // implicit return
}

fn plus_one(x: i32) -> i32 {
    x + 1  // implicit return
}

fn main() {
    let x = five();
    println!("five() = {x}");      // 5
    let y = plus_one(5);
    println!("plus_one(5) = {y}"); // 6
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Implicit return</em> (trả về ngầm định) là cách Rust tự động trả về giá trị của biểu thức cuối cùng trong thân hàm mà không cần từ khóa <code>return</code>.
</div>

<h4>Lỗi thường gặp: Thêm ; vào cuối expression</h4>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn plus_one(x: i32) -> i32 {
    x + 1;  // LỖI! Thành statement, trả về ()
}</code></pre>
</div>

<p>Kết quả lỗi:</p>
<pre class="error-block">error[E0308]: mismatched types
  |
2 |     x + 1;
  |         - help: remove this semicolon to compute value and return it
  |
3 | }
  |  - expected i32, found ()</pre>

<h3 class="task-heading">Tổng kết</h3>

<ul class="task-list">
  <li><strong>Hàm</strong> trong Rust sử dụng quy ước đặt tên snake_case</li>
  <li><strong>Tham số</strong> bắt buộc phải có type annotation</li>
  <li><strong>Statements</strong> không trả về giá trị, <strong>Expressions</strong> trả về giá trị</li>
  <li><strong>Implicit return</strong>: biểu thức cuối cùng trong hàm được tự động trả về</li>
  <li><strong>Không thêm ;</strong> vào cuối expression nếu muốn trả về giá trị</li>
</ul>
`,
  defaultCode: `fn main() {
    greet("Rust");
    let result = add(5, 3);
    println!("5 + 3 = {result}");

    let area = calculate_area(10, 5);
    println!("Diện tích: {area}");
}

fn greet(name: &str) {
    println!("Xin chào, {name}!");
}

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn calculate_area(width: i32, height: i32) -> i32 {
    width * height
}
`,
  expectedOutput: 'Xin chào, Rust!\n5 + 3 = 8\nDiện tích: 50'
};
