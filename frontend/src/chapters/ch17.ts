import { Chapter } from '../courses';

export const ch17: Chapter = {
    id: 'ch17',
    title: 'Chương 17: Async và Await',
    lessons: [
        {
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
        },
        {
            id: 'ch17-02',
            title: '17.2 Concurrency với Async',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Chạy nhiều async tasks đồng thời (concurrent) với <code>join!</code>, <code>select!</code>, và task spawning.</p>

<h3 class="task-heading">tokio::join! — Chờ tất cả</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>async fn fetch_user() -> User { /* ... */ }
async fn fetch_posts() -> Vec&lt;Post&gt; { /* ... */ }

let (user, posts) = tokio::join!(
    fetch_user(),
    fetch_posts(),
);
// Cả hai chạy đồng thời!</code></pre>
</div>

<h3 class="task-heading">tokio::select! — Chờ cái nào xong trước</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>tokio::select! {
    val = future1 => println!("future1 xong trước: {val}"),
    val = future2 => println!("future2 xong trước: {val}"),
}</code></pre>
</div>

<h3 class="task-heading">Spawn tasks</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let handle = tokio::spawn(async {
    // Task chạy trong background
    expensive_computation().await
});

let result = handle.await.unwrap();</code></pre>
</div>

<h3 class="task-heading">Streams</h3>
<p>Async version của Iterator — tạo giá trị theo thời gian:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use tokio_stream::StreamExt;

let mut stream = tokio_stream::iter(vec![1, 2, 3]);
while let Some(value) = stream.next().await {
    println!("{value}");
}</code></pre>
</div>
`,
            defaultCode: `// Demo concepts of async concurrency
// (synchronous simulation)

fn task_a() -> &'static str {
    // Simulate async work
    "Dữ liệu A"
}

fn task_b() -> &'static str {
    "Dữ liệu B"
}

fn task_c() -> &'static str {
    "Dữ liệu C"
}

fn main() {
    println!("=== Mô phỏng tokio::join! ===");
    // Trong thực tế: let (a, b, c) = tokio::join!(task_a(), task_b(), task_c());
    let a = task_a();
    let b = task_b();
    let c = task_c();
    println!("Kết quả: {a}, {b}, {c}");

    println!("\\n=== Async Patterns ===");
    println!("1. join!  — chờ tất cả futures");
    println!("2. select! — chờ future nào xong trước");
    println!("3. spawn  — chạy task trong background");
    println!("4. stream — iterator bất đồng bộ");

    println!("\\n💡 Cần async runtime (tokio) để chạy thực tế");
}
`,
            expectedOutput: '=== Mô phỏng tokio::join! ===\nKết quả: Dữ liệu A, Dữ liệu B, Dữ liệu C\n\n=== Async Patterns ===\n1. join!  — chờ tất cả futures\n2. select! — chờ future nào xong trước\n3. spawn  — chạy task trong background\n4. stream — iterator bất đồng bộ\n\n💡 Cần async runtime (tokio) để chạy thực tế'
        }
    ]
};
