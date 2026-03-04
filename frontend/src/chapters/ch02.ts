import { Chapter } from '../courses';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số (Deep Dive)',
  lessons: [
    {
      id: 'ch02-01',
      title: '2.1 Khởi tạo dự án & Cargo.toml',
      duration: '15 phút',
      type: 'theory',
      content: `
<p>Hãy cùng nhau xây dựng một dự án thực tế để hiểu cách Rust vận hành. Chúng ta sẽ làm trò chơi <strong>Guessing Game</strong>.</p>

<h3 class="task-heading">Cargo: Hơn cả một trình quản lý gói</h3>
<p>Khi bạn chạy <code>cargo new guessing_game</code>, Cargo không chỉ tạo thư mục, nó thiết lập một <strong>hệ sinh thái</strong> nhỏ:</p>
<ul class="lesson-list">
  <li><code>Cargo.toml</code>: "Bản đồ" của dự án. Nơi bạn khai báo metadata và các thư viện (crates) phụ thuộc.</li>
  <li><code>src/main.rs</code>: Điểm khởi đầu của mọi chương trình thực thi (binary crate).</li>
  <li><code>.gitignore</code>: Cargo tự động khởi tạo Git cho bạn.</li>
</ul>

<h3 class="task-heading">Phân tích Cargo.toml</h3>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024" # Phiên bản ngôn ngữ Rust

[dependencies]
# Nơi thêm các thư viện bên ngoài</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Mục <code>edition</code> cực kỳ quan trọng. Mỗi vài năm, Rust ra mắt một bản Edition mới (2015, 2018, 2021, 2024) để thêm tính năng mới mà không làm hỏng code cũ.
</div>
`,
      defaultCode: `fn main() {
    println!("Dự án đã sẵn sàng!");
}
`,
      expectedOutput: 'Dự án đã sẵn sàng!'
    },
    {
      id: 'ch02-02',
      title: '2.2 Biến, Khả biến và Chuỗi (Strings)',
      duration: '25 phút',
      type: 'practice',
      content: `
<p>Trong Rust, sự an toàn đến từ việc kiểm soát <strong>quyền thay đổi</strong> dữ liệu.</p>

<h3 class="task-heading">Tính Bất Biến (Immutability)</h3>
<p>Mặc định, mọi biến trong Rust đều là <strong>bất biến</strong>. Nếu bạn muốn thay đổi, bạn phải "xin phép" bằng từ khóa <code>mut</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;      // x là hằng số (trong phạm vi block)
let mut y = 10; // y có thể thay đổi</code></pre>
</div>

<h3 class="task-heading">String::new() và Associated Functions</h3>
<p><code>String::new()</code> tạo ra một chuỗi trống. Dấu <code>::</code> chỉ ra rằng <code>new</code> là một <strong>Associated Function</strong> của kiểu <code>String</code>, tương tự như static method trong các ngôn ngữ khác.</p>

<h3 class="task-heading">Tham chiếu (&) và &mut</h3>
<p>Khi ta dùng <code>read_line(&mut guess)</code>, dấu <code>&</code> đại diện cho <strong>Reference</strong> (Tham chiếu). Nó cho phép hàm truy cập biến <code>guess</code> mà không cần copy dữ liệu (giúp tiết kiệm RAM cực mạnh).</p>

<div class="cyber-alert warning">
  <strong>Chú ý:</strong> Tham chiếu cũng bất biến theo mặc định. Vì thế ta cần viết <code>&mut guess</code> chứ không phải chỉ <code>&guess</code> để hàm 'read_line' có quyền ghi đè dữ liệu vào biến đó.
</div>
`,
      defaultCode: `use std::io;

fn main() {
    println!("Hãy nhập bất cứ thứ gì:");

    let mut input = String::new();

    io::stdin()
        .read_line(&mut input)
        .expect("Lỗi đọc dữ liệu!");

    println!("Bạn đã nhập: {}", input.trim());
}
`,
      expectedOutput: 'Hãy nhập bất cứ thứ gì:\nBạn đã nhập: '
    },
    {
      id: 'ch02-03',
      title: '2.3 Control Flow: Match vs If-Else',
      duration: '30 phút',
      type: 'practice',
      content: `
<p>Thay vì dùng những câu lệnh <code>if-else</code> lồng nhau phức tạp, Rust khuyến khích dùng <strong>Match Control Flow</strong>.</p>

<h3 class="task-heading">Sức mạnh của Match</h3>
<p><code>match</code> bắt buộc bạn phải xử lý <strong>mọi trường hợp có thể xảy ra</strong>. Nếu bạn quên một trường hợp, code sẽ không thể biên dịch. Đây là lý do Rust rất ít khi bị lỗi runtime bất ngờ.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match cmp_result {
    Ordering::Less    => println!("Bé quá!"),
    Ordering::Greater => println!("Lớn quá!"),
    Ordering::Equal   => println!("Chuẩn!"),
}</code></pre>
</div>

<h3 class="task-heading">Ép kiểu (Shadowing & Parsing)</h3>
<p>Dữ liệu từ <code>stdin</code> luôn là <code>String</code>. Để so sánh với số, ta cần chuyển kiểu:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = guess.trim().parse().expect("Vui lòng nhập số!");</code></pre>
</div>
<p>Ở đây ta dùng <strong>Shadowing</strong>: tạo một biến <code>guess</code> mới (kiểu số) để che đi biến <code>guess</code> cũ (kiểu chuỗi).</p>
`,
      defaultCode: `use std::cmp::Ordering;

fn main() {
    let secret = 42;
    let guess = "42"; // Giả sử đây là input từ người dùng

    // Shadowing: chuyển chuỗi thành số
    let guess: i32 = guess.trim().parse().unwrap();

    match guess.cmp(&secret) {
        Ordering::Less => println!("Nhỏ hơn"),
        Ordering::Greater => println!("Lớn hơn"),
        Ordering::Equal => println!("Bằng nhau!"),
    }
}
`,
      expectedOutput: 'Bằng nhau!'
    },
    {
      id: 'ch02-04',
      title: '2.4 Vòng lặp Loop và Handling Error',
      duration: '20 phút',
      type: 'practice',
      content: `
<p>Để trò chơi không kết thúc ngay sau 1 lần đoán, ta dùng <code>loop</code>.</p>

<h3 class="task-heading">Continue và Break</h3>
<ul class="lesson-list">
  <li><code>break</code>: Thoát hẳn khỏi vòng lặp (dùng khi đoán đúng).</li>
  <li><code>continue</code>: Bỏ qua phần còn lại và bắt đầu vòng lặp mới (dùng khi người dùng nhập sai định dạng).</li>
</ul>

<h3 class="task-heading">Xử lý lỗi như một Pro</h3>
<p>Thay vì <code>expect()</code> làm sập chương trình, ta dùng <code>match</code> trên kết quả của <code>parse()</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue, // Bỏ qua nếu nhập chữ, bắt nhập lại
};</code></pre>
</div>
`,
      defaultCode: `fn main() {
    let mut count = 0;
    loop {
        count += 1;
        if count == 3 {
             println!("Đến số 3 rồi kìa!");
             continue;
        }
        if count > 5 {
             break;
        }
        println!("Số: {}", count);
    }
}
`,
      expectedOutput: 'Số: 1\nSố: 2\nĐến số 3 rồi kìa!\nSố: 4\nSố: 5'
    },
    {
      id: 'ch02-05',
      title: '2.5 Chương trình Hoàn chỉnh (Full Program)',
      duration: '30 phút',
      type: 'practice',
      content: `
<p>Chúc mừng! Bạn đã nắm giữ toàn bộ "vũ khí" để hoàn thành trò chơi đầu tay. Dưới đây là kiến trúc tổng thể của Guessing Game.</p>

<h3 class="task-heading">Những điều cần nhớ:</h3>
<ol class="lesson-list">
  <li>Dùng <code>rand::Rng</code> (bên ngoài thư viện chuẩn) để tạo số ngẫu nhiên.</li>
  <li>Sử dụng <code>std::io</code> để giao tiếp với người dùng.</li>
  <li>Kết hợp <code>loop</code> và <code>match</code> để tạo logic game mượt mà.</li>
</ol>

<div class="cyber-alert info">
  <strong>Thử thách:</strong> Ở code bên phải, tôi đã chuẩn bị khung sườn. Nhiệm vụ của bạn là ghép nối chúng lại để tạo ra một trò chơi đoán số hoàn hảo.
</div>
`,
      defaultCode: `use std::io;
use std::cmp::Ordering;
// Trong dự án thật, bạn cần thêm \`rand\` vào Cargo.toml
// Ở đây ta giả lập secret_number
fn main() {
    println!("--- TRÒ CHƠI ĐOÁN SỐ (CẤP ĐỘ RUST) ---");
    let secret_number = 77; 

    loop {
        println!("Mời nhập con số (1-100):");

        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("Lỗi đọc!");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Vui lòng nhập số hợp lệ!");
                continue;
            },
        };

        println!("Bạn đoán: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Thấp quá!"),
            Ordering::Greater => println!("Cao quá!"),
            Ordering::Equal => {
                println!("CHÚC MỪNG! BẠN ĐÃ THẮNG!");
                break;
            }
        }
    }
}
`,
      expectedOutput: '--- TRÒ CHƠI ĐOÁN SỐ (CẤP ĐỘ RUST) ---\nMời nhập con số (1-100):'
    }
  ]
};
