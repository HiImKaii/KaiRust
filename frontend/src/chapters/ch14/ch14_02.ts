import { Lesson } from '../../courses';

export const ch14_02: Lesson = {
            id: 'ch14-02',
            title: '14.2 Cargo Workspaces',
            duration: '15 phút',
            type: 'theory',
            content: `
<p><strong>Workspaces</strong> giúp quản lý nhiều packages liên quan trong cùng một project.</p>

<h3 class="task-heading">Tạo Workspace</h3>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code># Cargo.toml (workspace root)
[workspace]
members = [
    "adder",
    "add_one",
]</code></pre>
</div>

<h3 class="task-heading">Cấu trúc thư mục</h3>
<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>my_workspace/
├── Cargo.toml        (workspace)
├── Cargo.lock        (shared)
├── target/           (shared)
├── adder/
│   ├── Cargo.toml
│   └── src/main.rs
└── add_one/
    ├── Cargo.toml
    └── src/lib.rs</code></pre>
</div>

<h3 class="task-heading">Dependencies giữa workspace members</h3>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code># adder/Cargo.toml
[dependencies]
add_one = { path = "../add_one" }</code></pre>
</div>

<h3 class="task-heading">Lệnh hữu ích</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build           # Build tất cả
  $ cargo run -p adder    # Chạy package cụ thể
$ cargo test -p add_one # Test package cụ thể</code></pre>
</div>
`,
            defaultCode: `// Mô phỏng workspace với multiple modules

mod math_utils {
    pub fn add(a: i32, b: i32) -> i32 { a + b }
    pub fn subtract(a: i32, b: i32) -> i32 { a - b }
}

mod string_utils {
    pub fn reverse(s: &str) -> String {
        s.chars().rev().collect()
    }
    pub fn capitalize(s: &str) -> String {
        let mut chars = s.chars();
        match chars.next() {
            None => String::new(),
            Some(c) => c.to_uppercase().to_string() + chars.as_str(),
        }
    }
}

fn main() {
    // Sử dụng math_utils
    println!("=== Math Utils ===");
    println!("10 + 5 = {}", math_utils::add(10, 5));
    println!("10 - 5 = {}", math_utils::subtract(10, 5));

    // Sử dụng string_utils
    println!("\\n=== String Utils ===");
    println!("Reverse 'Rust': {}", string_utils::reverse("Rust"));
    println!("Capitalize 'hello': {}", string_utils::capitalize("hello"));
}
`,
            expectedOutput: '=== Math Utils ===\n10 + 5 = 15\n10 - 5 = 5\n\n=== String Utils ===\nReverse \'Rust\': tsuR\nCapitalize \'hello\': Hello'
        };
