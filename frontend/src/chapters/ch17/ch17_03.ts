import { Lesson } from '../../courses';

export const ch17_03: Lesson = {
            id: '17-03',
            title: '17.3 Trao Quyền Điều Khiển Cho Runtime',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Như bạn đã thấy trong phần "Chương trình Async Đầu Tiên", tại mỗi điểm await, Rust cho phép runtime tạm dừng task hiện tại và chuyển sang task khác nếu future đang chờ chưa sẵn sàng. Điều ngược lại cũng đúng: Rust chỉ tạm dừng các async blocks và trao quyền điều khiển lại cho runtime tại các điểm await. Mọi thứ nằm giữa các điểm await đều được thực thi một cách đồng bộ.</p>

<p>Điều đó có nghĩa là nếu bạn thực hiện một loạt công việc trong một async block mà không có điểm await nào, future đó sẽ chặn bất kỳ futures nào khác tiến triển. Bạn có thể nghe thấy điều này được gọi là một future "đói" (starving) các futures khác. Trong một số trường hợp, điều đó có thể không phải là vấn đề lớn. Tuy nhiên, nếu bạn đang thực hiện một số loại setup tốn kém hoặc công việc chạy trong thời gian dài, hoặc nếu bạn có một future sẽ tiếp tục thực hiện một tác vụ cụ thể vô thời hạn, bạn sẽ cần suy nghĩ về việc khi nào và ở đâu để trao quyền điều khiển lại cho runtime.</p>

<h3 class="task-heading">Vấn đề Starvation (Đói)</h3>
<p>Hãy mô phỏng một thao tác chạy trong thời gian dài để minh họa vấn đề starvation, sau đó khám phá cách giải quyết nó. Listing 17-14 giới thiệu một hàm slow.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn slow(name: &str, ms: u64) {
    thread::sleep(Duration::from_millis(ms));
    println!("'{name}' ran for {ms}ms");
}</code></pre>
</div>
<p><em>Listing 17-14: Sử dụng thread::sleep để mô phỏng các thao tác chậm</em></p>

<p>Mã này sử dụng std::thread::sleep thay vì trpl::sleep để việc gọi slow sẽ chặn thread hiện tại trong một số mili giây. Chúng ta có thể sử dụng slow để thay thế cho các thao tác trong thực tế vừa chạy trong thời gian dài vừa chặn.</p>

<p>Trong Listing 17-15, chúng ta sử dụng slow để mô phỏng việc thực hiện loại công việc này trong một cặp futures.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let a = async {
            println!("'a' started.");
            slow("a", 30);
            slow("a", 10);
            slow("a", 20);
            trpl::sleep(Duration::from_millis(50)).await;
            println!("'a' finished.");
        };

        let b = async {
            println!("'b' started.");
            slow("b", 75);
            slow("b", 10);
            slow("b", 15);
            slow("b", 350);
            trpl::sleep(Duration::from_millis(50)).await;
            println!("'b' finished.");
        };

        trpl::select(a, b).await;</code></pre>
</div>
<p><em>Listing 17-15: Gọi hàm slow để mô phỏng các thao tác chậm</em></p>

<p>Mỗi future chỉ trao quyền điều khiển lại cho runtime sau khi thực hiện một loạt các thao tác chậm. Nếu bạn chạy mã này, bạn sẽ thấy đầu ra này:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>'a' started.
'a' ran for 30ms
'a' ran for 10ms
'a' ran for 20ms
'b' started.
'b' ran for 75ms
'b' ran for 10ms
'b' ran for 15ms
'b' ran for 350ms
'a' finished.</code></pre>
</div>

<p>Cũng như với Listing 17-5 nơi chúng ta sử dụng trpl::select để đua hai futures fetch hai URLs, select vẫn hoàn thành ngay khi a hoàn thành. Tuy nhiên, không có sự xen kẽ giữa các lần gọi slow trong hai futures. Future a thực hiện tất cả công việc của nó cho đến khi trpl::sleep được await, sau đó future b thực hiện tất cả công việc của nó cho đến khi trpl::sleep của chính nó được await, và cuối cùng future a hoàn thành. Để cho cả hai futures tiến triển giữa các tác vụ chậm của chúng, chúng ta cần các điểm await để trao quyền điều khiển lại cho runtime. Điều đó có nghĩa là chúng ta cần một thứ gì đó có thể await!</p>

<p>Chúng ta đã có thể thấy loại chuyển giao này xảy ra trong Listing 17-15: nếu chúng ta loại bỏ trpl::slee ở cuối future a, nó sẽ hoàn thành mà future b không chạy chút nào. Hãy thử sử dụng hàm trpl::sleep như điểm bắt đầu để cho phép các thao tác luân phiên tiến triển, như trong Listing 17-16.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let one_ms = Duration::from_millis(1);

        let a = async {
            println!("'a' started.");
            slow("a", 30);
            trpl::sleep(one_ms).await;
            slow("a", 10);
            trpl::sleep(one_ms).await;
            slow("a", 20);
            trpl::sleep(one_ms).await;
            println!("'a' finished.");
        };

        let b = async {
            println!("'b' started.");
            slow("b", 75);
            trpl::sleep(one_ms).await;
            slow("b", 10);
            trpl::sleep(one_ms).await;
            slow("b", 15);
            trpl::sleep(one_ms).await;
            slow("b", 350);
            trpl::sleep(one_ms).await;
            println!("'b' finished.");
        };</code></pre>
</div>
<p><em>Listing 17-16: Sử dụng trpl::sleep để cho phép các thao tác luân phiên tiến triển</em></p>

<p>Chúng ta đã thêm các lần gọi trpl::sleep với các điểm await giữa mỗi lần gọi slow. Bây giờ công việc của hai futures được xen kẽ:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>'a' started.
'a' ran for 30ms
'b' started.
'b' ran for 75ms
'a' ran for 10ms
'b' ran for 10ms
'a' ran for 20ms
'b' ran for 15ms
'a' finished.</code></pre>
</div>

<p>Future a vẫn chạy trong một chút trước khi trao quyền điều khiển cho b, vì nó gọi slow trước khi gọi trpl::sleep, nhưng sau đó các futures luân phiên qua lại mỗi khi một trong chúng chạm đến một điểm await. Trong trường hợp này, chúng ta đã làm điều đó sau mỗi lần gọi slow, nhưng chúng ta có thể chia nhỏ công việc theo bất kỳ cách nào hợp lý nhất.</p>

<h3 class="task-heading">Sử dụng trpl::yield_now</h3>
<p>Tuy nhiên, chúng ta không thực sự muốn sleep ở đây: chúng ta muốn tiến triển nhanh nhất có thể. Chúng ta chỉ cần trao quyền điều khiển lại cho runtime. Chúng ta có thể làm điều đó trực tiếp, sử dụng hàm trpl::yield_now. Trong Listing 17-17, chúng ta thay thế tất cả các lần gọi trpl::sleep bằng trpl::yield_now.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let a = async {
            println!("'a' started.");
            slow("a", 30);
            trpl::yield_now().await;
            slow("a", 10);
            trpl::yield_now().await;
            slow("a", 20);
            trpl::yield_now().await;
            println!("'a' finished.");
        };

        let b = async {
            println!("'b' started.");
            slow("b", 75);
            trpl::yield_now().await;
            slow("b", 10);
            trpl::yield_now().await;
            slow("b", 15);
            trpl::yield_now().await;
            slow("b", 350);
            trpl::yield_now().await;
            println!("'b' finished.");
        };</code></pre>
</div>
<p><em>Listing 17-17: Sử dụng yield_now để cho phép các thao tác luân phiên tiến triển</em></p>

<p>Mã này rõ ràng hơn về intent thực tế và có thể nhanh hơn đáng kể so với việc sử dụng sleep, vì các timers thường có giới hạn về độ mịn (granularity). Ví dụ, phiên bản sleep mà chúng ta đang sử dụng sẽ luôn sleep ít nhất một mili giây, ngay cả khi chúng ta truyền cho nó một Duration của một nano giây. Một lần nữa, máy tính hiện đại rất nhanh: chúng có thể làm được nhiều thứ trong một mili giây!</p>

<h3 class="task-heading">Multitasking Hợp Tác (Cooperative Multitasking)</h3>
<p>Điều này có nghĩa là async có thể hữu ích ngay cả cho các tác vụ compute-bound, tùy thuộc vào những gì khác chương trình của bạn đang làm, vì nó cung cấp một công cụ hữu ích để cấu trúc mối quan hệ giữa các phần khác nhau của chương trình (nhưng với chi phí của overhead của async state machine). Đây là một dạng của cooperative multitasking, nơi mỗi future có quyền xác định khi nó trao quyền điều khiển qua các điểm await. Mỗi future do đó cũng có trách nhiệm tránh chặn quá lâu. Trong một số hệ điều hành nhúng dựa trên Rust, đây là loại multitasking duy nhất!</p>

<p>Trong mã thực tế, bạn thường không xen kẽ các lời gọi hàm với các điểm await trên mỗi dòng, tất nhiên. Mặc dù việc trao quyền điều khiển theo cách này tương đối ít tốn kém, nhưng nó không miễn phí. Trong nhiều trường hợp, việc cố gắng chia nhỏ một tác vụ compute-bound có thể làm nó chậm hơn đáng kể, vì đôi khi tốt hơn cho hiệu suất tổng thể là để một thao tác chặn trong chốc lát. Luôn luôn đo lường để xem các bottleneck hiệu suất thực sự của mã bạn là gì. Tuy nhiên, động lực cơ bản này quan trọng cần ghi nhớ, nếu bạn thấy nhiều công việc xảy ra tuần tự mà bạn mong đợi xảy ra đồng thời!</p>

<h3 class="task-heading">Xây Dựng Async Abstractions Của Riêng Bạn</h3>
<p>Chúng ta cũng có thể compose các futures lại với nhau để tạo các patterns mới. Ví dụ, chúng ta có thể xây dựng một hàm timeout với các async building blocks mà chúng ta đã có. Khi hoàn thành, kết quả sẽ là một building block khác mà chúng ta có thể sử dụng để tạo nhiều async abstractions hơn nữa.</p>

<p>Listing 17-18 cho thấy cách chúng ta mong đợi timeout này hoạt động với một future chậm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
        let slow = async {
            trpl::sleep(Duration::from_secs(5)).await;
            "Finally finished"
        };

        match timeout(slow, Duration::from_secs(2)).await {
            Ok(message) => println!("Succeeded with '{message}'"),
            Err(duration) => {
                println!("Failed after {} seconds", duration.as_secs())
            }
        }</code></pre>
</div>
<p><em>Listing 17-18: Sử dụng timeout tưởng tượng để chạy một thao tác chậm với giới hạn thời gian</em></p>

<p>Hãy implement điều này! Để bắt đầu, hãy nghĩ về API cho timeout:</p>
<ul>
    <li>Nó cần là một async function chính nó để chúng ta có thể await nó.</li>
    <li>Tham số đầu tiên nên là một future để chạy. Chúng ta có thể làm nó generic để cho phép nó hoạt động với bất kỳ future nào.</li>
    <li>Tham số thứ hai sẽ là thời gian tối đa để chờ. Nếu chúng ta sử dụng một Duration, điều đó sẽ dễ dàng truyền cho trpl::sleep.</li>
    <li>Nó nên trả về một Result. Nếu future hoàn thành thành công, Result sẽ là Ok với giá trị được tạo ra bởi future. Nếu timeout hết trước, Result sẽ là Err với duration mà timeout đã chờ.</li>
</ul>

<p>Listing 17-19 cho thấy khai báo này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
async fn timeout<F: Future>(
    future_to_try: F,
    max_time: Duration,
) -> Result<F::Output, Duration> {
    // Đây là nơi implementation của chúng ta sẽ đi!
}</code></pre>
</div>
<p><em>Listing 17-19: Định nghĩa signature của timeout</em></p>

<p>Điều đó đáp ứng các mục tiêu của chúng ta về các types. Bây giờ hãy nghĩ về behavior mà chúng ta cần: chúng ta muốn đua future được truyền vào với duration. Chúng ta có thể sử dụng trpl::sleep để tạo một timer future từ duration, và sử dụng trpl::select để chạy timer đó với future mà caller truyền vào.</p>

<p>Trong Listing 17-20, chúng ta implement timeout bằng cách matching trên kết quả của việc await trpl::select.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use trpl::Either;

// --snip--

async fn timeout<F: Future>(
    future_to_try: F,
    max_time: Duration,
) -> Result<F::Output, Duration> {
    match trpl::select(future_to_try, trpl::sleep(max_time)).await {
        Either::Left(output) => Ok(output),
        Either::Right(_) => Err(max_time),
    }
}</code></pre>
</div>
<p><em>Listing 17-20: Định nghĩa timeout với select và sleep</em></p>

<p>Implementation của trpl::select không công bằng: nó luôn luôn poll các đối số theo thứ tự mà chúng được truyền vào (các select implementations khác sẽ chọn ngẫu nhiên đối số nào poll trước). Do đó, chúng ta truyền future_to_try cho select trước để nó có cơ hội hoàn thành ngay cả khi max_time là một khoảng thời gian rất ngắn. Nếu future_to_try hoàn thành trước, select sẽ trả về Left với output từ future_to_try. Nếu timer hoàn thành trước, select sẽ trả về Right với output của timer là ().</p>

<p>Nếu future_to_try thành công và chúng ta nhận được một Left(output), chúng ta trả về Ok(output). Nếu timer sleep hết thay vì và chúng ta nhận được một Right(()), chúng ta bỏ qua () với _ và trả về Err(max_time) thay vì.</p>

<p>Với điều đó, chúng ta có một timeout hoạt động được được xây dựng từ hai async helpers khác. Nếu chúng ta chạy mã của mình, nó sẽ in ra chế độ failure sau timeout:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>Failed after 2 seconds</code></pre>
</div>

<p>Vì futures compose với các futures khác, bạn có thể xây dựng các công cụ thực sự mạnh mẽ sử dụng các async building blocks nhỏ hơn. Ví dụ, bạn có thể sử dụng cùng cách tiếp cận này để kết hợp timeouts với retries, và từ đó sử dụng chúng với các thao tác như gọi mạng (như những thao tác trong Listing 17-5).</p>

<p>Trong thực tế, bạn thường sẽ làm việc trực tiếp với async và await, và thứ yếu với các hàm như select và các macros như join! macro để kiểm soát cách các futures outermost được thực thi.</p>

<p>Chúng ta đã xem xét một số cách để làm việc với nhiều futures cùng một lúc. Tiếp theo, chúng ta sẽ xem xét cách chúng ta có thể làm việc với nhiều futures theo thứ tự theo thời gian với streams.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Trao Quyền Điều Khiển:</strong>
  <ul>
    <li><strong>Điểm await</strong> - Cho runtime cơ hội chuyển sang task khác</li>
    <li><strong>Starvation</strong> - Một future chặn các futures khác tiến triển</li>
    <li><strong>trpl::sleep</strong> - Tạm dừng với thời gian cụ thể</li>
    <li><strong>yield_now</strong> - Trao quyền cho runtime mà không sleep (nhanh hơn)</li>
    <li><strong>Cooperative multitasking</strong> - Mỗi future tự quyết định khi nào yield</li>
    <li><strong>Timeout</strong> - Ví dụ về xây dựng abstraction từ futures</li>
    <li><strong>select</strong> - Đua hai futures, lấy kết quả của cái hoàn thành trước</li>
  </ul>
</div>
`,
            defaultCode: `// Demo concepts - cần tokio để chạy thực tế

fn main() {
    println!("=== Trao Quyền Điều Khiển Cho Runtime ===");
    println!();
    println!("1. Điểm await - Cho runtime cơ hội chuyển task");
    println!("2. yield_now    - Trao quyền cho runtime (không sleep)");
    println!("3. Cooperative multitasking - Future tự quyết định khi yield");
    println!();
    println!("Ví dụ timeout với select:");
    println!("  - Race future với sleep timer");
    println!("  - Future hoàn thành trước -> Ok(result)");
    println!("  - Timer hết trước -> Err(timeout)");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Trao Quyền Điều Khiển Cho Runtime ===

1. Điểm await - Cho runtime cơ hội chuyển task
2. yield_now    - Trao quyền cho runtime (không sleep)
3. Cooperative multitasking - Future tự quyết định khi yield

Ví dụ timeout với select:
  - Race future với sleep timer
  - Future hoàn thành trước -> Ok(result)
  - Timer hết trước -> Err(timeout)

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
