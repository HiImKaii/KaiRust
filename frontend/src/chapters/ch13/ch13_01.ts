import { Lesson } from '../../courses';

export const ch13_01: Lesson = {
            id: 'ch13-01',
            title: '13.1 Closures: Hàm ẩn danh',
            duration: '25 phút',
            type: 'practice',
            content: `
<p><strong>Closures</strong> là hàm ẩn danh có thể capture biến từ scope bao quanh. Tương tự lambda (Python) hoặc arrow function (JS).</p>

<h3 class="task-heading">Cú pháp Closure</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let add_one = |x| x + 1;
let add = |x: i32, y: i32| -> i32 { x + y };

println!("{}", add_one(5)); // 6
println!("{}", add(2, 3));  // 5</code></pre>
</div>

<h3 class="task-heading">Capture Environment</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let list = vec![1, 2, 3];
let contains = |x| list.contains(x);
println!("{}", contains(&2)); // true — list được capture</code></pre>
</div>

<h3 class="task-heading">Capture modes</h3>
<ul class="task-list">
  <li><code>Fn</code> — borrow immutable</li>
  <li><code>FnMut</code> — borrow mutable</li>
  <li><code>FnOnce</code> — take ownership (chỉ gọi 1 lần)</li>
</ul>

<h3 class="task-heading">Closures với iterators</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v: Vec&lt;i32&gt; = vec![1, 2, 3];
let doubled: Vec&lt;i32&gt; = v.iter().map(|x| x * 2).collect();
// doubled = [2, 4, 6]</code></pre>
</div>
`,
            defaultCode: `fn main() {
    // Closure cơ bản
    let square = |x: i32| x * x;
    println!("5² = {}", square(5));

    // Capture environment
    let multiplier = 3;
    let multiply = |x| x * multiplier;
    println!("7 × {multiplier} = {}", multiply(7));

    // Closure với Vec
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let evens: Vec<&i32> = numbers.iter()
        .filter(|x| *x % 2 == 0)
        .collect();
    println!("Số chẵn: {:?}", evens);

    let squared: Vec<i32> = numbers.iter()
        .map(|x| x * x)
        .collect();
    println!("Bình phương: {:?}", squared);

    let sum: i32 = numbers.iter().sum();
    println!("Tổng: {sum}");
}
`,
            expectedOutput: '5² = 25\n7 × 3 = 21\nSố chẵn: [2, 4, 6, 8, 10]\nBình phương: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nTổng: 55'
        };
