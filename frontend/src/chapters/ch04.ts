import { Chapter } from '../courses';

export const ch04: Chapter = {
    id: 'ch04',
    title: 'Chương 4: Hiểu về Ownership',
    lessons: [
        {
            id: 'ch04-01',
            title: '4.1 Ownership là gì?',
            duration: '30 phút',
            type: 'theory',
            content: `
<p><strong>Ownership</strong> là tính năng độc đáo nhất của Rust, cho phép đảm bảo an toàn bộ nhớ mà không cần garbage collector. Đây là khái niệm quan trọng nhất cần nắm vững.</p>

<h3 class="task-heading">Quy tắc Ownership</h3>
<ul class="task-list">
  <li>Mỗi giá trị trong Rust có một <strong>owner</strong> (chủ sở hữu)</li>
  <li>Tại mỗi thời điểm chỉ có <strong>duy nhất một owner</strong></li>
  <li>Khi owner ra khỏi scope, giá trị sẽ bị <strong>drop</strong> (giải phóng)</li>
</ul>

<h3 class="task-heading">Stack vs Heap</h3>
<p>Stack lưu dữ liệu có kích thước cố định (integer, bool...). Heap lưu dữ liệu có kích thước thay đổi (String, Vec...).</p>

<h3 class="task-heading">Move</h3>
<p>Với dữ liệu trên heap, gán biến sẽ <strong>move</strong> ownership:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1; // s1 đã bị move, không dùng được nữa!
// println!("{s1}"); // LỖI COMPILE!
println!("{s2}"); // OK</code></pre>
</div>

<h3 class="task-heading">Clone</h3>
<p>Dùng <code>.clone()</code> để tạo bản sao deep copy:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {s1}, s2 = {s2}"); // Cả hai đều OK</code></pre>
</div>

<h3 class="task-heading">Copy</h3>
<p>Kiểu dữ liệu trên stack (integer, bool, float, char, tuple chỉ chứa Copy types) tự động copy:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = x; // Copy, không phải move
println!("x = {x}, y = {y}"); // Cả hai đều OK</code></pre>
</div>

<h3 class="task-heading">Ownership và Functions</h3>
<p>Truyền giá trị vào hàm cũng giống gán biến — sẽ move hoặc copy:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn takes_ownership(s: String) {
    println!("{s}");
} // s bị drop ở đây

fn makes_copy(x: i32) {
    println!("{x}");
} // x vẫn hợp lệ ở hàm gọi</code></pre>
</div>
`,
            defaultCode: `fn main() {
    // Move
    let s1 = String::from("hello");
    let s2 = s1.clone(); // Dùng clone để giữ s1
    println!("s1 = {s1}, s2 = {s2}");

    // Copy (stack data)
    let x = 5;
    let y = x;
    println!("x = {x}, y = {y}");

    // Ownership và function
    let s = String::from("Rust");
    takes_ownership(s.clone());
    println!("Sau hàm: {s}"); // OK vì dùng clone

    let n = 42;
    makes_copy(n);
    println!("Sau hàm: {n}"); // OK vì i32 là Copy
}

fn takes_ownership(s: String) {
    println!("Hàm nhận: {s}");
}

fn makes_copy(n: i32) {
    println!("Hàm copy: {n}");
}
`,
            expectedOutput: 's1 = hello, s2 = hello\nx = 5, y = 5\nHàm nhận: Rust\nSau hàm: Rust\nHàm copy: 42\nSau hàm: 42'
        },
        {
            id: 'ch04-02',
            title: '4.2 References và Borrowing',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Thay vì chuyển ownership, bạn có thể <strong>mượn</strong> (borrow) giá trị bằng <strong>reference</strong> (<code>&</code>).</p>

<h3 class="task-heading">Immutable References</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // Mượn, không move
    println!("Độ dài '{s1}' là {len}"); // s1 vẫn dùng được
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s ra khỏi scope, nhưng không drop vì không own</code></pre>
</div>

<h3 class="task-heading">Mutable References</h3>
<p>Dùng <code>&mut</code> để mượn có thể chỉnh sửa:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{s}"); // "hello, world"
}

fn change(s: &mut String) {
    s.push_str(", world");
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quy tắc borrowing:</strong> Tại mỗi thời điểm, bạn chỉ có thể có <em>một trong hai</em>:
  <ul>
    <li>Một mutable reference (<code>&mut T</code>), HOẶC</li>
    <li>Bất kỳ số lượng immutable references (<code>&T</code>)</li>
  </ul>
  Quy tắc này ngăn chặn data race tại compile time!
</div>

<h3 class="task-heading">Dangling References</h3>
<p>Rust ngăn chặn dangling references tại compile time:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// LỖI COMPILE! Reference vẫn tồn tại sau khi data bị drop
// fn dangle() -> &String {
//     let s = String::from("hello");
//     &s  // s bị drop khi hàm kết thúc!
// }</code></pre>
</div>
`,
            defaultCode: `fn main() {
    let s1 = String::from("Xin chào");

    // Immutable borrow
    let len = calculate_length(&s1);
    println!("'{s1}' có {len} bytes");

    // Mutable borrow
    let mut s2 = String::from("Hello");
    append_world(&mut s2);
    println!("Sau append: {s2}");

    // Nhiều immutable borrows OK
    let r1 = &s1;
    let r2 = &s1;
    println!("r1={r1}, r2={r2}");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn append_world(s: &mut String) {
    s.push_str(", World!");
}
`,
            expectedOutput: '\'Xin chào\' có 11 bytes\nSau append: Hello, World!\nr1=Xin chào, r2=Xin chào'
        },
        {
            id: 'ch04-03',
            title: '4.3 Slice Type',
            duration: '20 phút',
            type: 'practice',
            content: `
<p><strong>Slices</strong> cho phép bạn tham chiếu đến một phần liên tiếp của collection thay vì toàn bộ.</p>

<h3 class="task-heading">String Slices</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s = String::from("hello world");
let hello = &s[0..5];   // "hello"
let world = &s[6..11];  // "world"
let hello2 = &s[..5];   // tương đương &s[0..5]
let world2 = &s[6..];   // tương đương &s[6..11]
let whole = &s[..];     // toàn bộ string</code></pre>
</div>

<h3 class="task-heading">Kiểu &str</h3>
<p><code>&str</code> là kiểu string slice. String literals (<code>"hello"</code>) cũng có kiểu <code>&str</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Best practice:</strong> Dùng <code>&str</code> thay vì <code>&String</code> làm tham số hàm. Hàm sẽ linh hoạt hơn — chấp nhận cả <code>&String</code> và <code>&str</code>.
</div>

<h3 class="task-heading">Array Slices</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [1, 2, 3, 4, 5];
let slice = &a[1..3]; // [2, 3]
assert_eq!(slice, &[2, 3]);</code></pre>
</div>
`,
            defaultCode: `fn main() {
    let s = String::from("Hello Rust World");

    let first = first_word(&s);
    println!("Từ đầu tiên: {first}");

    let second = &s[6..10];
    println!("Từ thứ hai: {second}");

    // Dùng với string literal
    let greeting = "Xin chào";
    let word = first_word(greeting);
    println!("Từ đầu: {word}");
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
`,
            expectedOutput: 'Từ đầu tiên: Hello\nTừ thứ hai: Rust\nTừ đầu: Xin'
        }
    ]
};
