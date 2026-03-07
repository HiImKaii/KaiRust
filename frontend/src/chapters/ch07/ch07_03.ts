import { Lesson } from '../../courses';

export const ch07_03: Lesson = {
      id: 'ch07-03',
      title: '7.3 Sử dụng use và Tổ chức Modules',
      duration: '35 phút',
      type: 'theory',
      content: `
<p>Từ khóa <code>use</code> cho phép đưa paths vào scope để sử dụng ngắn gọn hơn, thay vì phải viết đường dẫn đầy đủ mỗi lần.</p>

<h3 class="task-heading">Đưa path vào scope với use</h3>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

// Đưa hosting vào scope
use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist(); // Ngắn gọn hơn!
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quy ước idiomatic:</strong> Khi use một function, nên đưa path đến parent module (không phải chính function). Ví dụ: <code>use crate::front_of_house::hosting;</code> thay vì <code>use crate::front_of_house::hosting::add_to_waitlist;</code>. Điều này giúp rõ ràng hơn về nguồn gốc của hàm.
</div>

<h3 class="task-heading">Đặt alias với as</h3>
<p>Khi có xung đột tên, dùng <code>as</code> để đặt tên khác:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result { /* ... */ }
fn function2() -> IoResult<()> { /* ... */ }</code></pre>
</div>

<h3 class="task-heading">Nested paths</h3>
<p>Khi import nhiều items từ cùng parent:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Thay vì:
use std::cmp::Ordering;
use std::io;

// Dùng:
use std::{cmp::Ordering, io};

// Hoặc để include cả io và io::Write:
use std::io::{self, Write};</code></pre>
</div>

<h3 class="task-heading">Đưa tất cả items vào scope với glob</h3>
<p>Dùng <code>*</code> để đưa tất cả public items:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::*; // Import tất cả từ collections

// Cẩn thận: có thể gây xung đột tên!</code></pre>
</div>

<h3 class="task-heading">Tách module ra nhiều files</h3>
<p>Khi module quá lớn, có thể tách ra nhiều files:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Trong src/lib.rs
mod front_of_house;

// Trong src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}</code></pre>
</div>

<h3 class="task-heading">Cấu trúc module đa file</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>src/
├── main.rs
├── lib.rs
├── front_of_house.rs      // nội dung của module front_of_house
└── front_of_house/       // hoặc dùng thư mục
    ├── hosting.rs
    └── serving.rs</code></pre>
</div>

<h3 class="task-heading">Sử dụng external crates</h3>
<p>Thêm thư viện vào <code>Cargo.toml</code>:</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.8"
serde = "1.0"</code></pre>
</div>

<p>Sau đó use trong code:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use rand::Rng;

fn main() {
    let secret = rand::thread_rng().gen_range(1..101);
    println!("Random: {}", secret);
}</code></pre>
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
};
