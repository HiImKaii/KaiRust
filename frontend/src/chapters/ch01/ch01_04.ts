import { Lesson } from '../../courses';

export const ch01_04: Lesson = {
    id: 'ch01-04',
    title: '1.4 Nhập & Xuất Dữ Liệu trong Rust',
    duration: '30 phút',
    type: 'theory',
    content: `
<p>Trong bài học trước, chúng ta đã học cách in dữ liệu ra màn hình bằng <code>println!</code>. Nhưng một chương trình hoàn chỉnh không chỉ xuất ra — nó còn cần <strong>nhận dữ liệu từ người dùng</strong> và xử lý. Rust cung cấp nhiều cách để đọc dữ liệu từ stdin (standard input), và mỗi cách phù hợp với những tình huống khác nhau.</p>

<div class="cyber-alert info">
  <strong>Kiến thức nền tảng:</strong> Khi bạn chạy một chương trình Rust trên terminal, stdin là nơi chương trình đọc dữ liệu mà bạn gõ vào bàn phím. Dữ liệu này được truyền qua một "đường ống" (pipe) từ bàn phím → chương trình.
</div>

<h3 class="task-heading">1. Đọc một dòng văn bản với read_line()</h3>

<p>Đây là cách phổ biến nhất để đọc dữ liệu từ người dùng. <code>read_line()</code> đọc toàn bộ dòng văn bản (bao gồm cả ký tự xuống dòng <code>\\n</code> ở cuối) vào một <code>String</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut name = String::new();
    println!("Nhập tên của bạn:");
    io::stdin().read_line(&mut name).expect("Lỗi khi đọc dữ liệu");

    // .trim() loại bỏ ký tự xuống dòng \n ở cuối
    let name = name.trim();

    println!("Xin chào, {}!", name);
}</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Nhập tên của bạn:
Kai
Xin chào, Kai!</code></pre>
</div>

<h4>Tại sao cần .trim()?</h4>
<p>Khi người dùng gõ <code>Kai</code> và nhấn Enter, stdin nhận được chuỗi <code>"Kai\\n"</code> (16 ký tự). Nếu không gọi <code>.trim()</code>, output sẽ là <code>"Xin chào, Kai\\n!"</code> — có một dòng trắng thừa.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Lỗi đọc");

    println!("Trước trim: {:?}", input);  // "Kai\\n" (5 ký tự)
    println!("Sau trim:   {:?}", input.trim());  // "Kai" (3 ký tự)
}</code></pre>
</div>

<h4>Kết hợp parse() để chuyển sang số</h4>
<p>Sau khi đọc và trim, bạn có thể dùng <code>.parse()</code> để chuyển chuỗi thành số. Kết quả trả về là <code>Result&lt;T, E&gt;</code>, nên cần xử lý lỗi bằng <code>expect()</code>, <code>unwrap()</code>, hoặc <code>match</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut age_str = String::new();
    println!("Nhập tuổi của bạn:");
    io::stdin().read_line(&mut age_str).expect("Lỗi đọc");

    // Cách 1: unwrap() — panic nếu lỗi
    // let age: u32 = age_str.trim().parse().unwrap();

    // Cách 2: expect() — panic với thông báo tùy chỉnh
    let age: u32 = age_str.trim().parse().expect("Tuổi phải là số nguyên!");

    println!("Bạn {} tuổi.", age);
}</code></pre>
</div>

<h3 class="task-heading">2. Đọc toàn bộ stdin với read_to_string()</h3>

<p><code>read_to_string()</code> đọc <strong>tất cả</strong> dữ liệu từ stdin cho đến EOF (End-Of-File) vào một <code>String</code>. Rất hữu ích khi bạn cần đọc nhiều dòng cùng lúc.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut all_input = String::new();
    io::stdin().read_to_string(&mut all_input).expect("Lỗi đọc");

    println!("Bạn đã nhập:");
    println!("{}", all_input);
}</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Bạn đã nhập:
Xin chao
Toi la Kai
Toi 20 tuoi</code></pre>
</div>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Khi nhấn Enter lần đầu, stdin đã có thể đóng nếu chương trình cần stdin. Với <code>read_to_string()</code>, stdin sẽ đợi đến khi bạn gửi <strong>Ctrl+D</strong> (Linux/macOS) hoặc <strong>Ctrl+Z</strong> (Windows) để báo hiệu kết thúc file (EOF).
</div>

<h3 class="task-heading">3. Đọc từng dòng với lines()</h3>

<p><code>lines()</code> trả về một <strong>iterator</strong>, cho phép bạn duyệt qua từng dòng một cách linh hoạt. Đây là cách phổ biến nhất để xử lý nhiều dòng nhập liệu.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    // lines() tách string thành các dòng (bỏ qua \n)
    for (i, line) in input.lines().enumerate() {
        println!("Dòng {}: {}", i + 1, line);
    }
}</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Dòng 1: Xin chao
Dòng 2: Toi la Kai
Dòng 3: Toi 20 tuoi</code></pre>
</div>

<h4>Đếm số từ trong mỗi dòng</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    for line in input.lines() {
        let word_count = line.split_whitespace().count();
        println!("{} ({} từ)", line, word_count);
    }
}</code></pre>
</div>

<h3 class="task-heading">4. Đọc từng ký tự (byte) với bytes()</h3>

<p><code>bytes()</code> trả về iterator của các byte. Mỗi ký tự tiếng Việt có thể chiếm nhiều byte (UTF-8), nên cần cẩn thận khi xử lý chuỗi tiếng Việt.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::{self, Read};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    // Đếm số byte của input
    let byte_count = input.bytes().count();
    println!("Tổng số byte: {}", byte_count);

    // In từng byte ra (với ký tự ASCII)
    print!("Các byte: ");
    for b in input.bytes() {
        print!("{} ", b);
    }
    println!();
}</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Tổng số byte: 15
Các byte: 65 66 67 10</code></pre>
</div>

<h3 class="task-heading">5. Đọc trực tiếp byte với read()</h3>

<p><code>read()</code> đọc raw bytes vào một buffer (mảng <code>[u8]</code>). Đây là cách đọc cấp thấp, thường dùng khi đọc file nhị phân hoặc khi cần kiểm soát chính xác số byte đọc được.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::{self, Read};

fn main() {
    let mut buffer = [0u8; 8]; // Buffer 8 byte
    let bytes_read = io::stdin().read(&mut buffer).unwrap();

    println!("Đã đọc {} byte:", bytes_read);
    for (i, &byte) in buffer.iter().enumerate() {
        if i < bytes_read {
            print!("{} ", byte);
        }
    }
    println!();
}</code></pre>
</div>

<h3 class="task-heading">6. So sánh các phương thức đọc stdin</h3>

<table class="data-table">
  <thead>
    <tr>
      <th>Phương thức</th>
      <th>Khi nào dùng</th>
      <th>Ưu điểm</th>
      <th>Nhược điểm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>read_line()</code></td>
      <td>Đọc đúng 1 dòng từ người dùng</td>
      <td>Đơn giản, xử lý từng dòng dễ dàng</td>
      <td>Cần <code>.trim()</code>, đọc chậm hơn buffer</td>
    </tr>
    <tr>
      <td><code>read_to_string()</code></td>
      <td>Đọc toàn bộ stdin cùng lúc</td>
      <td>Nhanh, đọc nhiều dòng cùng lúc</td>
      <td>Tốn bộ nhớ nếu input lớn</td>
    </tr>
    <tr>
      <td><code>lines()</code></td>
      <td>Duyệt qua nhiều dòng bằng iterator</td>
      <td>Linh hoạt, có thể filter/map</td>
      <td>Phải đọc toàn bộ trước bằng <code>read_to_string</code></td>
    </tr>
    <tr>
      <td><code>bytes()</code></td>
      <td>Đếm byte, xử lý dữ liệu nhị phân</td>
      <td>Kiểm soát cấp thấp</td>
      <td>Phức tạp, không xử lý UTF-8 tự nhiên</td>
    </tr>
    <tr>
      <td><code>read()</code></td>
      <td>Đọc vào buffer có kích thước cố định</td>
      <td>Kiểm soát bộ nhớ chính xác</td>
      <td>Phải quản lý buffer thủ công</td>
    </tr>
  </tbody>
</table>

<h3 class="task-heading">7. Xử lý lỗi khi đọc stdin</h3>

<p>Tất cả các phương thức đọc đều trả về <code>Result</code>. Bạn <strong>phải</strong> xử lý lỗi, nếu không Rust sẽ báo compiler error:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut input = String::new();

    // Cách 1: unwrap() — panic nếu lỗi
    // io::stdin().read_line(&mut input).unwrap();

    // Cách 2: expect() — panic với thông báo
    // io::stdin().read_line(&mut input).expect("Không đọc được dữ liệu");

    // Cách 3: match — xử lý lỗi tường minh
    match io::stdin().read_line(&mut input) {
        Ok(_) => println!("Đọc thành công: {}", input.trim()),
        Err(e) => eprintln!("Lỗi: {}", e),
    }

    // Cách 4: unwrap_or_default() — trả về giá trị mặc định nếu lỗi
    // let n: usize = io::stdin().read_line(&mut input).unwrap_or(0);
}</code></pre>
</div>

<h3 class="task-heading">8. Ví dụ tổng hợp</h3>

<p>Chương trình sau yêu cầu người dùng nhập họ tên và tuổi, sau đó in ra thông tin đã nhập:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    // Đọc họ tên
    let mut name = String::new();
    println!("Họ tên:");
    io::stdin().read_line(&mut name).expect("Lỗi đọc tên");
    let name = name.trim();

    // Đọc tuổi
    let mut age_str = String::new();
    println!("Tuổi:");
    io::stdin().read_line(&mut age_str).expect("Lỗi đọc tuổi");
    let age: u32 = age_str.trim().parse().expect("Tuổi phải là số!");

    // In thông tin
    println!();
    println!("=== Thông tin của bạn ===");
    println!("Họ tên: {}", name);
    println!("Tuổi:   {}", age);
    println!("Tuổi + 10: {}", age + 10);
}</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Họ tên:
Nguyen Van A
Tuổi:
25

=== Thông tin của bạn ===
Họ tên: Nguyen Van A
Tuổi:   25
Tuổi + 10: 35</code></pre>
</div>

<h3 class="task-heading">Các bài tập thực hành</h3>

<p>Hãy nhấn <strong>Nộp bài</strong> để làm các bài tập từ 1.4.1 đến 1.4.5. Mỗi bài tập thực hành một phương thức nhập liệu khác nhau:</p>

<ul class="task-list">
  <li><strong>1.4.1</strong> — Đọc một dòng với <code>read_line()</code> (tên + chào hỏi)</li>
  <li><strong>1.4.2</strong> — Đọc số với <code>read_line()</code> + <code>parse()</code> (cộng hai số)</li>
  <li><strong>1.4.3</strong> — Đọc nhiều dòng với <code>read_to_string()</code> (in lại input)</li>
  <li><strong>1.4.4</strong> — Đọc và đếm dòng với <code>lines()</code> (đếm dòng &amp; từ)</li>
  <li><strong>1.4.5</strong> — Tổng hợp: đọc họ tên + tuổi + in thông tin</li>
</ul>

<div class="cyber-alert info">
  <strong>Mẹo:</strong> Với bài 1.4.4, stdin được gửi tự động từ hệ thống (không cần gõ thủ công). Đọc toàn bộ stdin bằng <code>read_to_string()</code> rồi tách bằng <code>lines()</code>.
</div>
`,
    defaultCode: `// 1.4 Nhập & Xuất Dữ Liệu
// ============================
// Học cách đọc dữ liệu từ người dùng trong Rust

use std::io;

fn main() {
    // Ví dụ: đọc một dòng từ người dùng
    let mut name = String::new();
    println!("Nhập tên của bạn:");
    io::stdin().read_line(&mut name).expect("Lỗi đọc dữ liệu");

    // .trim() loại bỏ ký tự xuống dòng \\n
    let name = name.trim();

    println!("Xin chào, {}!", name);
}
`
};
