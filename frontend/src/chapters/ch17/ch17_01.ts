import { Lesson } from '../../courses';

export const ch17_01: Lesson = {
            id: 'ch17-01',
            title: '17.1 Futures và Async Syntax',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Các key elements của asynchronous programming trong Rust là futures và Rust's async và await keywords.</p>

<h3 class="task-heading">Futures</h3>
<p>Một future là một giá trị có thể chưa sẵn sàng bây giờ nhưng sẽ trở nên sẵn sàng tại một thời điểm nào đó trong tương lai. Rust cung cấp một Future trait như một building block để các async operations khác nhau có thể được implemented với các data structures khác nhau nhưng với một interface chung.</p>

<p>Trong Rust, futures là các types implement Future trait. Mỗi future giữ thông tin riêng của nó về tiến độ đã được thực hiện và "ready" có nghĩa là gì.</p>

<h3 class="task-heading">Async và Await</h3>
<p>Bạn có thể apply async keyword vào blocks và functions để specify rằng chúng có thể bị interrupt và resumed. Trong một async block hoặc async function, bạn có thể sử dụng await keyword để await một future (tức là, đợi cho nó trở nên sẵn sàng). Bất kỳ điểm nào bạn await một future trong một async block hoặc function là một potential spot cho block hoặc function đó pause và resume. Process của việc check với một future để xem giá trị của nó đã available chưa được gọi là polling.</p>

<p>Một số ngôn ngữ khác, như C# và JavaScript, cũng sử dụng async và await keywords cho async programming. Nếu bạn quen thuộc với những ngôn ngữ đó, bạn có thể nhận thấy một số khác biệt đáng kể trong cách Rust xử lý syntax.</p>

<p>Khi viết async Rust, chúng ta sử dụng async và await keywords hầu hết thời gian. Rust compile chúng thành code tương đương sử dụng Future trait, giống như nó compile for loops thành code tương đương sử dụng Iterator trait.</p>

<h3 class="task-heading">Futures là Lazy</h3>
<p>Chúng ta phải explicitly await cả hai futures này, bởi vì futures trong Rust là lazy: chúng không làm gì cho đến khi bạn ask chúng với await keyword. Điều này có thể nhắc bạn về việc thảo luận về iterators trong Chương 13. Iterators không làm gì trừ khi bạn gọi method next của chúng. Tương tự, futures không làm gì trừ khi bạn explicitly ask chúng. Sự lười biếng này cho phép Rust tránh chạy async code cho đến khi nó thực sự cần thiết.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Điều này khác với behavior chúng ta thấy khi sử dụng thread::spawn trong Chương 16, nơi closure chúng ta passed sang một thread khác bắt đầu chạy ngay lập tức.
</div>

<h3 class="task-heading">Async Functions</h3>
<p>Khi Rust thấy một block được đánh dấu với async keyword, nó compile nó thành một unique, anonymous data type implement Future trait. Khi Rust thấy một function được đánh dấu với async, nó compile nó thành một non-async function có body là một async block. Return type của một async function là type của anonymous data type mà compiler tạo cho async block đó.</p>

<p>Như vậy, viết async fn tương đương với việc viết một function trả về một future của return type.</p>

<h3 class="task-heading">Async Runtime</h3>
<p>Async code cần một runtime: một Rust crate quản lý các details của việc executing asynchronous code. Hầu hết các ngôn ngữ hỗ trợ async bundle một runtime, nhưng Rust thì không. Thay vào đó, có nhiều async runtimes khác nhau available, mỗi cái đưa ra các trade-offs khác nhau phù hợp với use case nó nhắm đến.</p>

<p>Trong chương này, chúng ta sẽ sử dụng block_on function, nhận một future làm argument và block current thread cho đến khi future này chạy đến completion.</p>

<h3 class="task-heading">Racing Multiple Futures</h3>
<p>Chúng ta có thể sử dụng trpl::select để race nhiều futures và lấy kết quả của future hoàn thành đầu tiên.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use trpl::{Either, Html};

trpl::block_on(async {
    let title_fut_1 = page_title(&args[1]);
    let title_fut_2 = page_title(&args[2]);

    let (url, maybe_title) =
        match trpl::select(title_fut_1, title_fut_2).await {
            Either::Left(left) => left,
            Either::Right(right) => right,
        };
})</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Tóm tắt Async/Await:</strong>
  <ul>
    <li><strong>Future</strong> - Giá trị có thể chưa sẵn sàng nhưng sẽ trở nên sẵn sàng</li>
    <li><strong>async fn</strong> - Function trả về Future</li>
    <li><strong>await</strong> - Đợi Future hoàn thành (non-blocking)</li>
    <li><strong>Lazy</strong> - Futures không làm gì cho đến khi được await</li>
    <li><strong>Runtime</strong> - Cần runtime như Tokio để chạy async code</li>
    <li><strong>block_on</strong> - Block thread cho đến khi Future hoàn thành</li>
    <li><strong>select</strong> - Race nhiều futures</li>
  </ul>
</div>
`,
            defaultCode: `// Lưu ý: Để chạy async code, cần thêm dependency vào Cargo.toml:
// tokio = { version = "1", features = ["full"] }

// Đây là ví dụ concept - không chạy được trực tiếp
// Trong thực tế sử dụng tokio:

/*
use tokio;

async fn fetch_data(url: &str) -> String {
    // Giả lập network request
    format!("Data from {}", url)
}

#[tokio::main]
async fn main() {
    // Gọi nhiều async functions cùng lúc
    let future1 = fetch_data("https://api.example.com/users");
    let future2 = fetch_data("https://api.example.com/posts");

    // Await cả hai
    let result1 = future1.await;
    let result2 = future2.await;

    println!("{}", result1);
    println!("{}", result2);
}
*/

fn main() {
    // Demo concept của async/await
    println!("=== Async/Await Concept Demo ===");
    println!();
    println!("1. async fn trả về Future<Output = T>");
    println!("2. .await đợi Future hoàn thành (non-blocking)");
    println!("3. Futures là LAZY - không làm gì cho đến khi .await");
    println!("4. Cần runtime như Tokio để chạy");
    println!();
    println!("Ví dụ thực tế cần thêm tokio vào dependencies!");
}
`,
            expectedOutput: `=== Async/Await Concept Demo ===

1. async fn trả về Future<Output = T>
2. .await đợi Future hoàn thành (non-blocking)
3. Futures là LAZY - không làm gì cho đến khi .await
4. Cần runtime như Tokio để chạy

Ví dụ thực tế cần thêm tokio vào dependencies!`
        };
