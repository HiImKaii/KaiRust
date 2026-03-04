import { Chapter } from '../courses';

export const ch20: Chapter = {
    id: 'ch20',
    title: 'Chương 20: Advanced Features',
    lessons: [
        {
            id: 'ch20-01',
            title: '20.1 Unsafe Rust',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Unsafe Rust</strong> cho phép bạn làm những điều mà compiler không thể đảm bảo an toàn. Dùng <code>unsafe</code> block.</p>

<h3 class="task-heading">5 superpowers của unsafe</h3>
<ul class="task-list">
  <li>Dereference raw pointer</li>
  <li>Gọi unsafe function/method</li>
  <li>Truy cập/sửa mutable static variable</li>
  <li>Implement unsafe trait</li>
  <li>Truy cập fields của union</li>
</ul>

<h3 class="task-heading">Raw Pointers</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut num = 5;
let r1 = &num as *const i32;     // raw pointer (immutable)
let r2 = &mut num as *mut i32;   // raw pointer (mutable)

unsafe {
    println!("r1 = {}", *r1);
    println!("r2 = {}", *r2);
}</code></pre>
</div>

<h3 class="task-heading">FFI (Foreign Function Interface)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("abs(-3) = {}", abs(-3));
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quy tắc:</strong> Chỉ dùng <code>unsafe</code> khi thực sự cần thiết. Bọc unsafe code trong safe abstraction và cung cấp safe API cho bên ngoài.
</div>
`,
            defaultCode: `fn main() {
    // Raw pointers (cần unsafe để dereference)
    let x = 42;
    let r = &x as *const i32;

    unsafe {
        println!("Raw pointer value: {}", *r);
    }

    // Safe wrapper cho unsafe operation
    let v = vec![1, 2, 3, 4, 5, 6];
    let (left, right) = split_at(&v, 3);
    println!("Left: {:?}", left);
    println!("Right: {:?}", right);
}

fn split_at(slice: &[i32], mid: usize) -> (&[i32], &[i32]) {
    assert!(mid <= slice.len());
    // Internally uses unsafe, nhưng API an toàn
    (&slice[..mid], &slice[mid..])
}
`,
            expectedOutput: 'Raw pointer value: 42\nLeft: [1, 2, 3]\nRight: [4, 5, 6]'
        },
        {
            id: 'ch20-02',
            title: '20.2 Advanced Traits & Types',
            duration: '25 phút',
            type: 'theory',
            content: `
<h3 class="task-heading">Associated Types</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator {
    type Item;  // Associated type
    fn next(&mut self) -> Option&lt;Self::Item&gt;;
}</code></pre>
</div>

<h3 class="task-heading">Operator Overloading</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::ops::Add;

#[derive(Debug)]
struct Point { x: i32, y: i32 }

impl Add for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

let p = Point { x: 1, y: 0 } + Point { x: 2, y: 3 };</code></pre>
</div>

<h3 class="task-heading">Newtype Pattern</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Meters(f64);
struct Kilometers(f64);

impl Meters {
    fn to_km(&self) -> Kilometers {
        Kilometers(self.0 / 1000.0)
    }
}</code></pre>
</div>

<h3 class="task-heading">Type Aliases</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Thunk = Box&lt;dyn Fn() + Send + 'static&gt;;
type Result&lt;T&gt; = std::result::Result&lt;T, std::io::Error&gt;;</code></pre>
</div>

<h3 class="task-heading">Never type (!) và Dynamically Sized Types</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// ! nghĩa là hàm không bao giờ return
fn diverges() -> ! {
    panic!("This function never returns!");
}

// str là DST, luôn dùng qua &str hoặc Box&lt;str&gt;</code></pre>
</div>
`,
            defaultCode: `use std::ops::Add;
use std::fmt;

#[derive(Debug, Clone, Copy)]
struct Vec2 {
    x: f64,
    y: f64,
}

impl Vec2 {
    fn new(x: f64, y: f64) -> Self {
        Vec2 { x, y }
    }

    fn magnitude(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, other: Vec2) -> Vec2 {
        Vec2::new(self.x + other.x, self.y + other.y)
    }
}

impl fmt::Display for Vec2 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({:.1}, {:.1})", self.x, self.y)
    }
}

fn main() {
    let a = Vec2::new(3.0, 4.0);
    let b = Vec2::new(1.0, 2.0);
    let c = a + b;

    println!("a = {a}");
    println!("b = {b}");
    println!("a + b = {c}");
    println!("|a| = {:.2}", a.magnitude());
    println!("|c| = {:.2}", c.magnitude());
}
`,
            expectedOutput: 'a = (3.0, 4.0)\nb = (1.0, 2.0)\na + b = (4.0, 6.0)\n|a| = 5.00\n|c| = 7.21'
        },
        {
            id: 'ch20-03',
            title: '20.3 Macros',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Macros</strong> là một dạng metaprogramming — viết code tạo ra code. Rust có 2 loại: declarative macros và procedural macros.</p>

<h3 class="task-heading">Declarative Macros (macro_rules!)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}</code></pre>
</div>

<h3 class="task-heading">Procedural Macros</h3>
<p>3 loại:</p>
<ul class="task-list">
  <li><strong>Custom derive</strong>: <code>#[derive(MyMacro)]</code></li>
  <li><strong>Attribute-like</strong>: <code>#[route(GET, "/")]</code></li>
  <li><strong>Function-like</strong>: <code>sql!(SELECT * FROM users)</code></li>
</ul>

<h3 class="task-heading">Ví dụ Custom Derive</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Sử dụng derive macro
#[derive(Debug, Clone, Serialize, Deserialize)]
struct User {
    name: String,
    age: u32,
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Macros vs Functions:</strong> Macros hoạt động trên <em>syntax tree</em> tại compile time. Chúng có thể nhận số lượng tham số không cố định (<code>println!</code>) và tạo code mới.
</div>

<h3 class="task-heading">Chúc mừng! 🎉</h3>
<p>Bạn đã hoàn thành toàn bộ 20 chương của "The Rust Programming Language"! Đây là nền tảng vững chắc để bắt đầu xây dựng các dự án Rust thực tế.</p>
`,
            defaultCode: `// Custom macro ví dụ
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

macro_rules! create_map {
    ($( $key:expr => $val:expr ),* $(,)?) => {
        {
            let mut map = std::collections::HashMap::new();
            $( map.insert($key, $val); )*
            map
        }
    };
}

fn main() {
    // Macro không tham số
    say_hello!();

    // Macro với tham số
    say_hello!("Rust Developer");

    // Custom HashMap macro
    let scores = create_map! {
        "Alice" => 95,
        "Bob" => 87,
        "Charlie" => 92,
    };

    println!("\\nBảng điểm:");
    for (name, score) in &scores {
        println!("  {name}: {score}");
    }

    // vec! macro (built-in)
    let nums = vec![1, 2, 3, 4, 5];
    println!("\\nVec: {:?}", nums);

    println!("\\n🎉 Chúc mừng hoàn thành Rust Book!");
}
`,
            expectedOutput: 'Hello!\nHello, Rust Developer!\n\nBảng điểm:\n  Alice: 95\n  Bob: 87\n  Charlie: 92\n\nVec: [1, 2, 3, 4, 5]\n\n🎉 Chúc mừng hoàn thành Rust Book!'
        }
    ]
};
