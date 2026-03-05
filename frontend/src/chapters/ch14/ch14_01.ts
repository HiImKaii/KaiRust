import { Lesson } from '../../courses';

export const ch14_01: Lesson = {
            id: 'ch14-01',
            title: '14.1 Release Profiles & Documentation',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Cargo có nhiều tính năng nâng cao giúp bạn customize build process và chia sẻ code.</p>

<h3 class="task-heading">Release Profiles</h3>
<p>Cargo có 2 profiles mặc định: <code>dev</code> và <code>release</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build            # dev profile
$ cargo build --release  # release profile (tối ưu)</code></pre>
</div>

<p>Customize trong <code>Cargo.toml</code>:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[profile.dev]
opt-level = 0   # Không tối ưu (compile nhanh)

[profile.release]
opt-level = 3   # Tối ưu tối đa</code></pre>
</div>

<h3 class="task-heading">Documentation Comments</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>/// Cộng hai số lại với nhau.
///
/// # Examples
///
/// \`\`\`
/// let result = my_crate::add(2, 3);
/// assert_eq!(result, 5);
/// \`\`\`
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}</code></pre>
</div>

<p>Chạy <code>cargo doc --open</code> để tạo và mở HTML documentation.</p>

<h3 class="task-heading">Các section phổ biến trong doc comments</h3>
<ul class="task-list">
  <li><code># Examples</code> — ví dụ sử dụng (chạy được bằng <code>cargo test</code>!)</li>
  <li><code># Panics</code> — khi nào hàm panic</li>
  <li><code># Errors</code> — mô tả các lỗi có thể trả về</li>
  <li><code># Safety</code> — nếu hàm là <code>unsafe</code></li>
</ul>
`,
            defaultCode: `/// Tính giai thừa của n.
///
/// # Arguments
/// * \`n\` - Số nguyên dương
///
/// # Examples
/// \`\`\`
/// assert_eq!(factorial(5), 120);
/// \`\`\`
///
/// # Panics
/// Không panic vì dùng u64
fn factorial(n: u64) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n * factorial(n - 1),
    }
}

/// Kiểm tra xem số có là số nguyên tố không.
fn is_prime(n: u64) -> bool {
    if n < 2 { return false; }
    if n == 2 { return true; }
    if n % 2 == 0 { return false; }
    let mut i = 3;
    while i * i <= n {
        if n % i == 0 { return false; }
        i += 2;
    }
    true
}

fn main() {
    println!("Giai thừa:");
    for i in 0..=10 {
        println!("  {i}! = {}", factorial(i));
    }

    println!("\\nSố nguyên tố < 30:");
    let primes: Vec<u64> = (2..30).filter(|&n| is_prime(n)).collect();
    println!("  {:?}", primes);
}
`,
            expectedOutput: 'Giai thừa:\n  0! = 1\n  1! = 1\n  2! = 2\n  3! = 6\n  4! = 24\n  5! = 120\n  6! = 720\n  7! = 5040\n  8! = 40320\n  9! = 362880\n  10! = 3628800\n\nSố nguyên tố < 30:\n  [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]'
        };
