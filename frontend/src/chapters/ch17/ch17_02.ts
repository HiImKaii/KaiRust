import { Lesson } from '../../courses';

export const ch17_02: Lesson = {
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
        };
