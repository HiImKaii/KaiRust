import { Lesson } from '../../courses';

export const ch11_02: Lesson = {
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
        };
