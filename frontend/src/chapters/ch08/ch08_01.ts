import { Lesson } from '../../courses';

export const ch08_01: Lesson = {
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
        };
