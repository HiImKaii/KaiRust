import { Chapter } from '../courses';

export const ch03: Chapter = {
    id: 'ch03',
    title: 'Chương 3: Các khái niệm lập trình phổ biến',
    lessons: [
        {
            id: 'ch03-01',
            title: '3.1 Biến và Tính bất biến (Mutability)',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Chương này bao gồm các khái niệm xuất hiện trong hầu hết mọi ngôn ngữ lập trình và cách chúng hoạt động trong Rust.</p>

<h3 class="task-heading">Biến mặc định là immutable</h3>
<p>Trong Rust, biến mặc định là <strong>immutable</strong> (không thể thay đổi). Đây là một trong những tính năng giúp bạn viết code an toàn và dễ debug.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    println!("Giá trị của x: {x}");
    // x = 6; // LỖI! Không thể gán lại biến immutable
}</code></pre>
</div>

<p>Thêm <code>mut</code> để cho phép thay đổi:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut x = 5;
    println!("Giá trị của x: {x}");
    x = 6;
    println!("Giá trị mới: {x}");
}</code></pre>
</div>

<h3 class="task-heading">Hằng số (Constants)</h3>
<p>Hằng số <strong>luôn luôn immutable</strong>, được khai báo với <code>const</code> và <strong>bắt buộc phải chú thích kiểu</strong>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;</code></pre>
</div>

<h3 class="task-heading">Shadowing</h3>
<p>Bạn có thể khai báo biến mới cùng tên với biến trước — gọi là <strong>shadowing</strong>. Khác với <code>mut</code>, shadowing cho phép thay đổi cả kiểu dữ liệu:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;
    let x = x + 1;        // shadow: x = 6
    {
        let x = x * 2;    // shadow trong scope: x = 12
        println!("x trong block: {x}");
    }
    println!("x ngoài block: {x}"); // x = 6
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Shadowing vs mut:</strong> Shadowing tạo biến mới (có thể khác kiểu), còn <code>mut</code> chỉ cho phép thay đổi giá trị cùng kiểu.
</div>
`,
            defaultCode: `fn main() {
    // Immutable mặc định
    let x = 5;
    println!("x = {x}");

    // Shadowing
    let x = x + 1;
    println!("x sau shadow = {x}");

    {
        let x = x * 2;
        println!("x trong scope = {x}");
    }
    println!("x ngoài scope = {x}");

    // Mutable
    let mut y = 10;
    println!("y = {y}");
    y = 20;
    println!("y sau thay đổi = {y}");
}
`,
            expectedOutput: 'x = 5\nx sau shadow = 6\nx trong scope = 12\nx ngoài scope = 6\ny = 10\ny sau thay đổi = 20'
        },
        {
            id: 'ch03-02',
            title: '3.2 Kiểu dữ liệu (Data Types)',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Mọi giá trị trong Rust đều có một <strong>kiểu dữ liệu</strong>. Rust là ngôn ngữ <strong>statically typed</strong> — compiler phải biết kiểu của mọi biến tại thời điểm biên dịch.</p>

<h3 class="task-heading">Scalar Types (kiểu vô hướng)</h3>
<p>Rust có 4 kiểu scalar chính:</p>

<h4>1. Integer (Số nguyên)</h4>
<table class="data-table">
  <tr><th>Độ dài</th><th>Có dấu</th><th>Không dấu</th></tr>
  <tr><td>8-bit</td><td>i8</td><td>u8</td></tr>
  <tr><td>16-bit</td><td>i16</td><td>u16</td></tr>
  <tr><td>32-bit</td><td>i32</td><td>u32</td></tr>
  <tr><td>64-bit</td><td>i64</td><td>u64</td></tr>
  <tr><td>128-bit</td><td>i128</td><td>u128</td></tr>
  <tr><td>arch</td><td>isize</td><td>usize</td></tr>
</table>

<h4>2. Floating-Point (Số thực)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 2.0;      // f64 (mặc định)
let y: f32 = 3.0;  // f32</code></pre>
</div>

<h4>3. Boolean</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let t = true;
let f: bool = false;</code></pre>
</div>

<h4>4. Character</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let c = 'z';
let heart_eyed_cat = '😻'; // Unicode!</code></pre>
</div>

<h3 class="task-heading">Compound Types (kiểu phức hợp)</h3>

<h4>Tuple</h4>
<p>Nhóm nhiều giá trị khác kiểu vào một biến:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup;  // destructuring
let first = tup.0;    // truy cập bằng index</code></pre>
</div>

<h4>Array</h4>
<p>Tập hợp cùng kiểu, kích thước cố định:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [1, 2, 3, 4, 5];
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a = [3; 5]; // = [3, 3, 3, 3, 3]
let first = a[0];</code></pre>
</div>

<div class="cyber-alert info">
  <strong>An toàn bộ nhớ:</strong> Rust kiểm tra index tại runtime. Nếu truy cập ngoài phạm vi, chương trình sẽ <strong>panic</strong> thay vì truy cập bộ nhớ không hợp lệ.
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

    // Boolean
    let is_rust_fun = true;
    println!("Rust vui không? {is_rust_fun}");

    // Char (Unicode)
    let heart = '❤';
    println!("Heart: {heart}");

    // Tuple
    let tup = (500, 6.4, 'A');
    let (a, b, c) = tup;
    println!("Tuple: {a}, {b}, {c}");

    // Array
    let arr = [1, 2, 3, 4, 5];
    println!("Phần tử đầu: {}", arr[0]);
    println!("Phần tử cuối: {}", arr[4]);
}
`,
            expectedOutput: 'i32: 42, u8: 255\nPi = 3.14159\nRust vui không? true\nHeart: ❤\nTuple: 500, 6.4, A\nPhần tử đầu: 1\nPhần tử cuối: 5'
        },
        {
            id: 'ch03-03',
            title: '3.3 Hàm (Functions)',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Hàm rất phổ biến trong Rust. Hàm <code>main</code> là điểm khởi đầu. Bạn khai báo hàm mới với keyword <code>fn</code>.</p>

<h3 class="task-heading">Khai báo hàm</h3>
<p>Quy ước đặt tên hàm trong Rust là <strong>snake_case</strong>:</p>
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

<h3 class="task-heading">Tham số (Parameters)</h3>
<p>Mỗi tham số <strong>bắt buộc</strong> phải có chú thích kiểu:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn print_value(x: i32) {
    println!("Giá trị: {x}");
}

fn print_labeled(value: i32, unit: char) {
    println!("Đo lường: {value}{unit}");
}</code></pre>
</div>

<h3 class="task-heading">Statements vs Expressions</h3>
<p>Rust phân biệt rõ:</p>
<ul class="task-list">
  <li><strong>Statements</strong>: thực hiện hành động, <em>không trả về giá trị</em></li>
  <li><strong>Expressions</strong>: tính toán và <em>trả về giá trị</em></li>
</ul>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let y = {
        let x = 3;
        x + 1  // Expression (không có dấu ;)
    };
    println!("y = {y}"); // y = 4
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quan trọng:</strong> Expression không có dấu chấm phẩy ở cuối! Nếu thêm <code>;</code>, nó trở thành statement và không trả về giá trị.
</div>

<h3 class="task-heading">Giá trị trả về</h3>
<p>Dùng <code>-></code> để chỉ định kiểu trả về. Giá trị trả về là expression cuối cùng trong body:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn five() -> i32 {
    5  // Trả về 5 (không cần return)
}

fn plus_one(x: i32) -> i32 {
    x + 1
}</code></pre>
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
    // TODO: Tính diện tích hình chữ nhật
    width * height
}
`,
            expectedOutput: 'Xin chào, Rust!\n5 + 3 = 8\nDiện tích: 50'
        },
        {
            id: 'ch03-04',
            title: '3.4 Comments',
            duration: '5 phút',
            type: 'theory',
            content: `
<p>Trong Rust, kiểu comment phổ biến nhất bắt đầu bằng hai dấu gạch chéo <code>//</code>, comment kéo dài đến cuối dòng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Đây là comment
fn main() {
    // Comment giải thích logic phức tạp
    // có thể trải dài nhiều dòng

    let lucky_number = 7; // Comment cuối dòng
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Documentation comments:</strong> Rust còn có <code>///</code> cho documentation comments, sẽ được tìm hiểu ở Chương 14 khi nói về Crates.io.
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
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Chạy code dựa trên điều kiện (<code>if</code>) và lặp lại code (<code>loop</code>, <code>while</code>, <code>for</code>) là nền tảng của mọi chương trình.</p>

<h3 class="task-heading">Biểu thức if</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 7;

    if number < 5 {
        println!("Nhỏ hơn 5");
    } else if number < 10 {
        println!("Nhỏ hơn 10");
    } else {
        println!("Lớn hơn hoặc bằng 10");
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khác biệt:</strong> Điều kiện trong Rust <strong>phải là bool</strong>. Không như C/JavaScript, Rust không tự động chuyển đổi integer thành boolean.
</div>

<p><code>if</code> là expression nên có thể dùng trong <code>let</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let condition = true;
let number = if condition { 5 } else { 6 };</code></pre>
</div>

<h3 class="task-heading">Vòng lặp loop</h3>
<p><code>loop</code> lặp vô hạn, thoát bằng <code>break</code>. Có thể trả về giá trị từ <code>break</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut counter = 0;
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // result = 20
    }
};</code></pre>
</div>

<h3 class="task-heading">Vòng lặp while</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut number = 3;
while number != 0 {
    println!("{number}!");
    number -= 1;
}
println!("LIFTOFF!");</code></pre>
</div>

<h3 class="task-heading">Vòng lặp for</h3>
<p>Cách tốt nhất để duyệt qua collection:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [10, 20, 30, 40, 50];
for element in a {
    println!("Giá trị: {element}");
}

// Dùng Range
for number in (1..4).rev() {
    println!("{number}!");
}
println!("LIFTOFF!");</code></pre>
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

    // loop với break trả về giá trị
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("Result từ loop: {result}");

    // for loop với range
    println!("Đếm ngược:");
    for i in (1..=5).rev() {
        println!("  {i}...");
    }
    println!("  🚀 GO!");
}
`,
            expectedOutput: '7 là số lẻ\nResult từ loop: 20\nĐếm ngược:\n  5...\n  4...\n  3...\n  2...\n  1...\n  🚀 GO!'
        }
    ]
};
