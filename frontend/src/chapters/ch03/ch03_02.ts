import { Lesson } from '../../courses';

export const ch03_02: Lesson = {
  id: 'ch03-02',
  title: '3.2 Kiểu dữ liệu (Data Types)',
  duration: '30 phút',
  type: 'theory',
  content: `
<p>Mỗi giá trị trong Rust đều thuộc một <strong>kiểu dữ liệu</strong> (data type) nhất định, cho Rust biết loại dữ liệu đó là gì để biết cách làm việc với nó. Chúng ta sẽ xem xét hai tập con kiểu dữ liệu: <strong>scalar (vô hướng)</strong> và <strong>compound (phức hợp)</strong>.</p>

<p>Rust là ngôn ngữ <strong>định kiểu tĩnh</strong> (statically typed), nghĩa là trình biên dịch phải biết kiểu của tất cả các biến tại thời điểm biên dịch. Trình biên dịch thường có thể tự suy luận kiểu dựa trên giá trị và cách sử dụng. Nhưng khi có nhiều kiểu có thể xảy ra, ví dụ khi chuyển chuỗi thành số bằng <code>parse</code>, ta phải thêm <strong>chú thích kiểu</strong> (type annotation):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = "42".parse().expect("Not a number!");</code></pre>
</div>

<p>Nếu không có chú thích kiểu <code>: u32</code>, Rust sẽ báo lỗi biên dịch vì không biết kiểu số nào bạn muốn dùng.</p>

<h3 class="task-heading">Kiểu Vô hướng (Scalar Types)</h3>

<p>Một kiểu vô hướng biểu diễn một giá trị duy nhất. Rust có 4 kiểu vô hướng chính: số nguyên (integers), số thực dấu phẩy động (floating-point numbers), boolean, và ký tự (characters).</p>

<h4>Kiểu Số Nguyên (Integer Types)</h4>

<p>Số nguyên là một số không có phần thập phân. Chúng ta đã dùng kiểu <code>u32</code> (số nguyên không dấu 32-bit). Ký tự <code>u</code> là unsigned (không dấu - chỉ dương hoặc 0), còn <code>i</code> là signed (có dấu - có thể âm hoặc dương).</p>

<table class="comparison-table">
  <tr>
    <th>Kích thước</th>
    <th>Có dấu (Signed)</th>
    <th>Không dấu (Unsigned)</th>
  </tr>
  <tr>
    <td>8-bit</td>
    <td><code>i8</code></td>
    <td><code>u8</code></td>
  </tr>
  <tr>
    <td>16-bit</td>
    <td><code>i16</code></td>
    <td><code>u16</code></td>
  </tr>
  <tr>
    <td>32-bit</td>
    <td><code>i32</code></td>
    <td><code>u32</code></td>
  </tr>
  <tr>
    <td>64-bit</td>
    <td><code>i64</code></td>
    <td><code>u64</code></td>
  </tr>
  <tr>
    <td>128-bit</td>
    <td><code>i128</code></td>
    <td><code>u128</code></td>
  </tr>
  <tr>
    <td>arch</td>
    <td><code>isize</code></td>
    <td><code>usize</code></td>
  </tr>
</table>

<p>Mỗi biến thể có thể có dấu hoặc không dấu và có một kích thước rõ ràng. Số có dấu được lưu trữ bằng phương pháp <strong>bù hai</strong> (two's complement). Các kiểu <code>isize</code> và <code>usize</code> phụ thuộc vào kiến trúc máy tính đang chạy: 64-bit nếu là kiến trúc 64-bit và 32-bit nếu là kiến trúc 32-bit.</p>

<h5>Các định dạng số nguyên (Integer Literals)</h5>

<p>Bạn có thể viết các giá trị số nguyên theo nhiều định dạng:</p>

<table class="comparison-table">
  <tr>
    <th>Loại</th>
    <th>Cú pháp</th>
    <th>Ví dụ</th>
  </tr>
  <tr>
    <td>Thập phân</td>
    <td>...</td>
    <td><code>98_222</code></td>
  </tr>
  <tr>
    <td>Thập lục phân</td>
    <td>0x</td>
    <td><code>0xff</code></td>
  </tr>
  <tr>
    <td>Bát phân</td>
    <td>0o</td>
    <td><code>0o77</code></td>
  </tr>
  <tr>
    <td>Nhị phân</td>
    <td>0b</td>
    <td><code>0b1111_0000</code></td>
  </tr>
  <tr>
    <td>Byte (u8)</td>
    <td>b</td>
    <td><code>b'A'</code></td>
  </tr>
</table>

<p>Bạn cũng có thể dùng dấu gạch dưới <code>_</code> làm dấu phân cách cho dễ đọc, ví dụ <code>1_000</code>.</p>

<div class="cyber-alert info">
  <strong>Mặc định của Rust:</strong> Nếu bạn không chắc nên chọn kiểu nào, mặc định của Rust thường là lựa chọn tốt: kiểu số nguyên mặc định là <code>i32</code>. Kiểu <code>isize</code> hoặc <code>usize</code> thường được dùng làm index (chỉ mục) cho các collection.
</div>

<h5>Tràn Số Nguyên (Integer Overflow)</h5>

<p>Giả sử bạn có biến <code>u8</code> nhận giá trị từ 0 đến 255. Nếu bạn cố gán giá trị ngoài phạm vi, ví dụ 256, sẽ xảy ra tràn số nguyên (integer overflow).</p>

<p>Khi compile ở chế độ <strong>debug</strong>, Rust sẽ thêm các kiểm tra để dừng chương trình (panic) nếu tràn số xảy ra. Nhưng khi compile ở chế độ <strong>release</strong> (<code>--release</code>), Rust không kiểm tra panic nữa mà thực hiện gói theo kiểu bù hai (two's complement wrapping). Nghĩa là 256 trở thành 0, 257 thành 1,...</p>

<p>Việc cố tình dựa vào hành vi gói (wrap) khi tràn số này được coi là một lỗi. Để xử lý rủi ro tràn số một cách tường minh, bạn có thể dùng các phương thức mà thư viện chuẩn cung cấp:</p>

<ul class="task-list">
  <li><code>wrapping_*</code>: gói lại (wrap around)</li>
  <li><code>checked_*</code>: trả về <code>None</code> nếu tràn</li>
  <li><code>overflowing_*</code>: trả về giá trị và boolean cho biết có tràn không</li>
  <li><code>saturating_*</code>: giới hạn ở giá trị min/max</li>
</ul>

<h4>Kiểu Số Thực Dấu Phẩy Động (Floating-Point Types)</h4>

<p>Rust có hai kiểu cho số có dấu phẩy thập phân: <code>f32</code> và <code>f64</code>, có kích thước lần lượt là 32 bit và 64 bit. Kiểu mặc định là <code>f64</code> vì trên CPU hiện đại nó gần như có tốc độ ngang với <code>f32</code> nhưng mang lại độ chính xác cao hơn. Tất cả các kiểu số thực đều có dấu.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 2.0; // f64 (mặc định)
    let y: f32 = 3.0; // f32
}</code></pre>
</div>

<p>Số thực trong Rust tuân theo chuẩn <strong>IEEE-754</strong>.</p>

<h4>Các Phép Toán Số Học (Numeric Operations)</h4>

<p>Rust hỗ trợ các toán tử toán học cơ bản:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let sum = 5 + 10;           // cộng
    let difference = 95.5 - 4.3; // trừ
    let product = 4 * 30;        // nhân
    let quotient = 56.7 / 32.2; // chia
    let truncated = -5 / 3;      // chia nguyên = -1
    let remainder = 43 % 5;     // chia lấy dư
}</code></pre>
</div>

<p>Lưu ý: Phép chia số nguyên sẽ cắt bỏ phần thập phân theo hướng về 0.</p>

<h4>Kiểu Boolean</h4>

<p>Tương tự hầu hết ngôn ngữ khác, kiểu Boolean trong Rust có hai giá trị có thể: <code>true</code> và <code>false</code>. Boolean có kích thước một byte và được chỉ định là <code>bool</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let t = true;
    let f: bool = false; // chú thích kiểu rõ ràng
}</code></pre>
</div>

<h4>Kiểu Character (Ký tự)</h4>

<p>Kiểu <code>char</code> của Rust là kiểu chữ cơ bản nhất. Ký tự <code>char</code> được kẹp trong ngoặc đơn <code>'z'</code>, khác với chuỗi dùng ngoặc kép <code>"z"</code>. Kiểu char của Rust có kích thước <strong>4 byte</strong> và đại diện cho một <strong>Unicode Scalar Value</strong>, nghĩa là nó có thể lưu trữ nhiều thứ hơn là chỉ chuẩn ASCII - có thể là ký tự tiếng Việt, tiếng Trung, Hán, Nhật, Hàn, hay emoji.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // có chú thích kiểu
    let heart_eyed_cat = '😻';
}</code></pre>
</div>

<h3 class="task-heading">Kiểu Phức hợp (Compound Types)</h3>

<p>Kiểu phức hợp có thể nhóm nhiều giá trị lại thành một kiểu. Rust có 2 kiểu phức hợp nguyên thủy: <strong>tuples</strong> và <strong>arrays</strong>.</p>

<h4>Kiểu Tuple</h4>

<p>Tuple là cách để nhóm một loạt các giá trị với các kiểu dữ liệu khác nhau vào chung một kiểu phức hợp. Tuple có độ dài cố định: một khi đã khai báo, không thể thay đổi kích thước.</p>

<p>Tạo một tuple bằng cách viết các phần tử ngăn bởi dấu phẩy trong dấu ngoặc đơn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}</code></pre>
</div>

<p>Biến <code>tup</code> trỏ tới toàn bộ tuple. Để lấy từng phần tử ra, có thể dùng phép khớp mẫu (pattern matching) để <strong>phân rã</strong> (destructure):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let tup = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("The value of y is: {y}"); // in ra 6.4
}</code></pre>
</div>

<p>Cũng có thể truy cập thẳng thông qua <strong>chỉ mục</strong> (index) của tuple bằng dấu chấm:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Unit:</strong> Một tuple rỗng không có giá trị nào bên trong có tên gọi đặc biệt là <strong>unit</strong> (được viết là <code>()</code>). Biểu thức ngầm định sẽ luôn trả về giá trị unit này nếu không trả về giá trị nào khác.
</div>

<h4>Kiểu Array (Mảng)</h4>

<p>Một cách khác để chứa nhiều giá trị là một mảng (array). Khác với tuple, mọi phần tử của mảng phải có cùng một kiểu dữ liệu. Và khác với hầu hết ngôn ngữ khác, mảng trong Rust có độ dài tĩnh (cố định), không thể tự mở rộng hay co lại.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = [1, 2, 3, 4, 5];
}</code></pre>
</div>

<p>Mảng rất hữu ích khi bạn muốn cấp phát dữ liệu trong vùng nhớ ngăn xếp (stack) thay vì heap, hoặc khi cần đảm bảo luôn có một số lượng chính xác phần tử (ví dụ danh sách tên các tháng trong năm). Về sau nếu muốn danh sách có thể thay đổi độ dình tự do, bạn sẽ được hướng dẫn dùng kiểu <code>Vector</code> thay thế.</p>

<h5>Khai báo Array</h5>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Khai báo thông thường
let a = [1, 2, 3, 4, 5];

// Với type annotation
let a: [i32; 5] = [1, 2, 3, 4, 5];

// Khởi tạo với cùng một giá trị
let a = [3; 5];  // tạo mảng gồm 5 phần tử, mỗi phần tử là 3
                  // tương đương: [3, 3, 3, 3, 3]</code></pre>
</div>

<h5>Truy cập phần tử mảng</h5>

<p>Mảng là một khối nhớ đơn liên tục có kích thước cố định. Bạn có thể truy cập bằng toán tử dấu ngoặc vuông <code>[index]</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = [1, 2, 3, 4, 5];
    let first = a[0];
    let second = a[1];
}</code></pre>
</div>

<h5>Lỗi truy cập ngoài giới hạn mảng</h5>

<p>Điều gì xảy ra nếu cố truy cập phần tử vượt quá chiều dài mảng (ví dụ <code>a[10]</code> trên mảng 5 phần tử)?</p>

<p>Nếu bạn viết index trực tiếp (compile-time constant), trình biên dịch có thể phát hiện và báo lỗi ngay. Nhưng nếu bạn lấy <code>index</code> từ input của người dùng rồi mới đọc <code>a[index]</code>, khi compile sẽ vẫn thành công. Nhưng khi chương trình chạy thực tế, nếu người dùng nhập số 10, Rust sẽ lập tức <strong>panic</strong> (ngưng chương trình) ở runtime.</p>

<pre class="error-block">thread 'main' panicked at src/main.rs:19:19:
index out of bounds: the len is 5 but the index is 10</pre>

<p>Đây là ví dụ rõ nhất về nguyên tắc <strong>memory safety</strong> (an toàn bộ nhớ) của Rust - nó dừng chương trình ngay lập tức thay vì tiếp tục chạy và cho phép đọc dữ liệu sai lệch (như ở ngôn ngữ C/C++).</p>

<h3 class="task-heading">Tổng kết</h3>

<table class="comparison-table">
  <tr>
    <th>Kiểu</th>
    <th>Kích thước</th>
    <th>Ghi chú</th>
  </tr>
  <tr>
    <td><code>i8</code>/<code>u8</code></td>
    <td>8 bits</td>
    <td></td>
  </tr>
  <tr>
    <td><code>i16</code>/<code>u16</code></td>
    <td>16 bits</td>
    <td></td>
  </tr>
  <tr>
    <td><code>i32</code>/<code>u32</code></td>
    <td>32 bits</td>
    <td>Default cho integers</td>
  </tr>
  <tr>
    <td><code>i64</code>/<code>u64</code></td>
    <td>64 bits</td>
    <td></td>
  </tr>
  <tr>
    <td><code>i128</code>/<code>u128</code></td>
    <td>128 bits</td>
    <td></td>
  </tr>
  <tr>
    <td><code>isize</code>/<code>usize</code></td>
    <td>64/32 bits</td>
    <td>Phụ thuộc architecture</td>
  </tr>
  <tr>
    <td><code>f32</code></td>
    <td>32 bits</td>
    <td>IEEE-754</td>
  </tr>
  <tr>
    <td><code>f64</code></td>
    <td>64 bits</td>
    <td>Default cho floats</td>
  </tr>
  <tr>
    <td><code>bool</code></td>
    <td>1 byte</td>
    <td><code>true</code>/<code>false</code></td>
  </tr>
  <tr>
    <td><code>char</code></td>
    <td>4 bytes</td>
    <td>Unicode</td>
  </tr>
  <tr>
    <td>Tuple</td>
    <td>Fixed</td>
    <td>Hỗn hợp kiểu</td>
  </tr>
  <tr>
    <td>Array</td>
    <td>Fixed</td>
    <td>Cùng kiểu</td>
  </tr>
</table>
`,
  defaultCode: `fn main() {
    // === Integer Types ===
    let x: i32 = 42;
    let y: u8 = 255;
    println!("i32: {x}, u8: {y}");

    // Float
    let pi = 3.14159;
    println!("Pi = {pi}");

    // Numeric Operations
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
