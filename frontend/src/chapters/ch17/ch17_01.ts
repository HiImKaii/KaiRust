import { Lesson } from '../../courses';

export const ch17_01: Lesson = {
            id: 'ch17-01',
            title: '17.1 Futures và Async Syntax',
            duration: '25 phút',
            type: 'theory',
            content: `
<p><strong>Async programming</strong> cho phép viết code concurrent mà không cần tạo thread cho mỗi task. Rust dùng <code>async</code>/<code>await</code> syntax.</p>

<h3 class="task-heading">async fn</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>async fn hello() -> String {
    String::from("Xin chào từ async!")
}

// async fn trả về Future, cần .await để thực thi
#[tokio::main]
async fn main() {
    let msg = hello().await;
    println!("{msg}");
}</code></pre>
</div>

<h3 class="task-heading">Future trait</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Future {
    type Output;
    fn poll(self: Pin&lt;&mut Self&gt;, cx: &mut Context) -> Poll&lt;Self::Output&gt;;
}

enum Poll&lt;T&gt; {
    Ready(T),
    Pending,
}</code></pre>
</div>

<h3 class="task-heading">Async Runtime</h3>
<p>Rust không có built-in async runtime. Phổ biến nhất là <strong>Tokio</strong>:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
tokio = { version = "1", features = ["full"] }</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khác biệt với threads:</strong> Async tasks chạy trên cùng thread (hoặc thread pool nhỏ), context switch nhẹ hơn nhiều. Phù hợp cho I/O-bound tasks (network, file...).
</div>
`,
            defaultCode: `// Async trong Rust cần runtime (tokio, async-std...)
// Ở đây ta demo khái niệm cơ bản

fn simulate_fetch(url: &str) -> String {
    format!("Data từ {url}")
}

fn main() {
    // Mô phỏng async workflow
    println!("Bắt đầu fetch...");

    let urls = vec![
        "https://api.example.com/users",
        "https://api.example.com/posts",
        "https://api.example.com/comments",
    ];

    let results: Vec<String> = urls.iter()
        .map(|url| simulate_fetch(url))
        .collect();

    for result in &results {
        println!("  ✅ {result}");
    }

    println!("Hoàn thành {} requests!", results.len());

    // Trong thực tế với tokio:
    // #[tokio::main]
    // async fn main() {
    //     let result = reqwest::get(url).await?.text().await?;
    // }
}
`,
            expectedOutput: 'Bắt đầu fetch...\n  ✅ Data từ https://api.example.com/users\n  ✅ Data từ https://api.example.com/posts\n  ✅ Data từ https://api.example.com/comments\nHoàn thành 3 requests!'
        };
