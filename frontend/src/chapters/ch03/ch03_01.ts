import { Lesson } from '../../courses';

export const ch03_01: Lesson = {
  id: 'ch03-01',
  title: '3.1 Biến và Tính bất biến (Variables and Mutability)',
  duration: '30 phút',
  type: 'theory',
  content: `
<p>Chương này bao gồm các khái niệm xuất hiện trong hầu hết mọi ngôn ngữ lập trình và cách chúng hoạt động trong Rust: biến, kiểu dữ liệu, hàm và luồng điều khiển.</p>

<h3 class="task-heading">Biến trong Rust</h3>

<p>Trong Rust, biến mặc định là <strong>immutable</strong> (bất biến). Đây là một trong nhiều "cú hích" (nudges) mà Rust dùng để giúp bạn viết code an toàn và hỗ trợ lập trình song song (concurrency) tốt. Tuy nhiên, bạn vẫn có tùy chọn để biến biến thành <strong>mutable</strong> (khả biến).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}</code></pre>
</div>

<p>Code này sẽ KHÔNG compile được:</p>
<pre>error[E0384]: cannot assign twice to immutable variable x
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         - first assignment to x
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut x = 5;
  |         +++</pre>

<div class="cyber-alert info">
  <strong>Tại sao có lỗi này?</strong> Vì bạn cố gắng gán giá trị thứ hai cho biến immutable. Compiler giúp bạn phát hiện lỗi TẠI THỜI ĐIỂM BIÊN DỊCH, không phải khi chạy chương trình.
</div>

<h4>Tại sao Rust khuyến khích Immutability?</h4>

<p>Điều quan trọng là chúng ta nhận được lỗi tại thời điểm biên dịch khi cố gắng thay đổi giá trị được chỉ định là immutable. Nếu một phần code hoạt động với giả định giá trị sẽ không bao giờ thay đổi, nhưng phần khác lại thay đổi giá trị đó, thì phần code đầu tiên có thể không hoạt động đúng. Nguyên nhân của loại bug này rất khó tìm sau đó.</p>

<p>Compiler Rust đảm bảo rằng khi bạn nói giá trị sẽ không đổi, nó thực sự sẽ không đổi. Do đó, code của bạn dễ suy luận (reason through) hơn.</p>

<p>Ngoài ra, immutability giúp bạn tận dụng tối đa tính an toàn và dễ dàng viết code đồng thời (concurrency) của Rust. Khi không có code nào có thể thay đổi giá trị của một biến, bạn không cần lo lắng về race conditions.</p>

<h4>Làm sao để thay đổi giá trị?</h4>

<p>Thêm từ khóa <code>mut</code> (mutable - khả biến):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}</code></pre>
</div>

<p>Khi chạy chương trình, ta nhận được:</p>
<pre><code>$ cargo run
The value of x is: 5
The value of x is: 6</code></pre>

<div class="cyber-alert info">
  <strong>Khi nào dùng mut?</strong> Thêm mut cũng thể hiện ý định cho người đọc code sau này - rằng các phần khác của code sẽ thay đổi giá trị này.
</div>

<h3 class="task-heading">Hằng số (Constants)</h3>

<p>Giống như biến immutable, hằng số là giá trị được gắn với tên và không được phép thay đổi. Nhưng có vài điểm khác biệt quan trọng:</p>

<table>
<tr><th>Constants</th><th>Biến Immutable</th></tr>
<tr><td>Không dùng được <code>mut</code></td><td>Dùng <code>mut</code> để mutable</td></tr>
<tr><td>Dùng từ khóa <code>const</code></td><td>Dùng từ khóa <code>let</code></td></tr>
<tr><td><strong>Bắt buộc</strong> ghi rõ kiểu dữ liệu</td><td>Type inference có thể bỏ qua</td></tr>
<tr><td>Có thể khai báo ở <strong>global scope</strong></td><td>Chỉ trong scope cụ thể</td></tr>
<tr><td>Chỉ gán <strong>constant expression</strong></td><td>Có thể gán runtime value</td></tr>
<tr><td>Valid trong suốt thời gian chạy program</td><td>Theo scope</td></tr>
</table>

<p>Hằng số có thể được khai báo trong bất kỳ scope nào, kể cả global scope - hữu ích cho các giá trị mà nhiều phần code cần biết.</p>

<p>Sự khác biệt quan trọng nhất: hằng số chỉ có thể được gán giá trị là <strong>biểu thức hằng</strong> (constant expression), không phải kết quả tính toán runtime.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;</code></pre>
</div>

<p>Quy ước đặt tên: UPPER_SNAKE_CASE (VIẾT_HOA_VỚI_DẤU_GẠCH_DƯỚI)</p>

<div class="cyber-alert info">
  <strong>Ví dụ sử dụng:</strong> Hằng số hữu ích cho các giá trị mà nhiều phần chương trình cần biết, như điểm tối đa trong game hay tốc độ ánh sáng. Nếu cần thay đổi giá trị này, bạn chỉ cần sửa một chỗ.
</div>

<h3 class="task-heading">Shadowing (Che phủ biến)</h3>

<p>Bạn có thể khai báo biến mới <strong>cùng tên</strong> với biến trước đó. Biến đầu tiên bị <em>"shadowed"</em> (che phủ) bởi biến thứ hai.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");
}</code></pre>
</div>

<p>Khi chạy:</p>
<pre><code>$ cargo run
The value of x in the inner scope is: 12
The value of x is: 6</code></pre>

<div class="cyber-alert info">
  <strong>Shadowing khác với mut:</strong> Shadowing tạo biến <strong>mới</strong>, cho phép thay đổi <strong>kiểu dữ liệu</strong>. Nếu cố gán lại mà không dùng let, sẽ gây lỗi compile.
</div>

<h4>Ví dụ đổi kiểu với shadowing:</h4>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let spaces = "   ";        // &str
    let spaces = spaces.len(); // usize - OK vì là biến MỚI!
}</code></pre>
</div>

<p>Nếu dùng <code>mut</code> sẽ lỗi:</p>
<pre>error[E0308]: mismatched types
  |
2 |     let mut spaces = "   ";
  |                      ----- expected due to this value
3 |     spaces = spaces.len();
  |              ^^^^^^^^^^^^ expected &str, found usize</pre>

<h3 class="task-heading">So sánh: Shadowing vs Mut</h3>

<table>
<tr><th>Shadowing</th><th>Mut</th></tr>
<tr><td>Tạo biến <strong>mới</strong></td><td>Thay đổi giá trị <strong>cùng</strong> biến</td></tr>
<tr><td>Dùng <code>let</code> để reassign</td><td>Gán trực tiếp <code>x = ...</code></td></tr>
<tr><td>Cho phép <strong>đổi kiểu dữ liệu</strong></td><td>Giữ nguyên kiểu</td></tr>
</table>

<h3 class="task-heading">Tổng kết</h3>

<ul>
  <li><strong>Biến mặc định immutable</strong> - an toàn, dễ reason about</li>
  <li><strong>Dùng <code>mut</code> để mutable</strong> - tiện lợi khi cần thay đổi</li>
  <li><strong>Constants</strong> - luôn immutable, cần type annotation, có thể global</li>
  <li><strong>Shadowing</strong> - tạo biến mới cùng tên, có thể đổi type</li>
</ul>

<h3 class="task-heading">Nội dung nâng cao (đọc thêm nếu muốn)</h3>

<p>Các phần dưới đây là nâng cao.</p>

<h4>Static Variables</h4>

<p>Static khác với const: có địa chỉ cố định trong bộ nhớ và lifetime suốt chương trình.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>static APP_NAME: &str = "KaiRust";

fn main() {
    println!("App: {}", APP_NAME);
}</code></pre>
</div>

<h4>Const Functions</h4>

<p>Hàm có thể tính toán ở compile-time:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>const fn square(x: i32) -> i32 {
    x * x
}

const FIVE_SQUARED: i32 = square(5);  // Tính ở compile-time!</code></pre>
</div>

<h4>Integer Overflow</h4>

<p>Trong const: overflow gây lỗi compile. Trong runtime: debug = panic, release = wrap around.</p>
`,
  defaultCode: `fn main() {
    // === Immutable mặc định ===
    let x = 5;
    println!("x = {x}");
    // x = 6; // Bỏ comment dòng này sẽ bị lỗi!

    // === Shadowing ===
    let x = x + 1;
    println!("x sau shadow = {x}");

    {
        let x = x * 2;
        println!("x trong inner scope = {x}");
    }
    println!("x ngoài scope = {x}");

    // === Mutable - ví dụ đếm ===
    let mut count = 0;
    for i in 1..=3 {
        count += 1;
    }
    println!("Số lần lặp: {count}");

    // === Constant ===
    const MAX_POINTS: u32 = 100_000;
    println!("Điểm tối đa: {MAX_POINTS}");

    // === Shadowing thay đổi kiểu ===
    let spaces = "   ";
    let spaces = spaces.len();
    println!("Số khoảng trắng: {spaces}");

    // === Const fn ===
    const fn square(n: i32) -> i32 { n * n }
    const FIVE_SQUARED: i32 = square(5);
    println!("5^2 = {FIVE_SQUARED}");
}
`,
  expectedOutput: 'x = 5\nx sau shadow = 6\nx trong inner scope = 12\nx ngoài scope = 6\nSố lần lặp: 3\nĐiểm tối đa: 100000\nSố khoảng trắng: 3\n5^2 = 25'
};
