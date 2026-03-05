import { Lesson } from '../../courses';

export const ch13_02: Lesson = {
            id: 'ch13-02',
            title: '13.2 Iterators',
            duration: '25 phút',
            type: 'practice',
            content: `
<p><strong>Iterators</strong> là pattern xử lý chuỗi items một cách lazy (chỉ tính khi cần). Tất cả iterators implement trait <code>Iterator</code>.</p>

<h3 class="task-heading">Iterator trait</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option&lt;Self::Item&gt;;
    // ...nhiều default methods
}</code></pre>
</div>

<h3 class="task-heading">Consuming adaptors</h3>
<p>Methods gọi <code>next()</code> và consume iterator:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3];
let total: i32 = v.iter().sum(); // 6
// v.iter() đã bị consume, không dùng được nữa</code></pre>
</div>

<h3 class="task-heading">Iterator adaptors</h3>
<p>Methods tạo iterator mới (lazy — chưa thực thi):</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v: Vec&lt;i32&gt; = vec![1, 2, 3];
// map, filter, zip, enumerate, take, skip...
let result: Vec&lt;i32&gt; = v.iter()
    .map(|x| x + 1)
    .filter(|x| x % 2 == 0)
    .collect();</code></pre>
</div>

<h3 class="task-heading">Chuỗi method calls</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let sum_of_evens: i32 = (1..=100)
    .filter(|x| x % 2 == 0)
    .sum();
// 2 + 4 + 6 + ... + 100 = 2550</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Performance:</strong> Iterators là <strong>zero-cost abstraction</strong>. Compiler tối ưu chúng thành code tương đương viết tay bằng loop. Không có overhead runtime!
</div>
`,
            defaultCode: `fn main() {
    // Iterator chain
    let words = vec!["hello", "world", "rust", "is", "awesome"];

    let result: String = words.iter()
        .map(|w| {
            let mut chars = w.chars();
            match chars.next() {
                None => String::new(),
                Some(c) => c.to_uppercase().to_string() + chars.as_str(),
            }
        })
        .collect::<Vec<String>>()
        .join(" ");

    println!("Capitalize: {result}");

    // enumerate
    println!("\\nDanh sách:");
    for (i, word) in words.iter().enumerate() {
        println!("  {}: {word}", i + 1);
    }

    // Tính toán với ranges
    let fib_sum: i32 = (1..=10)
        .filter(|x| x % 2 != 0)
        .map(|x| x * x)
        .sum();
    println!("\\nTổng bình phương số lẻ (1-10): {fib_sum}");
}
`,
            expectedOutput: 'Capitalize: Hello World Rust Is Awesome\n\nDanh sách:\n  1: hello\n  2: world\n  3: rust\n  4: is\n  5: awesome\n\nTổng bình phương số lẻ (1-10): 165'
        };
