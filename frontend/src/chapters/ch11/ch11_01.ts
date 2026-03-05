import { Lesson } from '../../courses';

export const ch11_01: Lesson = {
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
        };
