import { Chapter } from '../courses';

export const ch02: Chapter = {
    id: 'ch02',
    title: 'Chương 2: Lập trình trò chơi đoán số',
    lessons: [
        {
            id: 'ch02-01',
            title: '2.1 Thiết lập dự án',
            duration: '10 phút',
            type: 'theory',
            content: `
<p>Hãy bắt đầu với Rust bằng cách cùng nhau làm một dự án thực hành! Chương này giới thiệu một số khái niệm Rust phổ biến: <code>let</code>, <code>match</code>, methods, associated functions, crate bên ngoài, v.v.</p>

<p>Chúng ta sẽ triển khai trò chơi đoán số kinh điển: chương trình tạo một số ngẫu nhiên từ 1 đến 100, người chơi nhập số đoán, và chương trình cho biết đoán quá thấp hay quá cao.</p>

<h3 class="task-heading">Tạo dự án mới với Cargo</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new guessing_game
$ cd guessing_game</code></pre>
</div>

<p>File <code>Cargo.toml</code> được tạo tự động:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>

<p>Cargo tạo sẵn chương trình "Hello, world!" trong <code>src/main.rs</code>. Hãy chạy thử:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0
    Finished dev [unoptimized + debuginfo]
     Running \`target/debug/guessing_game\`
Hello, world!</code></pre>
</div>
`,
            defaultCode: `fn main() {
    println!("Hello, world!");
    // Đây là chương trình mặc định Cargo tạo ra
    // Chúng ta sẽ sửa thành trò chơi đoán số
}
`,
            expectedOutput: 'Hello, world!'
        },
        {
            id: 'ch02-02',
            title: '2.2 Xử lý một lượt đoán',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Phần đầu tiên sẽ yêu cầu người dùng nhập số đoán, xử lý input và kiểm tra định dạng.</p>

<h3 class="task-heading">Nhận input từ người dùng</h3>
<p>Để nhận input và in output, ta cần đưa thư viện <code>io</code> (input/output) vào scope:</p>
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

<h3 class="task-heading">Lưu trữ giá trị với biến</h3>
<p>Dòng <code>let mut guess = String::new();</code> tạo một biến <strong>mutable</strong> (có thể thay đổi). Trong Rust, biến mặc định là <strong>immutable</strong> (không thay đổi).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let apples = 5;     // immutable
let mut bananas = 5; // mutable</code></pre>
</div>

<p>Cú pháp <code>::</code> trong <code>String::new()</code> cho biết <code>new</code> là <strong>associated function</strong> (hàm gắn liền với kiểu dữ liệu) của <code>String</code>.</p>

<h3 class="task-heading">Xử lý lỗi tiềm ẩn với Result</h3>
<p>Phương thức <code>.read_line()</code> trả về <code>Result</code> — một enum có thể là <code>Ok</code> hoặc <code>Err</code>. Nếu không gọi <code>.expect()</code>, compiler sẽ cảnh báo bạn chưa xử lý lỗi.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> <code>println!("You guessed: {guess}")</code> sử dụng cú pháp <code>{}</code> để chèn giá trị biến trực tiếp vào chuỗi. Đây gọi là <strong>string interpolation</strong>.
</div>
`,
            defaultCode: `use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
`,
            expectedOutput: 'Guess the number!\nPlease input your guess.\nYou guessed: '
        },
        {
            id: 'ch02-03',
            title: '2.3 Tạo số bí mật & So sánh',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Tiếp theo, ta cần tạo số ngẫu nhiên để người chơi đoán. Rust không có chức năng random trong thư viện chuẩn, nhưng cung cấp <strong>crate</strong> <code>rand</code>.</p>

<h3 class="task-heading">Thêm crate bên ngoài</h3>
<p>Thêm <code>rand</code> vào phần <code>[dependencies]</code> trong <code>Cargo.toml</code>:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.8.5"</code></pre>
</div>

<h3 class="task-heading">Tạo số ngẫu nhiên</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use rand::Rng;

let secret_number = rand::thread_rng().gen_range(1..=100);
println!("The secret number is: {secret_number}");</code></pre>
</div>

<h3 class="task-heading">So sánh số đoán với số bí mật</h3>
<p>Sử dụng <code>std::cmp::Ordering</code> và biểu thức <code>match</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cmp::Ordering;

match guess.cmp(&secret_number) {
    Ordering::Less => println!("Too small!"),
    Ordering::Greater => println!("Too big!"),
    Ordering::Equal => println!("You win!"),
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Biểu thức match:</strong> gồm nhiều <strong>arms</strong> (nhánh). Mỗi arm có một pattern và code sẽ chạy nếu giá trị khớp với pattern đó. Đây là tính năng mạnh mẽ nhất của Rust.
</div>

<h3 class="task-heading">Chuyển đổi kiểu dữ liệu</h3>
<p>Biến <code>guess</code> là <code>String</code>, nhưng <code>secret_number</code> là số. Cần chuyển đổi:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = guess.trim().parse().expect("Please type a number!");</code></pre>
</div>
<p>Rust cho phép <strong>shadowing</strong> — tái sử dụng tên biến <code>guess</code> với kiểu dữ liệu mới.</p>
`,
            defaultCode: `use std::cmp::Ordering;
use std::io;
// use rand::Rng; // Cần thêm rand vào Cargo.toml

fn main() {
    println!("Guess the number!");

    let secret_number = 42; // Tạm dùng số cố định
    // let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("Please input your guess.");

    let mut guess = String::new();
    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    let guess: u32 = guess.trim().parse().expect("Please type a number!");

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}
`,
            expectedOutput: 'Guess the number!\nPlease input your guess.'
        },
        {
            id: 'ch02-04',
            title: '2.4 Vòng lặp & Xử lý input không hợp lệ',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Hiện tại người chơi chỉ được đoán 1 lần. Hãy thêm vòng lặp <code>loop</code> để cho phép đoán nhiều lần!</p>

<h3 class="task-heading">Thêm vòng lặp</h3>
<p>Keyword <code>loop</code> tạo vòng lặp vô hạn. Dùng <code>break</code> để thoát khi đoán đúng:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>loop {
    println!("Please input your guess.");
    // ... code nhận input ...

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => {
            println!("You win!");
            break;
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Xử lý input không hợp lệ</h3>
<p>Thay vì crash khi người dùng nhập chữ, dùng <code>match</code> với <code>parse()</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,  // Bỏ qua và hỏi lại
};</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Chuyển từ expect() sang match:</strong> Đây là cách xử lý lỗi đúng đắn trong Rust. Thay vì crash chương trình, ta xử lý lỗi một cách nhẹ nhàng (graceful error handling).
</div>

<h3 class="task-heading">Code hoàn chỉnh</h3>
<p>Chương trình hoàn chỉnh kết hợp tất cả các khái niệm: <code>let</code>, <code>match</code>, methods, associated functions, crate bên ngoài, vòng lặp, và xử lý lỗi.</p>

<h3 class="task-heading">Tóm tắt</h3>
<ul class="task-list">
  <li><code>let</code>, <code>match</code> — khai báo biến và pattern matching</li>
  <li><code>use</code> — đưa module vào scope</li>
  <li>Crate bên ngoài — mở rộng chức năng với hệ sinh thái Rust</li>
  <li>Xử lý lỗi — <code>Result</code>, <code>expect()</code>, <code>match</code></li>
</ul>
`,
            defaultCode: `use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = 42;

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
`,
            expectedOutput: 'Guess the number!'
        }
    ]
};
