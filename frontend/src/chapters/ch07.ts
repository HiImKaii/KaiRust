import { Chapter } from '../courses';

export const ch07: Chapter = {
    id: 'ch07',
    title: 'Chương 7: Quản lý Packages, Crates, Modules',
    lessons: [
        {
            id: 'ch07-01',
            title: '7.1 Packages và Crates',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Khi dự án lớn lên, bạn cần tổ chức code. Rust có hệ thống module mạnh mẽ.</p>

<h3 class="task-heading">Các khái niệm</h3>
<ul class="task-list">
  <li><strong>Crate</strong> — đơn vị biên dịch nhỏ nhất. Có 2 loại: binary crate (chạy được) và library crate</li>
  <li><strong>Package</strong> — nhóm các crate liên quan, chứa file <code>Cargo.toml</code></li>
  <li><strong>Module</strong> — tổ chức code bên trong crate</li>
  <li><strong>Path</strong> — cách đặt tên để tìm đến item (struct, function, module...)</li>
</ul>

<h3 class="task-heading">Quy tắc Package</h3>
<ul class="task-list">
  <li>Một package có <strong>tối đa 1</strong> library crate</li>
  <li>Một package có thể có <strong>nhiều</strong> binary crates</li>
  <li><code>src/main.rs</code> → crate root của binary crate</li>
  <li><code>src/lib.rs</code> → crate root của library crate</li>
</ul>
`,
            defaultCode: `// Cấu trúc một Cargo package điển hình:
//
// my-project/
// ├── Cargo.toml
// ├── src/
// │   ├── main.rs     (binary crate root)
// │   └── lib.rs      (library crate root)
// └── tests/

fn main() {
    println!("Crate và Package trong Rust");
    println!("- Binary crate: src/main.rs");
    println!("- Library crate: src/lib.rs");
    println!("- Package = Cargo.toml + crate(s)");
}
`,
            expectedOutput: 'Crate và Package trong Rust\n- Binary crate: src/main.rs\n- Library crate: src/lib.rs\n- Package = Cargo.toml + crate(s)'
        },
        {
            id: 'ch07-02',
            title: '7.2 Modules và Scope',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Modules cho phép tổ chức code thành nhóm, kiểm soát privacy (public/private), và tạo namespace.</p>

<h3 class="task-heading">Khai báo modules</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
        fn seat_at_table() {}  // private
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
    }
}</code></pre>
</div>

<h3 class="task-heading">Paths: Absolute vs Relative</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn eat_at_restaurant() {
    // Absolute path (từ crate root)
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}</code></pre>
</div>

<h3 class="task-heading">pub keyword</h3>
<p>Mặc định mọi thứ trong Rust là <strong>private</strong>. Dùng <code>pub</code> để công khai:</p>
<ul class="task-list">
  <li>Module con có thể truy cập tất cả item của module cha</li>
  <li>Module cha <strong>không thể</strong> truy cập item private của module con</li>
</ul>

<h3 class="task-heading">super keyword</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order(); // Truy cập hàm ở module cha
    }
    fn cook_order() {}
}</code></pre>
</div>
`,
            defaultCode: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    pub mod advanced {
        pub fn power(base: i32, exp: u32) -> i32 {
            let mut result = 1;
            for _ in 0..exp {
                result = super::multiply(result, base);
            }
            result
        }
    }
}

fn main() {
    let sum = math::add(5, 3);
    let product = math::multiply(4, 7);
    let pow = math::advanced::power(2, 10);

    println!("5 + 3 = {sum}");
    println!("4 × 7 = {product}");
    println!("2^10 = {pow}");
}
`,
            expectedOutput: '5 + 3 = 8\n4 × 7 = 28\n2^10 = 1024'
        },
        {
            id: 'ch07-03',
            title: '7.3 use Keyword & Re-exporting',
            duration: '15 phút',
            type: 'theory',
            content: `
<p><code>use</code> đưa path vào scope để tránh viết đường dẫn dài:</p>

<h3 class="task-heading">Cú pháp use</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, "one");
}</code></pre>
</div>

<h3 class="task-heading">as keyword (alias)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Result;
use std::io::Result as IoResult;</code></pre>
</div>

<h3 class="task-heading">Nested paths</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{cmp::Ordering, io};
use std::io::{self, Write};</code></pre>
</div>

<h3 class="task-heading">Glob operator</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::*; // Import tất cả public items</code></pre>
</div>

<h3 class="task-heading">Tách modules ra files riêng</h3>
<p>Khi module lớn, tách ra file riêng:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/lib.rs
mod front_of_house;  // Tìm trong src/front_of_house.rs
                     // hoặc src/front_of_house/mod.rs</code></pre>
</div>
`,
            defaultCode: `use std::collections::HashMap;

fn main() {
    // HashMap demo
    let mut scores = HashMap::new();
    scores.insert("Toán", 95);
    scores.insert("Lý", 88);
    scores.insert("Hóa", 92);

    println!("Bảng điểm:");
    for (subject, score) in &scores {
        println!("  {subject}: {score}");
    }

    // Vec với iter
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Tổng: {sum}");
}
`,
            expectedOutput: 'Bảng điểm:\n  Toán: 95\n  Lý: 88\n  Hóa: 92\nTổng: 15'
        }
    ]
};
