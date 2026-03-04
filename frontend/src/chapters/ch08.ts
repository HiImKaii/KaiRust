import { Chapter } from '../courses';

export const ch08: Chapter = {
    id: 'ch08',
    title: 'Chương 8: Collections phổ biến',
    lessons: [
        {
            id: 'ch08-01',
            title: '8.1 Vectors',
            duration: '25 phút',
            type: 'practice',
            content: `
<p><strong>Vec&lt;T&gt;</strong> (Vector) là collection phổ biến nhất — lưu trữ danh sách giá trị cùng kiểu, kích thước thay đổi được.</p>

<h3 class="task-heading">Tạo Vector</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v: Vec&lt;i32&gt; = Vec::new();
let v = vec![1, 2, 3]; // macro vec!</code></pre>
</div>

<h3 class="task-heading">Thêm phần tử</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut v = Vec::new();
v.push(5);
v.push(6);
v.push(7);</code></pre>
</div>

<h3 class="task-heading">Đọc phần tử</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3, 4, 5];

// Indexing (panic nếu out of bounds)
let third = &v[2];

// .get() (trả về Option, an toàn hơn)
match v.get(2) {
    Some(val) => println!("Phần tử thứ 3: {val}"),
    None => println!("Không tồn tại"),
}</code></pre>
</div>

<h3 class="task-heading">Duyệt Vector</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![100, 32, 57];
for n in &v {
    println!("{n}");
}

// Mutable iteration
let mut v = vec![100, 32, 57];
for n in &mut v {
    *n += 50; // Dereference để thay đổi giá trị
}</code></pre>
</div>

<h3 class="task-heading">Vec với Enum (lưu nhiều kiểu)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Cell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    Cell::Int(3),
    Cell::Float(10.12),
    Cell::Text(String::from("blue")),
];</code></pre>
</div>
`,
            defaultCode: `fn main() {
    // Tạo và thêm phần tử
    let mut fruits = Vec::new();
    fruits.push("Táo");
    fruits.push("Cam");
    fruits.push("Chuối");
    fruits.push("Xoài");

    // Đọc phần tử
    println!("Đầu tiên: {}", fruits[0]);

    // An toàn hơn với .get()
    match fruits.get(10) {
        Some(f) => println!("Tìm thấy: {f}"),
        None => println!("Index 10 không tồn tại!"),
    }

    // Duyệt
    println!("\\nDanh sách trái cây:");
    for (i, fruit) in fruits.iter().enumerate() {
        println!("  {}. {fruit}", i + 1);
    }

    println!("\\nTổng: {} loại", fruits.len());
}
`,
            expectedOutput: 'Đầu tiên: Táo\nIndex 10 không tồn tại!\n\nDanh sách trái cây:\n  1. Táo\n  2. Cam\n  3. Chuối\n  4. Xoài\n\nTổng: 4 loại'
        },
        {
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
        },
        {
            id: 'ch08-03',
            title: '8.3 Hash Maps',
            duration: '20 phút',
            type: 'practice',
            content: `
<p><strong>HashMap&lt;K, V&gt;</strong> lưu trữ cặp key-value. Tương tự dict (Python), object (JS), map (Java).</p>

<h3 class="task-heading">Tạo và thêm</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);</code></pre>
</div>

<h3 class="task-heading">Đọc giá trị</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let score = scores.get("Blue"); // Option<&V></code></pre>
</div>

<h3 class="task-heading">Cập nhật</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Ghi đè
scores.insert(String::from("Blue"), 25);

// Chỉ insert nếu key chưa tồn tại
scores.entry(String::from("Blue")).or_insert(50);

// Cập nhật dựa trên giá trị cũ
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}</code></pre>
</div>
`,
            defaultCode: `use std::collections::HashMap;

fn main() {
    // Đếm từ
    let text = "xin chào rust xin chào thế giới rust rust";

    let mut word_count = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }

    println!("Đếm từ:");
    for (word, count) in &word_count {
        println!("  '{word}': {count} lần");
    }

    // Bảng điểm
    let mut scores = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 87);
    scores.insert("Charlie", 92);

    let target = "Bob";
    match scores.get(target) {
        Some(score) => println!("\\n{target} được {score} điểm"),
        None => println!("\\nKhông tìm thấy {target}"),
    }
}
`,
            expectedOutput: 'Đếm từ:\n  \'xin\': 2 lần\n  \'chào\': 2 lần\n  \'rust\': 3 lần\n  \'thế\': 1 lần\n  \'giới\': 1 lần\n\nBob được 87 điểm'
        }
    ]
};
