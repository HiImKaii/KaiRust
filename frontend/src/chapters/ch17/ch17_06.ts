import { Lesson } from '../../courses';

export const ch17_06: Lesson = {
            id: '17-06',
            title: '17.6 Kết Hợp Tất Cả: Futures, Tasks, và Threads',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Như chúng ta đã thấy trong Chương 16, threads cung cấp một cách tiếp cận cho concurrency. Chúng ta đã thấy một cách tiếp cận khác trong chương này: sử dụng async với futures và streams. Nếu bạn đang tự hỏi khi nào chọn phương pháp này thay vì phương pháp khác, câu trả lời là: nó phụ thuộc! Và trong nhiều trường hợp, lựa chọn không phải là threads hoặc async mà là threads và async.</p>

<p>Nhiều hệ điều hành đã cung cấp các mô hình concurrency dựa trên threads trong nhiều thập kỷ, và nhiều ngôn ngữ lập trình hỗ trợ chúng kết quả. Tuy nhiên, các mô hình này không không có những trade-offs của chúng. Trên nhiều hệ điều hành, chúng sử dụng khá nhiều bộ nhớ cho mỗi thread. Threads cũng chỉ là một lựa chọn khi hệ điều hành và phần cứng của bạn hỗ trợ chúng. Không giống như máy tính để bàn và di động chính, một số hệ thống nhúng hoàn toàn không có OS, vì vậy chúng cũng không có threads.</p>

<p>Mô hình async cung cấp một—and ultimately complementary—tập hợp các trade-offs khác. Trong mô hình async, các operations đồng thời không cần threads riêng của chúng. Thay vào đó, chúng có thể chạy trên tasks, như khi chúng ta sử dụng trpl::spawn_task để bắt đầu công việc từ một function đồng bộ trong phần streams. Một task tương tự như một thread, nhưng thay vì được quản lý bởi hệ điều hành, nó được quản lý bởi code level thư viện: runtime.</p>

<p>Có một lý do các APIs để spawn threads và spawn tasks giống nhau đến vậy. Threads hoạt động như một ranh giới cho các tập hợp các operations đồng bộ; concurrency có thể xảy ra giữa các threads. Tasks hoạt động như một ranh giới cho các tập hợp các operations bất đồng bộ; concurrency có thể xảy ra cả giữa và trong các tasks, vì một task có thể chuyển đổi giữa các futures trong body của nó. Cuối cùng, futures là đơn vị concurrency mịn nhất của Rust, và mỗi future có thể đại diện cho một cây của các futures khác. Runtime—cụ thể là executor của nó—quản lý các tasks, và các tasks quản lý các futures. Về mặt đó, các tasks tương tự như các lightweight, runtime-managed threads với các capabilities bổ sung đến từ việc được quản lý bởi runtime thay vì bởi hệ điều hành.</p>

<p>Điều này không có nghĩa là async tasks luôn tốt hơn threads (hoặc ngược lại). Concurrency với threads theo một cách nào đó là một mô hình lập trình đơn giản hơn so với concurrency với async. Đó có thể là một điểm mạnh hoặc điểm yếu. Threads hơi "fire and forget"; chúng không có equivalent native cho một future, vì vậy chúng đơn giản chạy đến hoàn thành mà không bị gián đoạn trừ bởi chính hệ điều hành.</p>

<p>Và hóa ra là threads và tasks thường hoạt động rất tốt cùng nhau, vì tasks có thể (ít nhất trong một số runtimes) được di chuyển giữa các threads. Thực tế, ở hậu trường, runtime chúng ta đã sử dụng—bao gồm các functions spawn_blocking và spawn_task—là multithreaded theo mặc định! Nhiều runtimes sử dụng một cách tiếp cận gọi là work stealing để di chuyển tasks một cách minh bạch giữa các threads, dựa trên cách các threads hiện đang được sử dụng, để cải thiện hiệu suất tổng thể của hệ thống. Cách tiếp cận đó thực sự cần threads và tasks, và do đó cần futures.</p>

<p>Khi nghĩ về phương pháp nào sử dụng khi nào, hãy xem xét các quy tắc thực tế này:</p>
<ul>
    <li>Nếu công việc có thể parallelize rất tốt (tức là, CPU-bound), như xử lý một loạt data mà mỗi phần có thể được xử lý riêng biệt, threads là lựa chọn tốt hơn.</li>
    <li>Nếu công việc rất concurrent (tức là, I/O-bound), như xử lý messages từ nhiều nguồn khác nhau có thể đến ở các khoảng hoặc tốc độ khác nhau, async là lựa chọn tốt hơn.</li>
</ul>

<p>Và nếu bạn cần cả parallelism và concurrency, bạn không phải chọn giữa threads và async. Bạn có thể sử dụng chúng cùng nhau một cách tự do, để mỗi thứ chơi phần nó giỏi nhất. Ví dụ, Listing 17-25 cho thấy một ví dụ khá phổ biến về loại kết hợp này trong code Rust thực tế.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{thread, time::Duration};

fn main() {
    let (tx, mut rx) = trpl::channel();

    thread::spawn(move || {
        for i in 1..11 {
            tx.send(i).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    trpl::block_on(async {
        while let Some(message) = rx.recv().await {
            println!("{message}");
        }
    });
}</code></pre>
</div>
<p><em>Listing 17-25: Gửi messages với code blocking trong một thread và awaiting các messages trong một async block</em></p>

<p>Chúng ta bắt đầu bằng cách tạo một async channel, sau đó spawn một thread nhận ownership của phía sender của channel sử dụng từ khóa move. Trong thread, chúng ta gửi các số từ 1 đến 10, sleep một giây giữa mỗi số. Cuối cùng, chúng ta chạy một future được tạo với một async block truyền cho trpl::block_on giống như chúng ta đã làm xuyên suốt chương. Trong future đó, chúng ta await các messages, giống như trong các ví dụ message-passing khác chúng ta đã thấy.</p>

<p>Để quay lại kịch bản chúng ta mở đầu chương, hãy tưởng tượng chạy một loạt các video encoding tasks sử dụng một thread chuyên dụng (vì video encoding là compute-bound) nhưng thông báo cho UI rằng các operations đó đã hoàn thành với một async channel. Có vô số ví dụ về các loại kết hợp này trong các trường hợp sử dụng thực tế.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Đây không phải là lần cuối bạn thấy concurrency trong cuốn sách này. Project trong Chương 21 sẽ áp dụng các khái niệm này trong một tình huống thực tế hơn so với các ví dụ đơn giản được thảo luận ở đây và so sánh giải quyết vấn đề với threading versus tasks và futures trực tiếp hơn.</p>

<p>Bất kể bạn chọn phương pháp nào, Rust cung cấp cho bạn các công cụ bạn cần để viết code concurrency an toàn và nhanh—whether for a high-throughput web server or an embedded operating system.</p>

<p>Tiếp theo, chúng ta sẽ nói về các cách idiomatic để mô hình hóa vấn đề và cấu trúc hóa solutions khi các chương trình Rust của bạn lớn hơn. Ngoài ra, chúng ta sẽ thảo luận về cách idioms của Rust liên quan đến những gì bạn có thể quen thuộc từ lập trình hướng đối tượng.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Chương 17:</strong>
  <ul>
    <li><strong>Futures</strong> - Giá trị có thể chưa sẵn sàng nhưng sẽ trở nên sẵn sàng</li>
    <li><strong>async/await</strong> - Cú pháp để viết code bất đồng bộ</li>
    <li><strong>Runtime</strong> - Tokio, async-std, hoặc các runtime khác</li>
    <li><strong>Tasks</strong> - Đơn vị concurrency được quản lý bởi runtime</li>
    <li><strong>Threads vs Async</strong> - Threads cho CPU-bound, Async cho I/O-bound</li>
    <li><strong>Kết hợp</strong> - Có thể sử dụng cả hai cùng nhau</li>
    <li><strong>Streams</strong> - Chuỗi futures theo thời gian</li>
    <li><strong>Pin/Unpin</strong> - Cơ chế để quản lý futures có thể tự tham chiếu</li>
  </ul>
</div>
`,
            defaultCode: `// Demo concepts

fn main() {
    println!("=== Kết Hợp Tất Cả: Futures, Tasks, và Threads ===");
    println!();
    println!("1. Threads - Cho CPU-bound tasks");
    println!("2. Async   - Cho I/O-bound tasks");
    println!("3. Có thể kết hợp cả hai!");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Kết Hợp Tất Cả: Futures, Tasks, và Threads ===

1. Threads - Cho CPU-bound tasks
2. Async   - Cho I/O-bound tasks
3. Có thể kết hợp cả hai!

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
