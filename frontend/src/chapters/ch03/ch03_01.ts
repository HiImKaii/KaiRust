import { Lesson } from '../../courses';

export const ch03_01: Lesson = {
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
    };
