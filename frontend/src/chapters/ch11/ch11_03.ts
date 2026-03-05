import { Lesson } from '../../courses';

export const ch11_03: Lesson = {
            id: 'ch11-03',
            title: '11.3 Tổ chức Tests',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Rust phân biệt 2 loại tests: <strong>unit tests</strong> và <strong>integration tests</strong>.</p>

<h3 class="task-heading">Unit Tests</h3>
<p>Đặt trong cùng file với code, trong module <code>#[cfg(test)]</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/lib.rs
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        // Có thể test cả private functions!
        assert_eq!(4, internal_adder(2, 2));
    }
}</code></pre>
</div>

<h3 class="task-heading">Integration Tests</h3>
<p>Đặt trong thư mục <code>tests/</code> ở cùng cấp với <code>src/</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// tests/integration_test.rs
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Cấu trúc project với tests:</strong>
  <pre>
my_project/
├── Cargo.toml
├── src/
│   └── lib.rs      (unit tests ở cuối file)
└── tests/
    └── integration_test.rs
  </pre>
</div>
`,
            defaultCode: `// Mô phỏng cấu trúc test
// Trong thực tế, dùng #[cfg(test)] và cargo test

fn add_two(n: i32) -> i32 {
    n + 2
}

fn is_positive(n: i32) -> bool {
    n > 0
}

fn main() {
    // Giả lập Unit Tests
    println!("=== Unit Tests (src/lib.rs) ===");
    assert_eq!(add_two(2), 4);
    println!("✅ test_add_two");
    assert_eq!(add_two(-1), 1);
    println!("✅ test_add_two_negative");

    // Giả lập Integration Tests
    println!("\\n=== Integration Tests (tests/) ===");
    let result = add_two(40);
    assert!(is_positive(result));
    println!("✅ test_add_two_is_positive");

    println!("\\n📊 Kết quả: 3 passed, 0 failed");
}
`,
            expectedOutput: '=== Unit Tests (src/lib.rs) ===\n✅ test_add_two\n✅ test_add_two_negative\n\n=== Integration Tests (tests/) ===\n✅ test_add_two_is_positive\n\n📊 Kết quả: 3 passed, 0 failed'
        };
