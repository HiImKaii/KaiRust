import { Lesson } from '../../courses';

export const ch08_02: Lesson = {
            id: 'ch08-02',
            title: '8.2 Strings',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>String trong Rust phức tạp hơn bạn nghĩ! Rust có 2 kiểu string chính:</p>
<ul class="task-list">
  <li><code>String</code> — growable, mutable, owned, UTF-8</li>
  <li><code>&str</code> — string slice, immutable reference</li>
</ul>

<h3 class="task-heading">Tạo String</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::new();
let s = "initial contents".to_string();
let s = String::from("initial contents");</code></pre>
</div>

<h3 class="task-heading">Cập nhật String</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("foo");
s.push_str("bar");   // Thêm &str
s.push('!');          // Thêm 1 char

// Nối bằng +
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // s1 bị move!

// format! macro (không move)
let s = format!("{s2}-{s3}");</code></pre>
</div>

<h3 class="task-heading">UTF-8 và Indexing</h3>
<div class="cyber-alert info">
  <strong>Không thể index String!</strong> <code>s[0]</code> sẽ LỖI vì UTF-8 character có thể nhiều bytes. Dùng <code>.chars()</code> hoặc <code>.bytes()</code> để duyệt.
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let hello = String::from("Xin chào");
for c in hello.chars() {
    print!("{c} ");
}
// Slice (theo byte, cẩn thận!)
let s = &hello[0..3]; // "Xin"</code></pre>
</div>
`,
            defaultCode: `fn main() {
    // Tạo và nối String
    let greeting = String::from("Xin chào");
    let name = String::from("Rust");
    let message = format!("{greeting}, {name}!");
    println!("{message}");

    // push_str và push
    let mut s = String::from("Hello");
    s.push_str(", World");
    s.push('!');
    println!("{s}");

    // Duyệt chars
    let word = "Việt Nam";
    print!("Các ký tự: ");
    for c in word.chars() {
        print!("[{c}]");
    }
    println!();

    // Đếm
    println!("Số ký tự: {}", word.chars().count());
    println!("Số bytes: {}", word.len());
}
`,
            expectedOutput: 'Xin chào, Rust!\nHello, World!\nCác ký tự: [V][i][ệ][t][ ][N][a][m]\nSố ký tự: 8\nSố bytes: 10'
        };
