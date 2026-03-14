import { Lesson } from '../../courses';

export const ch17_02: Lesson = {
            id: 'ch17-02',
            title: '17.2 Áp dụng Concurrency với Async',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong phần này, chúng ta sẽ apply async vào một số thách thức concurrency tương tự như chúng ta đã giải quyết với threads trong Chương 16. Vì chúng ta đã nói về nhiều key ideas quan trọng, trong phần này chúng ta sẽ tập trung vào những gì khác biệt giữa threads và futures.</p>

<p>Trong nhiều trường hợp, các APIs để làm việc với concurrency sử dụng async rất giống với các APIs cho việc sử dụng threads. Trong các trường hợp khác, chúng khá khác nhau.</p>

<h3 class="task-heading">Tạo Task Mới với spawn_task</h3>
<p>Operation đầu tiên chúng ta thực hiện trong Chương 16 là đếm trên hai threads riêng biệt. Hãy làm điều tương tự sử dụng async. Trpl crate cung cấp một spawn_task function trông rất giống với thread::spawn API, và một sleep function là phiên bản async của thread::sleep API.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::time::Duration;

fn main() {
    trpl::block_on(async {
        trpl::spawn_task(async {
            for i in 1..10 {
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        });

        for i in 1..5 {
            println!("hi number {i} from the second task!");
            trpl::sleep(Duration::from_millis(500)).await;
        }
    });
}</code></pre>
</div>
<p><em>Listing 17-6: Creating a new task to print one thing while the main task prints something else</em></p>

<p>Code này hoạt động tương tự như implementation dựa trên threads. Chúng ta có thể sử dụng await với join handle để đợi task hoàn thành.</p>

<h3 class="task-heading">Sử dụng join để Đợi Tasks Hoàn Thành</h3>
<p>Với threads, chúng ta sử dụng method join để "block" cho đến khi thread hoàn thành việc chạy. Với async, chúng ta có thể sử dụng await vì task handle bản thân là một future.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let handle = trpl::spawn_task(async {
            for i in 1..10 {
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        });

        for i in 1..5 {
            println!("hi number {i} from the second task!");
            trpl::sleep(Duration::from_millis(500)).await;
        }

        handle.await.unwrap();</code></pre>
</div>
<p><em>Listing 17-7: Using await với một join handle để chạy một task đến hoàn thành</em></p>

<h3 class="task-heading">Sử dụng join để Chạy Nhiều Anonymous Futures</h3>
<p>Chúng ta có thể sử dụng trpl::join để đợi nhiều anonymous futures. Hàm này fair, có nghĩa là nó check mỗi future equally often, alternating giữa chúng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let fut1 = async {
            for i in 1..10 {
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let fut2 = async {
            for i in 1..5 {
                println!("hi number {i} from the second task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        trpl::join(fut1, fut2).await;</code></pre>
</div>
<p><em>Listing 17-8: Using trpl::join để await hai anonymous futures</em></p>

<h3 class="task-heading">Gửi Data Giữa Hai Tasks Sử dụng Message Passing</h3>
<p>Sharing data giữa các futures cũng sẽ quen thuộc: chúng ta sẽ sử dụng message passing, nhưng lần này với các versions async của các types và functions.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let (tx, mut rx) = trpl::channel();

        let val = String::from("hi");
        tx.send(val).unwrap();

        let received = rx.recv().await.unwrap();
        println!("received '{received}'");</code></pre>
</div>
<p><em>Listing 17-9: Creating an async channel and assigning the two halves to tx and rx</em></p>

<p>Phiên bản async của API hơi khác với phiên bản thread-based: nó sử dụng một mutable receiver rx thay vì immutable, và method recv của nó tạo ra một future chúng ta cần await thay vì tạo ra giá trị trực tiếp.</p>

<h3 class="task-heading">Gửi và Nhận Nhiều Messages</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let (tx, mut rx) = trpl::channel();

        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("future"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            trpl::sleep(Duration::from_millis(500)).await;
        }

        while let Some(value) = rx.recv().await {
            println!("received '{value}'");
        }</code></pre>
</div>
<p><em>Listing 17-10: Sending and receiving multiple messages over the async channel</em></p>

<h3 class="task-heading">Code Trong Một Async Block Thực Thi Theo Thứ tự Tuyến tính</h3>
<p>Trong một async block nhất định, thứ tự xuất hiện của các await keywords trong code cũng là thứ tự chúng được thực thi khi chương trình chạy.</p>

<p>Để có được behavior chúng ta muốn, nơi sleep delay xảy ra giữa mỗi message, chúng ta cần đặt các tx và rx operations trong các async blocks riêng biệt của chúng.</p>

<h3 class="task-heading">Di chuyển Ownership Vào Một Async Block</h3>
<p>Chúng ta cần sử dụng từ khóa move với async blocks, giống như với closures.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let tx_fut = async move {
            // tx được move vào đây
            // sẽ được dropped khi block kết thúc
        };</code></pre>
</div>

<h3 class="task-heading">Join Nhiều Futures với join! Macro</h3>
<p>Async channel cũng là một multiple-producer channel, vì vậy chúng ta có thể gọi clone trên tx nếu chúng ta muốn gửi messages từ nhiều futures.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        trpl::join!(tx1_fut, tx_fut, rx_fut);</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Tóm tắt Async Concurrency:</strong>
  <ul>
    <li><strong>spawn_task</strong> - Tạo task mới (giống thread::spawn)</li>
    <li><strong>join</strong> - Đợi tất cả futures hoàn thành</li>
    <li><strong>select</strong> - Race futures, lấy cái nào xong trước</li>
    <li><strong>channel</strong> - Async message passing</li>
    <li><strong>async move</strong> - Di chuyển ownership vào async block</li>
    <li><strong>join!</strong> - Macro để join nhiều futures</li>
    <li><strong>Fair</strong> - Join check mỗi future equally often</li>
  </ul>
</div>
`,
            defaultCode: `// Demo concepts - cần tokio để chạy thực tế
// #[tokio::main]
// async fn main() {
//     // Ví dụ với join
//     let (a, b) = tokio::join!(
//         async { 1 },
//         async { 2 }
//     );
//
//     // Ví dụ với select
//     tokio::select! {
//         result = task1() => println!("Task 1: {result}"),
//         result = task2() => println!("Task 2: {result}"),
//     }
// }

fn main() {
    println!("=== Async Concurrency Concepts ===");
    println!();
    println!("1. spawn_task - Tạo task mới (giống thread::spawn)");
    println!("2. join       - Đợi tất cả futures hoàn thành");
    println!("3. select    - Race futures, lấy cái nào xong trước");
    println!("4. channel   - Async message passing");
    println!("5. async move - Di chuyển ownership vào async block");
    println!("6. join!     - Macro để join nhiều futures");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Async Concurrency Concepts ===

1. spawn_task - Tạo task mới (giống thread::spawn)
2. join       - Đợi tất cả futures hoàn thành
3. select    - Race futures, lấy cái nào xong trước
4. channel   - Async message passing
5. async move - Di chuyển ownership vào async block
6. join!     - Macro để join nhiều futures

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
