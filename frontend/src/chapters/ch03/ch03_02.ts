import { Lesson } from '../../courses';

export const ch03_02: Lesson = {
      id: 'ch03-02',
      title: '3.2 Kiểu dữ liệu (Data Types)',
      duration: '30 phút',
      type: 'theory',
      content: `
<p>Mọi giá trị trong Rust đều có một <strong>kiểu dữ liệu</strong> (data type) cụ thể, cho Rust biết loại dữ liệu nào đang được chỉ định để nó biết cách làm việc với dữ liệu đó. Chúng ta sẽ xem xét hai tập con kiểu dữ liệu: <strong>scalar</strong> (vô hướng) và <strong>compound</strong> (phức hợp).</p>

<p>Hãy nhớ rằng Rust là ngôn ngữ <strong>statically typed</strong> (kiểu tĩnh), có nghĩa là nó phải biết kiểu của tất cả các biến tại thời điểm biên dịch (compile time). Trình biên dịch thường có thể suy luận (infer) kiểu dữ liệu dựa trên giá trị và cách chúng ta sử dụng nó. Trong trường hợp nhiều kiểu có thể xảy ra, chẳng hạn như khi chúng ta chuyển đổi <code>String</code> thành kiểu số bằng <code>parse</code> ở Chương 2, chúng ta phải thêm chú thích kiểu (type annotation):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = "42".parse().expect("Not a number!");</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>statically typed</em> (kiểu tĩnh) nghĩa là trình biên dịch phải biết kiểu của mọi biến tại thời điểm biên dịch. <em>Type annotation</em> (chú thích kiểu) là cách bạn chủ động khai báo kiểu cho biến khi trình biên dịch không tự suy luận được.
</div>

<h3 class="task-heading">Kiểu Vô hướng (Scalar Types)</h3>
<p>Một kiểu scalar đại diện cho một giá trị đơn lẻ. Rust có bốn kiểu scalar chính: <strong>integers</strong> (số nguyên), <strong>floating-point numbers</strong> (số thực dấu phẩy động), <strong>Booleans</strong> (giá trị logic), và <strong>characters</strong> (ký tự).</p>

<h4>1. Integer (Số nguyên)</h4>
<p>Một integer là một số không có phần thập phân. Mỗi biến thể có thể có dấu (signed) hoặc không dấu (unsigned) và có kích thước rõ ràng:</p>
<table class="data-table">
  <tr><th>Độ dài</th><th>Có dấu (signed)</th><th>Không dấu (unsigned)</th></tr>
  <tr><td>8-bit</td><td>i8</td><td>u8</td></tr>
  <tr><td>16-bit</td><td>i16</td><td>u16</td></tr>
  <tr><td>32-bit</td><td>i32</td><td>u32</td></tr>
  <tr><td>64-bit</td><td>i64</td><td>u64</td></tr>
  <tr><td>128-bit</td><td>i128</td><td>u128</td></tr>
  <tr><td>arch</td><td>isize</td><td>usize</td></tr>
</table>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Signed</em> (có dấu) nghĩa là số đó có thể âm. <em>Unsigned</em> (không dấu) nghĩa luôn dương hoặc 0. Kiểu <em>isize/usize</em> phụ thuộc vào kiến trúc máy tính (32-bit hoặc 64-bit).
</div>

<p>Số nguyên mặc định trong Rust là <code>i32</code>. Kiểu <code>isize</code> hoặc <code>usize</code> thường dùng khi đánh chỉ mục (indexing) một tập hợp nào đó.</p>

<h4>Integer Overflow</h4>
<p>Giả sử bạn có biến kiểu <code>u8</code> có thể giữ giá trị từ 0 đến 255. Nếu bạn cố gán giá trị ngoài phạm vi đó (ví dụ 256), sẽ xảy ra <strong>integer overflow</strong>. Trong chế độ debug, Rust sẽ <em>panic</em> (dừng chương trình). Trong chế độ release (<code>--release</code>), Rust thực hiện <em>two's complement wrapping</em> (giá trị 256 trở thành 0, 257 thành 1, v.v.).</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Integer overflow</em> (tràn số nguyên) xảy ra khi giá trị vượt quá phạm vi lưu trữ của kiểu. <em>panic</em> là cách Rust dừng chương trình khi phát hiện lỗi không thể phục hồi.
</div>

<h4>2. Floating-Point (Số thực dấu phẩy động)</h4>
<p>Rust có hai kiểu floating-point: <code>f32</code> (32-bit, độ chính xác đơn) và <code>f64</code> (64-bit, độ chính xác kép). Kiểu mặc định là <code>f64</code> vì trên các CPU hiện đại, tốc độ xấp xỉ như <code>f32</code> nhưng chính xác hơn nhiều.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 2.0;      // f64 (mặc định)
    let y: f32 = 3.0;  // f32
}</code></pre>
</div>

<h4>Phép toán số học (Numeric Operations)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let sum = 5 + 10;          // cộng
    let difference = 95.5 - 4.3; // trừ
    let product = 4 * 30;       // nhân
    let quotient = 56.7 / 32.2; // chia
    let truncated = -5 / 3;     // kết quả: -1 (cắt phần thập phân)
    let remainder = 43 % 5;     // chia lấy dư
}</code></pre>
</div>

<h4>3. Boolean</h4>
<p>Kiểu Boolean trong Rust có hai giá trị: <code>true</code> và <code>false</code>. Kích thước một byte. Chú thích kiểu là <code>bool</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let t = true;
let f: bool = false;  // chú thích kiểu rõ ràng</code></pre>
</div>

<h4>4. Character (Ký tự)</h4>
<p>Kiểu <code>char</code> của Rust là kiểu chữ cái nguyên thủy nhất. Lưu ý: các literal <code>char</code> được chỉ định bằng <strong>dấu nháy đơn</strong>, khác với string literal dùng dấu nháy kép. Kiểu <code>char</code> có kích thước 4 byte và đại diện cho một Unicode Scalar Value:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let c = 'z';
let z: char = 'Z';
let heart_eyed_cat = '😻'; // Unicode!</code></pre>
</div>

<h3 class="task-heading">Kiểu phức hợp (Compound Types)</h3>
<p>Kiểu compound có thể nhóm nhiều giá trị vào một kiểu. Rust có hai kiểu compound nguyên thủy: <strong>tuples</strong> và <strong>arrays</strong>.</p>

<h4>Tuple</h4>
<p>Một tuple nhóm nhiều giá trị với <strong>các kiểu khác nhau</strong> vào một kiểu phức hợp. Tuple có <strong>độ dài cố định</strong>: một khi được khai báo, chúng không thể tăng hoặc giảm kích thước.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // Destructuring (phân rã)
    let (x, y, z) = tup;
    println!("y = {y}");

    // Truy cập bằng index (dấu chấm)
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>destructuring</em> (phân rã) là kỹ thuật tách một cấu trúc phức hợp (tuple, struct, ...) thành các phần riêng lẻ. <em>Unit tuple</em> <code>()</code> là tuple rỗng, đại diện cho kiểu trả về mặc định khi không có giá trị nào được trả về.
</div>

<h4>Array</h4>
<p>Khác với tuple, mọi phần tử trong array phải có <strong>cùng kiểu</strong>. Array trong Rust có <strong>độ dài cố định</strong>. Array hữu ích khi bạn muốn dữ liệu được phân bổ trên <em>stack</em> thay vì <em>heap</em>, hoặc khi bạn muốn đảm bảo luôn có một số lượng phần tử cố định.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [1, 2, 3, 4, 5];
let a: [i32; 5] = [1, 2, 3, 4, 5];  // chú thích kiểu
let a = [3; 5];  // tương đương [3, 3, 3, 3, 3]

let first = a[0];   // truy cập phần tử
let second = a[1];</code></pre>
</div>

<div class="cyber-alert info">
  <strong>An toàn bộ nhớ:</strong> Rust kiểm tra chỉ mục (index) tại runtime. Nếu bạn truy cập phần tử ngoài phạm vi mảng, chương trình sẽ <strong>panic</strong> (dừng lại) thay vì cho phép truy cập bộ nhớ không hợp lệ — đây là ví dụ đầu tiên về nguyên tắc an toàn bộ nhớ (memory safety) của Rust!
</div>
`,
      defaultCode: `fn main() {
    // Integer
    let x: i32 = 42;
    let y: u8 = 255;
    println!("i32: {x}, u8: {y}");

    // Float
    let pi = 3.14159;
    println!("Pi = {pi}");

    // Arithmetic
    let sum = 5 + 10;
    let remainder = 43 % 5;
    println!("5 + 10 = {sum}, 43 % 5 = {remainder}");

    // Boolean
    let is_rust_fun = true;
    println!("Rust vui không? {is_rust_fun}");

    // Char (Unicode)
    let heart = '❤';
    let crab = '🦀';
    println!("Heart: {heart}, Crab: {crab}");

    // Tuple
    let tup = (500, 6.4, 'A');
    let (a, b, c) = tup;
    println!("Tuple: {a}, {b}, {c}");

    // Array
    let months = ["Jan", "Feb", "Mar", "Apr", "May"];
    println!("Tháng đầu: {}", months[0]);
    println!("Tháng cuối: {}", months[4]);
}
`,
      expectedOutput: 'i32: 42, u8: 255\nPi = 3.14159\n5 + 10 = 15, 43 % 5 = 3\nRust vui không? true\nHeart: ❤, Crab: 🦀\nTuple: 500, 6.4, A\nTháng đầu: Jan\nTháng cuối: May'
    };
