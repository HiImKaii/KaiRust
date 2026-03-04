import { Chapter } from '../courses';

export const ch11: Chapter = {
    id: 'ch11',
    title: 'Chương 11: Viết Automated Tests',
    lessons: [
        {
            id: 'ch11-01',
            title: '11.1 Cách viết Tests',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Test trong Rust là hàm được annotate với <code>#[test]</code>. Khi chạy <code>cargo test</code>, Rust build và chạy tất cả test functions.</p>

<h3 class="task-heading">Tạo Test Function</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>

<h3 class="task-heading">Assert Macros</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>assert!(condition);              // true/false
assert_eq!(left, right);        // left == right
assert_ne!(left, right);        // left != right

// Custom message
assert!(result > 0, "Kết quả phải dương, nhận {result}");</code></pre>
</div>

<h3 class="task-heading">#[should_panic]</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
#[should_panic(expected = "less than or equal to 100")]
fn greater_than_100() {
    Guess::new(200);
}</code></pre>
</div>

<h3 class="task-heading">Tests trả về Result</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
fn it_works() -> Result<(), String> {
    if 2 + 2 == 4 {
        Ok(())
    } else {
        Err(String::from("2 + 2 không bằng 4"))
    }
}</code></pre>
</div>
`,
            defaultCode: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn main() {
    // Trong thực tế, tests được chạy bằng: cargo test
    // Ở đây ta mô phỏng kiểm tra:
    println!("Test add(2, 3) = {}", add(2, 3));
    assert_eq!(add(2, 3), 5);
    println!("✅ add(2, 3) == 5");

    assert_eq!(add(-1, 1), 0);
    println!("✅ add(-1, 1) == 0");

    assert!(is_even(4));
    println!("✅ 4 là số chẵn");

    assert!(!is_even(7));
    println!("✅ 7 là số lẻ");

    println!("\\n🎉 Tất cả tests passed!");
}
`,
            expectedOutput: 'Test add(2, 3) = 5\n✅ add(2, 3) == 5\n✅ add(-1, 1) == 0\n✅ 4 là số chẵn\n✅ 7 là số lẻ\n\n🎉 Tất cả tests passed!'
        },
        {
            id: 'ch11-02',
            title: '11.2 Kiểm soát cách chạy Tests',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Bạn có thể kiểm soát cách <code>cargo test</code> chạy tests.</p>

<h3 class="task-heading">Các tùy chọn hữu ích</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code># Chạy tất cả tests
$ cargo test

# Chạy tests tuần tự (thay vì song song)
$ cargo test -- --test-threads=1

# Hiện output print
$ cargo test -- --show-output

# Chạy 1 test cụ thể
$ cargo test test_name

# Chạy tests có tên chứa keyword
$ cargo test add</code></pre>
</div>

<h3 class="task-heading">Bỏ qua tests</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
#[ignore]
fn expensive_test() {
    // Test tốn thời gian...
}

// Chạy chỉ tests bị ignore
// $ cargo test -- --ignored</code></pre>
</div>
`,
            defaultCode: `// Mô phỏng test organization
fn add(a: i32, b: i32) -> i32 { a + b }
fn multiply(a: i32, b: i32) -> i32 { a * b }
fn factorial(n: u32) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n as u64 * factorial(n - 1),
    }
}

fn main() {
    // Unit tests
    println!("=== Unit Tests ===");
    assert_eq!(add(1, 1), 2);
    println!("✅ test_add_basic");

    assert_eq!(multiply(3, 4), 12);
    println!("✅ test_multiply");

    assert_eq!(factorial(5), 120);
    println!("✅ test_factorial");

    assert_eq!(factorial(0), 1);
    println!("✅ test_factorial_zero");

    println!("\\n4 tests passed, 0 failed");
}
`,
            expectedOutput: '=== Unit Tests ===\n✅ test_add_basic\n✅ test_multiply\n✅ test_factorial\n✅ test_factorial_zero\n\n4 tests passed, 0 failed'
        },
        {
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
        }
    ]
};
