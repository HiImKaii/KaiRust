import { Chapter } from '../courses';

export const ch05: Chapter = {
    id: 'ch05',
    title: 'Chương 5: Sử dụng Structs',
    lessons: [
        {
            id: 'ch05-01',
            title: '5.1 Định nghĩa và Khởi tạo Structs',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Struct</strong> (structure) cho phép bạn nhóm nhiều giá trị liên quan lại thành một kiểu dữ liệu có ý nghĩa. Tương tự class trong OOP nhưng không có inheritance.</p>

<h3 class="task-heading">Khai báo Struct</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}</code></pre>
</div>

<h3 class="task-heading">Tạo instance</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user1 = User {
    active: true,
    username: String::from("kairust"),
    email: String::from("kai@rust.dev"),
    sign_in_count: 1,
};</code></pre>
</div>

<h3 class="task-heading">Field Init Shorthand</h3>
<p>Khi tên tham số trùng tên field:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,    // shorthand
        email,       // shorthand
        sign_in_count: 1,
    }
}</code></pre>
</div>

<h3 class="task-heading">Struct Update Syntax</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user2 = User {
    email: String::from("new@rust.dev"),
    ..user1  // Lấy các field còn lại từ user1
};</code></pre>
</div>

<h3 class="task-heading">Tuple Structs & Unit-Like Structs</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
struct AlwaysEqual; // Unit-like struct</code></pre>
</div>
`,
            defaultCode: `struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("Width: {}", rect.width);
    println!("Height: {}", rect.height);
    println!(
        "Diện tích hình chữ nhật: {} px vuông",
        area(&rect)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
`,
            expectedOutput: 'Width: 30\nHeight: 50\nDiện tích hình chữ nhật: 1500 px vuông'
        },
        {
            id: 'ch05-02',
            title: '5.2 Ví dụ thực tế với Structs',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Hãy xem ví dụ tính diện tích hình chữ nhật để hiểu khi nào nên dùng struct.</p>

<h3 class="task-heading">Derive trait Debug</h3>
<p>Để in struct ra console, thêm <code>#[derive(Debug)]</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("rect: {:?}", rect);   // Một dòng
    println!("rect: {:#?}", rect);  // Nhiều dòng (pretty-print)
}</code></pre>
</div>

<h3 class="task-heading">Macro dbg!</h3>
<p><code>dbg!</code> in ra stderr kèm file name, line number, và giá trị. Khác với <code>println!</code>, <code>dbg!</code> lấy ownership rồi trả lại:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let scale = 2;
let rect = Rectangle {
    width: dbg!(30 * scale), // in: [src/main.rs:8] 30 * scale = 60
    height: 50,
};</code></pre>
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    let rect3 = Rectangle { width: 60, height: 45 };

    println!("rect1: {:?}", rect1);
    println!("Diện tích rect1: {}", area(&rect1));
    println!("Diện tích rect2: {}", area(&rect2));
    println!("Diện tích rect3: {}", area(&rect3));
}

fn area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}
`,
            expectedOutput: 'rect1: Rectangle { width: 30, height: 50 }\nDiện tích rect1: 1500\nDiện tích rect2: 400\nDiện tích rect3: 2700'
        },
        {
            id: 'ch05-03',
            title: '5.3 Method Syntax',
            duration: '25 phút',
            type: 'practice',
            content: `
<p><strong>Methods</strong> giống function nhưng được định nghĩa trong context của struct (hoặc enum/trait). Tham số đầu tiên luôn là <code>self</code>.</p>

<h3 class="task-heading">Định nghĩa methods với impl</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}</code></pre>
</div>

<h3 class="task-heading">Associated Functions</h3>
<p>Hàm trong <code>impl</code> mà không có <code>self</code> là associated function (gọi bằng <code>::</code>):</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

let sq = Rectangle::square(25);</code></pre>
</div>

<div class="cyber-alert info">
  <strong>self có 3 dạng:</strong>
  <ul>
    <li><code>&self</code> — mượn immutable (phổ biến nhất)</li>
    <li><code>&mut self</code> — mượn mutable</li>
    <li><code>self</code> — lấy ownership (hiếm khi dùng)</li>
  </ul>
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Associated function (constructor)
    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }

    fn square(size: u32) -> Self {
        Self { width: size, height: size }
    }

    // Methods
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle::new(30, 50);
    let rect2 = Rectangle::square(20);

    println!("rect1: {:?}", rect1);
    println!("Diện tích: {}", rect1.area());
    println!("Chu vi: {}", rect1.perimeter());
    println!("rect1 chứa được rect2? {}", rect1.can_hold(&rect2));
}
`,
            expectedOutput: 'rect1: Rectangle { width: 30, height: 50 }\nDiện tích: 1500\nChu vi: 160\nrect1 chứa được rect2? true'
        }
    ]
};
