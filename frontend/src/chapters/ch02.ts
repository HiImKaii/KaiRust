import { Chapter } from '../courses';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số',
  lessons: [
    {
      id: 'ch02-01',
      title: '2.1 Thiết lập dự án (Setting Up)',
      duration: '10 phút',
      type: 'theory',
      content: `
<p>Hãy cùng nhau lao vào thế giới Rust bằng cách làm việc qua một dự án thực tế! Chương này sẽ giới thiệu cho bạn một vài khái niệm phổ biến trong Rust, cho phép bạn thấy chúng hoạt động như thế nào trong thực tế. Bạn sẽ học về <code>let</code>, <code>match</code>, methods (phương thức), associated functions (hàm liên kết), các crates (gói thư viện) bên ngoài, và nhiều hơn thế nữa.</p>

<p>Chúng ta sẽ lập trình một trò chơi đoán số cổ điển. Cơ chế hoạt động của trò chơi rất đơn giản: chương trình sẽ tạo ra một số nguyên ngẫu nhiên từ 1 đến 100. Sau đó ngườiơi sẽ nhập một số dự đoán. Nếu số đó chưa đúng, chương trình sẽ báo cho người chơi biết là họ đã đoán quá thấp hay quá cao. Nếu đoán đúng, chương trình sẽ in ra lời chúc mừng và thoát kỏi trò chơi.</p>

<h3 class="task-heading">Tạo một Dự án mới</h3>
<p>Để bắt đầu tạo dự án, đi tới thư mục chứa code của bạn (ví dụ <code>projects</code>) mà bạn đã tạo ở Chương 1, và tạo một dự án mới bằng Cargo, giống như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new guessing_game
$ cd guessing_game</code></pre>
</div>

<p>Lệnh đầu tiên, <code>cargo new</code>, nhận đối số là tên của dự án (<code>guessing_game</code>). Lệnh <code>cd</code> đưa chúng ta vào đúng thư mục của dự án mới tạo.</p>

<p>Hãy nhìn vào file <code>Cargo.toml</code> vừa được sinh ra:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>

<p>Đúng như những gì ta thấy ở chương trước, <code>cargo new</code> đã tự động tạo cho chúng ta một chương trình "Hello, world!" ở trong file <code>src/main.rs</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>

<p>Bây giờ, hãy thử biên dịch và chạy chương trình trong một bước bằng lệnh <code>cargo run</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 1.50s
     Running \`target/debug/guessing_game\`
Hello, world!</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Mẹo:</strong> Lệnh <code>cargo run</code> rất tiện lợi khi bạn cần lặp đi lặp lại một dự án nhanh chóng, giống như chúng ta sẽ làm trong trò chơi này, kiểm tra nhanh chóng code mỗi lần thêm chức năng mới trước khi chuyển sang bước tiếp theo.
</div>
`,
      defaultCode: `fn main() {
    println!("Dự án đoán số đã sẵn sàng!");
    // Tại đy, bạn chỉ cần hiểu file main.rs mặc định trông thế nào
    // Chuyển sang bài sau để thực sự bắt tay vào viết logic.
}
`,
      expectedOutput: 'Dự án đoán số đã sẵn sàng!'
    },
    {
      id: 'ch02-02',
      title: '2.2 Xử lý và đọc lệnh (Processing a Guess)',
      duration: '20 phút',
      type: 'practice',
      content: `
<p>Phần đầu tiên của chương trình đoán số là yêu cầu người chơi nhập thông tin, xử lý thông tin đó, và kiểm tra xem thông tin đầu vào có đúng định dạng không.</p>

<h3 class="task-heading">Nhận đầu vào từ Terminal</h3>
<p>Đầu tiên, chúng ta sẽ viết code cho phép người chơi nhập số mà họ dự đoán vào terminal. Gõ đoạn mã sau vào <code>src/main.rs</code> (hoặc chạy thử ở bên phải):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}</code></pre>
</div>

<p>Hãy chia nhỏ đoạn code trên để xem chính xác điều gì đã xảy ra.</p>

<div class="cyber-alert info">
  <strong>Nhập Thư Viện:</strong> Ở dòng đầu tiên <code>use std::io;</code>, chúng ta yêu cầu Rust mang thư viện input/output (nhập/xuất) vào scope. Thư viện <code>io</code> này nằm bên trong thư viện chuẩn (standard library) của Rust (<code>std</code>). Theo mặc định, Rust sẽ chỉ có một bộ sưu tập nhỏ các thành phần được mang vào scope của mọi chương trình (The Prelude). Nếu kiểu bạn cần không nằm trong <em>prelude</em>, bạn phải tự mang nó vào bẳng lệnh <code>use</code>.
</div>

<h3 class="task-heading">Biến và Tính Bất Biến (Variables and Mutability)</h3>
<p>Tiếp theo, lệnh <code>let mut guess = String::new();</code> tạo ra một biến. Trong Rust, các biến theo mặc định là <strong>immutable</strong> (bất biến), nghĩa là sau khi chúng ta cung cấp cho biến giá trị, biến đó sẽ mang giá trị đó mãi mãi. Để tạo một biễn có thể thay đổi (mutable), bạn cần thêm từ khoá <code>mut</code> trước tên biến:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let apples = 5; // apples không thể bị thay đổi
let mut bananas = 5; // bananas CÓ THỂ thay đổi sau này</code></pre>
</div>

<p>Phần <code>String::new()</code> trả về một instance mới của kiểu <code>String</code>, một kiểu dữ liệu chuỗi có thể tự mở rộng kích thước, được mã hoá bằng UTF-8. <code>::</code> trong cú pháp có nghĩa <code>new</code> là một <em>associated function</em> (hàm liên kết) của <code>String</code>. Một <em>associated function</em> là một hàm được triển khai trên chính kiểu đó (như String), chứ không phải trên một instance cụ thể.</p>

<h3 class="task-heading">Đọc lệnh người dùng</h3>
<p>Giờ ta gọi hàm <code>stdin()</code> từ module <code>io</code>. Đoạn <code>.read_line(&mut guess)</code> để lấy những gì người dùng gõ. Ta truyền <code>&mut guess</code> như một tham số báo cho hàm biết: <em>"Hãy lấy dữ liệu và lưu VÀO biến này"</em>.</p>
<p>Tại sao lại là <code>&mut</code>? Kí tự <code>&</code> cho biết tham số là một <strong>reference</strong> (tham chiếu), cho phép nhiều phần trong code của bạn truy cập một mảnh dữ liệu duy nhất mà không cần phải copy mớ dữ liệu đó nhiều lần vào bộ nhớ. References là một tính năng cực kì siêu việt, nhưng theo mặc định nó cũng là bất biến. Đó là lý do ta phải viết là <code>&mut guess</code> chứ không phải <code>&guess</code>, để hàm <code>read_line</code> được phép viết thêm dữ liệu vào biến của ta.</p>

<h3 class="task-heading">Xử lý Nỗi Bại (Handling Potential Failure)</h3>
<p>Nếu chúng ta bỏ qua hàm <code>.expect(...)</code>, Rust sẽ ném cho ta một dòng cảnh báo (Dù code vẫn chạy được). Lý do là <code>read_line</code> trả về dạng <code>Result</code> - vốn chứa đựng hai trạng thái có thể xảy ra gồm <code>Ok</code> (Thành công) và <code>Err</code> (Lỗi). Phương thức <code>expect</code> là cách ta bảo máy tính: <em>"Nếu Err thì sập chương trình in ra lỗi, nếu Ok thì cứ nhả r a giá trị người dùng nhập"</em>.</p>

`,
      defaultCode: `use std::io;

fn main() {
    println!("Trò chơi Đoán Số!");
    println!("Hãy nhập con số bạn đoán:");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Không thể đọc dòng dữ liệu. Có lỗi xảy ra!");

    // Cú pháp {guess} ở đây tương đương với string interpolation ở JS
    println!("Bạn đã đoán con số: {guess}");
}
`,
      expectedOutput: 'Trò chơi Đoán Số!\nHãy nhập con số bạn đoán:\nBạn đã đoán con số: '
    },
    {
      id: 'ch02-03',
      title: '2.3 Số ảo diệu (Generating Secret Numbers)',
      duration: '25 phút',
      type: 'practice',
      content: `
<p>Bước tiếp theo là việc bắt máy tính sinh ra một số bị ẩn đi (Secret Number) mà người chơi sẽ chẳng biết. Thư viện tiêu chuẩn (std) của Rust <strong>không</strong> hề chứa sẵn hàm random. Tin vui là Team phát triển Rust phát hành sẵn một gói <strong>Crate</strong> bên ngoài tên là <code>rand</code>.</p>

<h3 class="task-heading">Sử dụng Crates để nạp sức mạnh</h3>
<p>Hãy nhớ, Crate là một tập hợp các tệp mã nguồn Rust. Crate dự án mà bạn đan viết là một dạng <em>binary crate</em> (thực thi ra exe). Gói <code>rand</code> mà ta tải về từ Internet lại là <em>library crate</em>, chỉ chứa các hàm để tái sử dụng.</p>
<p>Trong một dự án thật, bạn sẽ phải vào file <code>Cargo.toml</code> và thêm <code>rand = "0.8.5"</code>. Sau đó chạy lệnh <code>cargo build</code>, Cargo sẽ chủ động lên Server gốc của ngôn ngữ Rust để bê bản cài đặt về PC của bạn.</p>

<div class="cyber-alert info">
  <strong>Trong môi trường học tập KaiRust này:</strong> Backend giả lập đã được chuẩn bị sẵn không gian cho các crates phổ biến như \`rand\`, nên bạn không cần cài tay!
</div>

<h3 class="task-heading">Vận hành bộ Random</h3>
<p>Đưa thư viện rand vào ứng dụng giống thư viện io:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use rand::Rng;

fn main() {
    println!("Đoán số nào!");

    // thread_rng() là hàm tạo số ngẫu nhiên cụm theo Thread (Cực kì bảo mật)
    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("Con số tôi đang giấu là: {secret_number}"); // Chỉ gõ dòng này để test, giấu đi lúc chơi thực tế nhé
}</code></pre>
</div>
<p>Hàm <code>gen_range(1..=100)</code> nhận vào một miền số chạy từ 1 đến 100.</p>

<h3 class="task-heading">So Sánh kết quả (The Match Expression)</h3>
<p>Làm thế nào để so hai số trong Rust? Chúng ta có <code>std::cmp::Ordering</code>. Nỏ sẽ sinh ra ba kết quả <code>Less</code>, <code>Greater</code>, và <code>Equal</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cmp::Ordering;

// ... (code tạo guess và secret_number) ...

match guess.cmp(&secret_number) {
    Ordering::Less => println!("Bé quá!"),
    Ordering::Greater => println!("Lớn quá!"),
    Ordering::Equal => println!("Tuyệt! Đoán trúng luôn!"),
}</code></pre>
</div>

<p><code>match</code> là một trong những tính nưng siêu việt độc nhất vô nhị chỉ Rust mới có. Nó sẽ check xem kết quả trả về khớp <strong>nhánh</strong> (arm) nào giống y như một chuyên gia lựa chọn siêu việt, bỏ qua if-else dài ngoằng.</p>

<h3 class="task-heading">Cú Bóng Đè (Shadowing) và Lỗi Kiểu Dữ Liệu</h3>
<p>Nếu bạn ghép ngay lệnh <code>match</code> bên trên vào code, Trình biên dịch Rust sẽ <strong>BÁO ĐỎ LỖI</strong> lập tức. Lý do? Nhanh nhạy sẽ phát hiện: <code>guess</code> là kiểu dữ liệu chuỗi văn bản (String) người dùng gõ vào, mà <code>secret_number</code> là kiểu dữ liệu Số máy tạo ra (u32). Máy không bao giờ cho phép lấy Chuỗi (Chữ cái) đi so nhỏ hơn và lớn hơn với Các Con Số.</p>
<p>Để chữa lỗi, ta ép kiểu <code>guess</code> từ String sang Số:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = guess.trim().parse().expect("Dữ liệu nhập không phải là số!");</code></pre>
</div>
<p>Tại đây, sự vĩ đại của Rust tiếp tục toả sáng: Ta có thể định nghĩa lại một biến trùng tên (gọi là <strong>Shadowing</strong> - Cái bóng của biến cũ bị đè lên). Hàm <code>trim()</code> nhằm chặn các kí tự trống như Enter, Space người dùng lỡ bấm, và <code>parse()</code> phân tách chúng thành kiểu số <code>u32</code> ta ấn định.</p>
`,
      defaultCode: `use std::cmp::Ordering;
use std::io;

fn main() {
    println!("=== TRÒ CHƠI ĐOÁN SỐ ===");

    // Để hệ thống biên dịch nhanh, ta thiết lập một số ngẫu nhiên cố định trước
    // Mở rộng sau: let secret_number = rand::thread_rng().gen_range(1..=100);
    let secret_number = 69;

    println!("Bạn hãy nhập một con số từ 1-100 vào:");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Không thể đọc dòng của máy!");

    // Chuyển kiểu dữ liệu từ chữ sang số
    let guess: u32 = guess.trim().parse().expect("Bắt buộc phải nhập số nguyên!");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Số nhỏ quá!"),
        Ordering::Greater => println!("Số lớn thế!"),
        Ordering::Equal => println!("Chính xác, thiên tài!"),
    }
}
`,
      expectedOutput: '=== TRÒ CHƠI ĐOÁN SỐ ===\nBạn hãy nhập một con số từ 1-100 vào:\n'
    },
    {
      id: 'ch02-04',
      title: '2.4 Vòng lặp & Thoát êm (Loop and Graceful End)',
      duration: '20 phút',
      type: 'practice',
      content: `
<p>Hiện tại chương trình của chúng ta chỉ cho chơi đúng... một lần rồi thôi. Đó hoàn toàn không phải là một trò chơi đúng nghĩa. Hãy sử dụng từ khoá vòng lặp để kéo dài sự thú vị!</p>

<h3 class="task-heading">Tạo vòng lặp vô tận với \`loop\`</h3>
<p>Rust sở hữu rất nhiều dạng vòng lặp, từ for, while,... nhưng nếu bạn muốn lặp MÃI MÃI, gõ <code>loop</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>loop {
    println!("Bạn hãy nhập một con số từ 1-100 vào:");
    // ... code nhận input ...

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Nhỏ quá!"),
        Ordering::Greater => println!("To thế!"),
        Ordering::Equal => {
            println!("Đoán trúng rồi, xin chia tay!");
            break; // THOÁT KHỎI VÒNG LẶP DO ĐOÁN TRÚNG
        }
    }
}</code></pre>
</div>
<p>Nếu bạn không dùng từ khoá <code>break</code> ở nhánh Equal, vòng lặp sẽ trói chặt người chơi và không bao giờ thoát dù họ đoán đúng.</p>

<h3 class="task-heading">Xử lý nhập lỗi êm ái thay vì Nổ Đùng (Crash)</h3>
<p>Ở bài trước, ta dùng phương thức <code>expect("...")</code> cho bước <code>parse()</code> số. Điều này đồng nghĩa nếu một tay mơ nhấn chữ "ABCĐ" thay vì các con số 123, chương trình sẽ <strong>thẳng chân sụp đổ (panic/crash)</strong> lập tức.</p>
<p>Một Rust Server Engineer giỏi không bao giờ để máy chủ của họ Crash chỉ vì lỗi gõ của người dùng. Hãy thay thế <code>expect()</code> bằng một biểu thức <code>match</code> kinh điển khác:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,      // Nếu Parse thành công, nạp số đúng vào
    Err(_) => continue,  // Cứ kệ người đó, bỏ qua lỗi và lặp lại câu hỏi
};</code></pre>
</div>
<p>Phép màu của Rust là <code>Result</code> (Tương tự lời hứa hẹn - Promise nhưng chặt chẽ gấp vạn lần). Bằng cách khai báo <code>Err(_)</code>, bạn đang bảo với Rust là mặc kệ mọi lỗi được trả lại, cứ dùng từ khoá <code>continue</code> bốc người dùng đi lại phần đấu vòng lặp <code>loop</code> yêu cầu họ gõ lại từ đầu.</p>

<h3 class="task-heading">ĐẠI BẢN DOANH CHƯƠNG 2 HOÀN TẤT</h3>
<p>Bạn đã hoàn toàn đi qua toàn bộ khái niệm cốt lõi tạo nên bản sắc của việc lập trình Rust: </p>
<ul class="task-list">
  <li><code>let</code>, <code>mut</code>, <code>loop</code>: Biến và vòng lặp vững chãi.</li>
  <li><code>match</code>, <code>Ordering</code>, <code>Result</code>: Cấu trúc rẽ nhánh, kiểm soát từng ngóc ngách không cho lọt lỗi crash.</li>
  <li><code>use</code>, <code>cargo</code>, <code>crate</code>: Cách đưa cả hệ sinh thái vào code.</li>
</ul>
<p>Trong các chương tiếp theo, chúng ta sẽ lật sâu xem "bên trong lõi" Rust hoạt động như nào mà lại được công nhận là ngôn ngữ an toàn số 1 thế giới.</p>
`,
      defaultCode: `use std::cmp::Ordering;
use std::io;

fn main() {
    println!("=== TRUY VẤN MẬT MÃ ===");

    // Trong môi trường IDE tại local, bạn có thể uncomment dòng này
    // let secret_number = rand::thread_rng().gen_range(1..=100);
    // Để cho an toàn môi trường compiler ở đây, ta làm Secret cố định:
    let secret_number = 55;

    loop {
        println!("Nhập mã phá khoá (1-100):");

        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Dữ liệu Console Error!");

        // Biến hoá từ Expect() sang Cấu trúc kiểm soát êm ái
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("!> Vui lòng nhập đúng MÃ SỐ CHỮ.");
                continue;
            }
        };

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("--> Mã khoá lớn hơn con số này"),
            Ordering::Greater => println!("--> Mã khoá bé hơn"),
            Ordering::Equal => {
                println!("> OKEY, BẢO MẬT ĐÃ ĐƯỢC GIẢI TRỪ!");
                break;
            }
        }
    }
}
`,
      expectedOutput: '=== TRUY VẤN MẬT MÃ ===\nNhập mã phá khoá (1-100):'
    }
  ]
};
