import { Chapter } from '../courses';

export const ch03: Chapter = {
  id: 'ch03',
  title: 'Chương 3: Các khái niệm lập trình phổ biến',
  lessons: [
    {
      id: 'ch03-01',
      title: '3.1 Biến và Tính bất biến (Variables and Mutability)',
      duration: '25 phút',
      type: 'practice',
      content: `
<p>Chương này bao gồm các khái niệm xuất hiện trong hầu hết mọi ngôn ngữ lập trình và cách chúng hoạt động trong Rust. Nhiều ngôn ngữ lập trình có nhiều điểm chung ở cốt lõi. Không khái niệm nào được trình bày trong chương này là duy nhất đối với Rust, nhưng chúng ta sẽ thảo luận chúng trong ngữ cảnh của Rust và giải thích các quy ước xung quanh việc sử dụng các khái niệm này.</p>

<p>Cụ thể, bạn sẽ tìm hiểu về biến (variables), các kiểu cơ bản (basic types), hàm (functions), chú thích (comments) và luồng điều khiển (control flow). Những nền tảng này sẽ có mặt trong mọi chương trình Rust, và việc học chúng sớm sẽ cho bạn một nền tảng cốt lõi vững chắc để bắt đầu.</p>

<h3 class="task-heading">Biến và tính bất biến (Variables and Mutability)</h3>

<p>Như đã đề cập trong phần <em>"Lưu trữ Giá trị bằng Biến"</em> ở Chương 2, theo mặc định, các biến là <strong>immutable</strong> (bất biến — không thể thay đổi giá trị sau khi gán). Đây là một trong nhiều cú hích mà Rust dành cho bạn để viết code theo cách tận dụng tính an toàn (safety) và tính song song dễ dàng (easy concurrency) mà Rust cung cấp. Tuy nhiên, bạn vẫn có tùy chọn để biến các biến của mình thành mutable (có thể thay đổi). Hãy cùng khám phá cách làm và lý do tại sao Rust khuyến khích bạn ưu tiên tính bất biến, và tại sao đôi khi bạn có thể muốn từ chối nó.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>immutable</em> (bất biến) nghĩa là một khi giá trị được gắn kết (bind) vào một tên biến, bạn không thể thay đổi giá trị đó. Ngược lại, <em>mutable</em> (khả biến) cho phép thay đổi giá trị sau khi gán.
</div>

<p>Khi một biến là immutable, một khi giá trị được ràng buộc vào một tên, bạn không thể thay đổi giá trị đó. Để minh họa, hãy tạo một dự án mới gọi là <code>variables</code> trong thư mục dự án của bạn bằng cách sử dụng <code>cargo new variables</code>.</p>

<p>Sau đó, trong thư mục <code>variables</code> mới, mở <code>src/main.rs</code> và thay thế code bằng đoạn code sau, mà hiện tại sẽ chưa biên dịch được:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;  // LỖI! Không thể gán lại biến immutable
    println!("The value of x is: {x}");
}</code></pre>
</div>

<p>Lưu và chạy chương trình bằng <code>cargo run</code>. Bạn sẽ nhận được một thông báo lỗi liên quan đến lỗi bất biến (immutability error), như hiển thị trong output:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
error[E0384]: cannot assign twice to immutable variable x
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
  |         +++</code></pre>
</div>

<p>Ví dụ này cho thấy cách trình biên dịch (compiler) giúp bạn tìm lỗi trong chương trình. Các lỗi biên dịch có thể gây khó chịu, nhưng thực sự chúng chỉ có nghĩa là chương trình của bạn chưa thực hiện an toàn những gì bạn muốn; chúng không có nghĩa là bạn không phải là một lập trình viên giỏi! Ngay cả những Rustacean (người dùng Rust) có kinh nghiệm vẫn gặp lỗi biên dịch.</p>

<p>Điều quan trọng là chúng ta nhận được các lỗi tại thời điểm biên dịch (compile-time errors) khi cố gắng thay đổi một giá trị được chỉ định là immutable, vì chính tình huống này có thể dẫn đến các lỗi (bug). Nếu một phần code của chúng ta hoạt động dựa trên giả định rằng một giá trị sẽ không bao giờ thay đổi và một phần khác lại thay đổi giá trị đó, thì phần code đầu tiên có thể không làm đúng những gì nó được thiết kế để làm. Nguyên nhân của loại bug này có thể rất khó truy tìm sau đó. Trình biên dịch Rust đảm bảo rằng khi bạn nói một giá trị sẽ không thay đổi, nó thực sự sẽ không thay đổi, nên bạn không cần phải tự theo dõi nó. Do đó, code của bạn dễ suy luận hơn.</p>

<p>Nhưng tính khả biến (mutability) có thể rất hữu ích và làm code thuận tiện hơn khi viết. Mặc dù biến mặc định là immutable, bạn có thể làm chúng mutable bằng cách thêm <code>mut</code> trước tên biến. Thêm <code>mut</code> cũng truyền đạt ý định cho những người đọc code trong tương lai bằng cách chỉ ra rằng các phần khác của code sẽ thay đổi giá trị của biến này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
// Output:
// The value of x is: 5
// The value of x is: 6</code></pre>
</div>

<p>Chúng ta được phép thay đổi giá trị gắn kết với <code>x</code> từ <code>5</code> sang <code>6</code> khi <code>mut</code> được sử dụng. Cuối cùng, quyết định sử dụng mutability hay không phụ thuộc vào bạn và phụ thuộc vào điều gì bạn cho là rõ ràng nhất trong tình huống cụ thể đó.</p>

<h3 class="task-heading">Khai báo Hằng số (Declaring Constants)</h3>

<p>Giống như các biến immutable, hằng số (constants) là các giá trị được ràng buộc vào một tên và không được phép thay đổi, nhưng có một vài sự khác biệt giữa hằng số và biến.</p>

<p>Thứ nhất, bạn <strong>không được phép</strong> sử dụng <code>mut</code> với hằng số. Hằng số không chỉ immutable theo mặc định — chúng <strong>luôn luôn</strong> immutable. Bạn khai báo hằng số sử dụng từ khóa <code>const</code> thay vì <code>let</code>, và kiểu dữ liệu của giá trị <strong>bắt buộc phải được chú thích</strong> (annotated).</p>

<p>Hằng số có thể được khai báo trong bất kỳ scope (phạm vi) nào, bao gồm cả global scope (phạm vi toàn cục), điều này làm chúng hữu ích cho các giá trị mà nhiều phần code cần biết đến.</p>

<p>Sự khác biệt cuối cùng là hằng số chỉ có thể được gán giá trị là một biểu thức hằng (constant expression), không phải kết quả của một giá trị chỉ có thể được tính tại thời điểm chạy (runtime).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>constant</em> (hằng số) luôn bất biến, phải khai báo bằng <code>const</code> kèm chú thích kiểu, và chỉ có thể gán biểu thức mà trình biên dịch tính được (compile-time). Quy ước đặt tên là dùng VIẾT_HOA_CÓ_GẠCH_DƯỚI.
</div>

<p>Hằng số có hiệu lực trong toàn bộ thời gian chương trình chạy, trong scope mà chúng được khai báo. Đặc tính này làm hằng số hữu ích cho các giá trị mà nhiều phần của chương trình cần biết, ví dụ như số điểm tối đa mà bất kỳ người chơi nào được phép đạt, hoặc tốc độ ánh sáng.</p>

<h3 class="task-heading">Shadowing (Che phủ biến)</h3>

<p>Như bạn đã thấy trong hướng dẫn trò chơi đoán số ở Chương 2, bạn có thể khai báo một biến mới <strong>cùng tên</strong> với biến trước đó. Rustacean nói rằng biến đầu tiên bị <em>"shadowed"</em> (che phủ) bởi biến thứ hai, có nghĩa là biến thứ hai là cái mà trình biên dịch sẽ thấy khi bạn sử dụng tên biến. Trên thực tế, biến thứ hai phủ lên biến đầu tiên, chiếm lấy mọi sử dụng tên biến cho đến khi chính nó bị shadowed hoặc scope kết thúc.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;

    let x = x + 1;  // x = 6 (shadow lần 1)

    {
        let x = x * 2;  // x = 12 (shadow trong inner scope)
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");  // x = 6 (trở lại)
}
// Output:
// The value of x in the inner scope is: 12
// The value of x is: 6</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Shadowing</em> (che phủ) khác với <code>mut</code>:
  <br>• Shadowing tạo ra một <strong>biến mới</strong> (dùng <code>let</code> lại), cho phép thay đổi cả <strong>kiểu dữ liệu</strong>.
  <br>• <code>mut</code> chỉ cho phép thay đổi <strong>giá trị</strong> của biến, giữ nguyên kiểu.
  <br>• Nếu bạn dùng <code>mut</code> mà gán giá trị khác kiểu, trình biên dịch sẽ báo lỗi <code>mismatched types</code>.
</div>

<p>Sự khác biệt khác giữa <code>mut</code> và shadowing là vì chúng ta đang tạo một biến mới khi dùng <code>let</code> lại, chúng ta có thể thay đổi kiểu dữ liệu nhưng tái sử dụng cùng tên. Ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let spaces = "   ";        // kiểu &amp;str
let spaces = spaces.len(); // kiểu usize — OK vì là shadowing!</code></pre>
</div>

<p>Tuy nhiên, nếu thử dùng <code>mut</code> cho điều này, ta sẽ gặp lỗi biên dịch vì không được phép thay đổi kiểu của biến:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut spaces = "   ";
spaces = spaces.len();  // LỖI! expected &amp;str, found usize</code></pre>
</div>
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

    // === Mutable ===
    let mut y = 10;
    println!("y = {y}");
    y = 20;
    println!("y sau thay đổi = {y}");

    // === Constant ===
    const MAX_POINTS: u32 = 100_000;
    println!("Điểm tối đa: {MAX_POINTS}");

    // === Shadowing thay đổi kiểu ===
    let spaces = "   ";
    let spaces = spaces.len();
    println!("Số khoảng trắng: {spaces}");
}
`,
      expectedOutput: 'x = 5\nx sau shadow = 6\nx trong inner scope = 12\nx ngoài scope = 6\ny = 10\ny sau thay đổi = 20\nĐiểm tối đa: 100000\nSố khoảng trắng: 3'
    },
    {
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
    },
    {
      id: 'ch03-03',
      title: '3.3 Hàm (Functions)',
      duration: '25 phút',
      type: 'practice',
      content: `
<p>Hàm (functions) có mặt ở khắp nơi trong code Rust. Bạn đã thấy một trong những hàm quan trọng nhất: hàm <code>main</code>, là điểm vào (entry point) của mọi chương trình. Bạn cũng đã thấy từ khóa <code>fn</code>, cho phép khai báo hàm mới.</p>

<p>Code Rust sử dụng quy ước <strong>snake_case</strong> cho tên hàm và tên biến, trong đó tất cả các chữ cái đều viết thường và các từ được phân tách bằng dấu gạch dưới:</p>

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
}
// Output: The measurement is: 5h</code></pre>
</div>

<h3 class="task-heading">Câu lệnh và Biểu thức (Statements vs Expressions)</h3>
<p>Thân hàm bao gồm một chuỗi câu lệnh (statements) và tùy chọn kết thúc bằng biểu thức (expression). Rust phân biệt rất rõ:</p>
<ul class="task-list">
  <li><strong>Statements</strong>: thực hiện hành động, <em>không trả về giá trị</em>. VD: <code>let y = 6;</code></li>
  <li><strong>Expressions</strong>: tính toán và <em>trả về giá trị</em>. VD: <code>5 + 6</code>, một block <code>{ ... }</code></li>
</ul>

<div class="cyber-alert info">
  <strong>Quan trọng:</strong> Expression <strong>không</strong> có dấu chấm phẩy ở cuối. Nếu thêm <code>;</code>, nó trở thành statement và không trả về giá trị nữa!
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let y = {
        let x = 3;
        x + 1  // Expression (không có ;) => trả về 4
    };
    println!("The value of y is: {y}"); // y = 4
}</code></pre>
</div>

<h3 class="task-heading">Giá trị Trả về (Return Values)</h3>
<p>Hàm có thể trả về giá trị. Khai báo kiểu trả về sau mũi tên <code>-></code>. Giá trị trả về là <strong>biểu thức cuối cùng</strong> trong thân hàm (implicit return). Bạn có thể dùng <code>return</code> sớm nếu cần:</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Implicit return</em> (trả về ngầm định) là cách Rust tự động trả về giá trị của biểu thức cuối cùng trong thân hàm mà không cần từ khóa <code>return</code>.
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn five() -> i32 {
    5  // implicit return
}

fn plus_one(x: i32) -> i32 {
    x + 1
}

fn main() {
    let x = five();
    println!("five() = {x}");
    let y = plus_one(5);
    println!("plus_one(5) = {y}");
}
// Output:
// five() = 5
// plus_one(5) = 6</code></pre>
</div>
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
    },
    {
      id: 'ch03-04',
      title: '3.4 Chú thích (Comments)',
      duration: '10 phút',
      type: 'theory',
      content: `
<p>Tất cả các lập trình viên đều cố gắng làm cho code dễ hiểu, nhưng đôi khi cần có giải thích thêm. Trong những trường hợp này, lập trình viên để lại <strong>chú thích</strong> (comments) trong mã nguồn mà trình biên dịch sẽ bỏ qua nhưng người đọc code có thể thấy hữu ích.</p>

<p>Trong Rust, kiểu chú thích quen thuộc nhất bắt đầu bằng hai dấu gạch chéo <code>//</code>, và chú thích kéo dài đến cuối dòng. Đối với chú thích vượt qua một dòng đơn, bạn cần đặt <code>//</code> trên mỗi dòng:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Xin chào, đây là comment
fn main() {
    // Comment giải thích logic phức tạp
    // có thể trải dài nhiều dòng
    // mỗi dòng bắt đầu bằng //

    let lucky_number = 7; // Comment cuối dòng cũng OK
}</code></pre>
</div>

<p>Nhưng thường gặp hơn, bạn sẽ thấy chú thích được sử dụng ở dạng đặt trên dòng code cần giải thích:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // Tôi đang cảm thấy may mắn hôm nay
    let lucky_number = 7;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> Rust còn có <em>Documentation comments</em> sử dụng <code>///</code> (trước item) và <code>//!</code> (trong item). Chúng hỗ trợ Markdown và được dùng để tự động tạo tài liệu HTML bằng <code>cargo doc</code>. Chi tiết sẽ ở Chương 14.
</div>
`,
      defaultCode: `// Chương trình demo comments trong Rust

fn main() {
    // Khai báo biến — comment giải thích mục đích
    let x = 5; // giá trị ban đầu

    // Tính toán kết quả
    // Đây là comment nhiều dòng
    // mỗi dòng bắt đầu bằng //
    let y = x * 2;

    println!("x = {x}, y = {y}");
}
`,
      expectedOutput: 'x = 5, y = 10'
    },
    {
      id: 'ch03-05',
      title: '3.5 Luồng điều khiển (Control Flow)',
      duration: '30 phút',
      type: 'practice',
      content: `
<p>Khả năng chạy một đoạn code dựa trên điều kiện đúng (true) hay sai (false), và chạy đoạn code lặp đi lặp lại trong khi điều kiện đúng, là các khối xây dựng cơ bản trong hầu hết ngôn ngữ lập trình. Các cấu trúc phổ biến nhất cho phép bạn kiểm soát luồng thực thi (control flow) trong Rust là <strong>biểu thức if</strong> và <strong>các vòng lặp</strong>.</p>

<h3 class="task-heading">Biểu thức if (if Expressions)</h3>
<p>Biểu thức <code>if</code> cho phép bạn phân nhánh code dựa trên điều kiện. Bạn cung cấp một điều kiện và nói: "Nếu điều kiện này được đáp ứng, hãy chạy block code này. Nếu không, đừng chạy block code này."</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 7;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quan trọng:</strong> Điều kiện trong Rust <strong>bắt buộc phải là <code>bool</code></strong>. Rust không tự động chuyển đổi kiểu non-Boolean sang Boolean. Nếu bạn viết <code>if number { ... }</code>, sẽ bị lỗi biên dịch. Bạn phải viết rõ ràng: <code>if number != 0 { ... }</code>.
</div>

<h4>Xử lý Nhiều Điều kiện với else if</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
// Output: number is divisible by 3</code></pre>
</div>

<h4>Sử dụng if trong lệnh let</h4>
<p>Vì <code>if</code> là expression, chúng ta có thể sử dụng nó bên phải của lệnh <code>let</code> để gán kết quả vào biến:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let condition = true;
let number = if condition { 5 } else { 6 };
println!("The value of number is: {number}"); // 5</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Khi dùng <code>if</code> trong <code>let</code>, cả hai nhánh <strong>phải trả về cùng kiểu dữ liệu</strong>. Nếu không, trình biên dịch sẽ báo lỗi <code>if and else have incompatible types</code>.
</div>

<h3 class="task-heading">Lặp lại với Vòng lặp (Repetition with Loops)</h3>
<p>Rust có ba loại vòng lặp: <code>loop</code>, <code>while</code>, và <code>for</code>.</p>

<h4>Vòng lặp loop</h4>
<p><code>loop</code> thực thi một block code lặp đi lặp lại mãi mãi hoặc cho đến khi bạn nói rõ ràng nó phải dừng bằng <code>break</code>. Bạn cũng có thể dùng <code>continue</code> để bỏ qua code còn lại trong lần lặp hiện tại và bắt đầu lần lặp tiếp theo.</p>

<h4>Trả về Giá trị từ loop</h4>
<p>Một trong những cách dùng hay nhất của <code>loop</code> là thử lại một thao tác có thể thất bại, ví dụ kiểm tra xem thread đã hoàn thành công việc chưa. Bạn có thể trả về giá trị từ vòng lặp bằng cách đặt giá trị sau biểu thức <code>break</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;  // result = 20
        }
    };

    println!("The result is {result}");
}
// Output: The result is 20</code></pre>
</div>

<h4>Nhãn vòng lặp (Loop Labels)</h4>
<p>Nếu bạn có vòng lặp bên trong vòng lặp, <code>break</code> và <code>continue</code> mặc định áp dụng cho vòng lặp trong cùng. Bạn có thể sử dụng <em>loop label</em> (nhãn vòng lặp) bắt đầu bằng dấu nháy đơn để chỉ định muốn <code>break</code> hoặc <code>continue</code> vòng lặp nào:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;  // thoát vòng lặp trong
            }
            if count == 2 {
                break 'counting_up;  // thoát vòng lặp ngoài
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Loop label</em> (nhãn vòng lặp) bắt đầu bằng dấu nháy đơn <code>'</code> (ví dụ <code>'counting_up</code>) giúp bạn kiểm soát chính xác vòng lặp nào bị <code>break</code> hoặc <code>continue</code> khi có vòng lặp lồng nhau (nested loops).
</div>

<h4>Vòng lặp while (Conditional Loops)</h4>
<p>Thường hữu ích khi đánh giá điều kiện trong vòng lặp. Thay vì dùng <code>loop</code> + <code>if</code> + <code>break</code>, Rust cung cấp <code>while</code> ngắn gọn hơn:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");
        number -= 1;
    }

    println!("LIFTOFF!!!");
}
// Output: 3! 2! 1! LIFTOFF!!!</code></pre>
</div>

<h4>Vòng lặp for (Looping Through a Collection)</h4>
<p>Bạn có thể dùng <code>while</code> để lặp qua mảng, nhưng cách an toàn và ngắn gọn nhất là dùng vòng lặp <code>for</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}</code></pre>
</div>

<p><code>for</code> cũng thường được dùng với <code>Range</code> (một kiểu do thư viện chuẩn cung cấp). Kết hợp <code>.rev()</code> để đảo ngược:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
// Output: 3! 2! 1! LIFTOFF!!!</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong>
  <br>• <em>Range</em> <code>(1..4)</code> tạo dãy số 1, 2, 3 (không bao gồm 4). Dùng <code>(1..=4)</code> nếu muốn bao gồm cả 4.
  <br>• <code>.rev()</code> đảo ngược thứ tự lặp.
  <br>• Vòng lặp <code>for</code> là cách an toàn và quen thuộc nhất để duyệt collection vì Rust tự động xử lý chỉ mục, tránh lỗi <em>index out of bounds</em>.
</div>
`,
      defaultCode: `fn main() {
    // if expression
    let number = 7;
    if number % 2 == 0 {
        println!("{number} là số chẵn");
    } else {
        println!("{number} là số lẻ");
    }

    // if trong let
    let condition = true;
    let x = if condition { 5 } else { 6 };
    println!("x = {x}");

    // loop với break trả về giá trị
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("Result từ loop: {result}");

    // while loop
    let mut n = 3;
    while n != 0 {
        println!("{n}...");
        n -= 1;
    }

    // for loop với range
    println!("Đếm ngược:");
    for i in (1..=5).rev() {
        println!("  {i}...");
    }
    println!("  🚀 GO!");
}
`,
      expectedOutput: '7 là số lẻ\nx = 5\nResult từ loop: 20\n3...\n2...\n1...\nĐếm ngược:\n  5...\n  4...\n  3...\n  2...\n  1...\n  🚀 GO!'
    },
    {
      id: 'ch03-01-ex',
      title: 'Bài tập 3.1: Biến (Variables)',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy cùng kiểm tra kiến thức của bạn về Biến và Tính bất biến!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến <strong>bất biến</strong> tên là <code>x</code> và gán cho nó giá trị <code>5</code>.</li>
  <li>Sau đó, tạo một biến <strong>khả biến (mutable)</strong> tên là <code>y</code> và gán cho nó giá trị <code>10</code>.</li>
  <li>Cuối cùng, hãy thay đổi giá trị của <code>y</code> thành <code>20</code>.</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Sử dụng từ khóa <code>mut</code> cho biến có thể thay đổi giá trị. Sau khi hoàn thành, hãy nhấn <strong>Run</strong> để hệ thống chấm điểm!
</div>
`,
      defaultCode: `fn main() {
    // 1. Tạo biến bất biến x = 5

    // 2. Tạo biến khả biến y = 10

    // 3. Thay đổi giá trị của y thành 20

    // (Code tự động in ra để bạn xem thử)
    // println!("x = {}, y = {}", x, y);
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_variables_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        
        // Kiểm tra xem có khai báo biến x bất biến không: let x = 5
        let has_immutable_x = code.contains("let x = 5;") || code.contains("let x: i32 = 5;");
        assert!(has_immutable_x, "Bạn chưa khai báo biến bất biến x = 5 đúng cách!");
        assert!(!code.contains("let mut x = 5;"), "Biến x phải là bất biến (không dùng mut)!");

        // Kiểm tra xem có khai báo biến y khả biến không: let mut y = 10
        let has_mutable_y = code.contains("let mut y = 10;") || code.contains("let mut y: i32 = 10;");
        assert!(has_mutable_y, "Bạn chưa khai báo biến khả biến y = 10 đúng cách!");

        // Kiểm tra việc gán lại y = 20
        let assigns_y_to_20 = code.contains("y = 20;");
        assert!(assigns_y_to_20, "Bạn chưa gán lại giá trị y = 20!");
    }
}
`
    },
    {
      id: 'ch03-02-ex',
      title: 'Bài tập 3.2: Kiểu dữ liệu (Data Types)',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy cùng kiểm tra kiến thức của bạn về Kiểu dữ liệu, Tuple và Array!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một <strong>tuple</strong> tên là <code>my_tuple</code> chứa các giá trị sau: một số nguyên <code>500</code>, một số thực <code>6.4</code>, và một ký tự <code>'Z'</code> (Lưu ý chữ Z in hoa và dùng ngoặc đơn cho char).</li>
  <li>Giải nén (destructure) tuple đó thành 3 biến tương ứng <code>x</code>, <code>y</code>, <code>z</code>.</li>
  <li>Tạo một <strong>mảng (array)</strong> tên là <code>my_array</code> chứa 5 số nguyên đầu tiên (1, 2, 3, 4, 5).</li>
</ol>
<div class="cyber-alert info">
  Sau khi code xong, hãy nhấn <strong>Run</strong> để vượt qua bài kiểm tra!
</div>
`,
      defaultCode: `fn main() {
    // 1. Tạo tuple: my_tuple = (500, 6.4, 'Z')

    // 2. Giải nén tuple thành (x, y, z)

    // 3. Tạo array: my_array = [1, 2, 3, 4, 5]

}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_types_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code = code.replace(" ", ""); // Xóa khoảng trắng để dễ so sánh
        
        let has_tuple = code.contains("my_tuple=(500,6.4,'Z');") || code.contains("my_tuple:(i32,f64,char)=(500,6.4,'Z');");
        assert!(has_tuple, "Tuple my_tuple chưa chính xác!");

        let has_destructure = code.contains("let(x,y,z)=my_tuple;");
        assert!(has_destructure, "Bạn chưa giải nén tuple thành (x, y, z)!");

        let has_array = code.contains("my_array=[1,2,3,4,5];") || code.contains("my_array:[i32;5]=[1,2,3,4,5];");
        assert!(has_array, "Array my_array chưa chính xác!");
    }
}
`
    },
    {
      id: 'ch03-03-ex',
      title: 'Bài tập 3.3: Hàm (Functions)',
      duration: '15 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy viết một hàm tùy chỉnh trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tôi đã để sẵn hàm <code>main()</code> gọi hàm <code>calculate_volume</code> để kiểm tra.</li>
  <li>Bạn hãy <strong>định nghĩa hàm <code>calculate_volume</code></strong> bên dưới hàm <code>main()</code>. Hàm này:</li>
  <ul>
    <li>Nhận 3 tham số kiểu <code>i32</code> lần lượt là: <code>length</code>, <code>width</code>, và <code>height</code></li>
    <li>Trả về <strong>(Return)</strong> một giá trị kiểu <code>i32</code> là thể tích khối hộp (tích của cả 3 chiều).</li>
  </ul>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Ở phần thân hàm tính toán, bạn nhớ không dùng dấu chấm phẩy (;) ở cuối biểu thức để implicit return (hoặc dùng từ khóa return).
</div>
`,
      defaultCode: `fn main() {
    let vol = calculate_volume(2, 3, 4);
    println!("Thể tích là: {}", vol);
}

// Hãy định nghĩa hàm calculate_volume ở đây!
// fn calculate_volume(...) ... {

// }
`,
      testCode: `
#[cfg(test)]
mod tests {
    // Gọi hàm con của user luôn trong file main.rs do cùng module context
    #[test]
    fn test_calculate_volume() {
        assert_eq!(super::calculate_volume(1, 1, 1), 1, "Tính toán sai thể tích");
        assert_eq!(super::calculate_volume(2, 3, 4), 24, "Tính toán sai thể tích");
        assert_eq!(super::calculate_volume(5, 5, 5), 125, "Tính toán sai thể tích");
    }
}
`
    },
    {
      id: 'ch03-05-ex',
      title: 'Bài tập 3.5: Luồng điều khiển (Control Flow)',
      duration: '15 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy sử dụng biểu thức <code>if-else</code> và kết hợp vòng lặp.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Bên dưới, có một hàm tên là <code>is_even</code>. Bạn hãy hoàn thiện <strong>logic (thân hàm)</strong> của hàm này.</li>
  <li>Hàm <code>is_even(n: i32) -> bool</code> sẽ <strong>trả về <code>true</code></strong> nếu số <code>n</code> là số chẵn, còn nếu là số lẻ thì trả về <code>false</code>.</li>
</ol>
<div class="cyber-alert info">
  <strong>Toán tử Modulo:</strong> Sử dụng <code>n % 2 == 0</code> để kiểm tra số chẵn nhé.
</div>
`,
      defaultCode: `fn main() {
    println!("4 là số chẵn? {}", is_even(4));
    println!("7 là số chẵn? {}", is_even(7));
}

fn is_even(n: i32) -> bool {
    // Hoàn thành logic if-else ở đây
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    #[test]
    fn test_is_even() {
        assert_eq!(super::is_even(2), true, "2 phải là số chẵn");
        assert_eq!(super::is_even(3), false, "3 phải là số lẻ");
        assert_eq!(super::is_even(0), true, "0 phải là số chẵn");
        assert_eq!(super::is_even(-4), true, "-4 phải là số chẵn");
        assert_eq!(super::is_even(-5), false, "-5 phải là số lẻ");
    }
}
`
    }
  ]
};
