import { Lesson } from '../../courses';

export const ch17_02: Lesson = {
            id: 'ch17-02',
            title: '17.2 Áp Dụng Concurrency Với Async',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong phần này, chúng ta sẽ áp dụng async vào một số thách thức concurrency tương tự như chúng ta đã giải quyết với threads trong Chương 16. Vì chúng ta đã nói về nhiều ý tưởng chính ở đó, trong phần này chúng ta sẽ tập trung vào những gì khác biệt giữa threads và futures.</p>

<p>Trong nhiều trường hợp, các APIs để làm việc với concurrency sử dụng async rất giống với các APIs cho việc sử dụng threads. Trong các trường hợp khác, chúng khá khác nhau. Ngay cả khi các APIs trông giống nhau giữa threads và async, chúng thường có hành vi khác—và hầu như luôn có các đặc điểm hiệu suất khác nhau.</p>

<h3 class="task-heading">Tạo Task Mới với spawn_task</h3>
<p>Operation đầu tiên chúng ta thực hiện trong phần "Creating a New Thread with spawn" ở Chương 16 là đếm trên hai threads riêng biệt. Hãy làm điều tương tự sử dụng async. Crate trpl cung cấp một hàm spawn_task trông rất giống với API thread::spawn, và một hàm sleep là phiên bản async của API thread::sleep. Chúng ta có thể sử dụng chúng cùng nhau để implement ví dụ đếm, như trong Listing 17-6.</p>

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
<p><em>Listing 17-6: Tạo một task mới để in một thứ trong khi task chính in thứ khác</em></p>

<p>Như điểm bắt đầu, chúng ta thiết lập hàm main với trpl::block_on để hàm top-level của chúng ta có thể là async.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Từ điểm này trở đi trong chương, mỗi ví dụ sẽ bao gồm chính xác cùng một đoạn code bọc với trpl::block_on trong main, vì vậy chúng ta thường sẽ bỏ qua nó giống như với main. Hãy nhớ bao gồm nó trong code của bạn!
</div>

<p>Sau đó chúng ta viết hai vòng lặp trong block đó, mỗi vòng chứa một lời gọi trpl::sleep, đợi nửa giây (500 mili giây) trước khi gửi message tiếp theo. Chúng ta đặt một vòng lặp trong body của trpl::spawn_task và vòng lặp kia trong một vòng lặp for top-level. Chúng ta cũng thêm một await sau các lời gọi sleep.</p>

<p>Mã này hoạt động tương tự như implementation dựa trên threads—bao gồm cả việc bạn có thể thấy các messages xuất hiện theo thứ tự khác nhau trong terminal của riêng bạn khi chạy nó:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>hi number 1 from the second task!
hi number 1 from the first task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!</code></pre>
</div>

<p>Phiên bản này dừng ngay khi vòng lặp for trong body của main async block kết thúc, vì task được spawn bởi spawn_task bị shutdown khi hàm main kết thúc. Nếu bạn muốn nó chạy đến khi task hoàn thành, bạn sẽ cần sử dụng một join handle để đợi task đầu tiên hoàn thành. Với threads, chúng ta sử dụng method join để "block" cho đến khi thread hoàn thành việc chạy. Trong Listing 17-7, chúng ta có thể sử dụng await để làm điều tương tự, vì bản thân task handle là một future. Output type của nó là một Result, vì vậy chúng ta cũng unwrap nó sau khi await.</p>

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
<p><em>Listing 17-7: Sử dụng await với một join handle để chạy một task đến hoàn thành</em></p>

<p>Phiên bản cập nhật này chạy cho đến khi cả hai vòng lặp hoàn thành:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>hi number 1 from the second task!
hi number 1 from the first task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!
hi number 6 from the first task!
hi number 7 from the first task!
hi number 8 from the first task!
hi number 9 from the first task!</code></pre>
</div>

<p>Cho đến nay, nó trông giống như async và threads cho chúng ta kết quả tương tự, chỉ với cú pháp khác: sử dụng await thay vì gọi join trên join handle, và await các lời gọi sleep.</p>

<p>Sự khác biệt lớn hơn là chúng ta không cần spawn một operating system thread khác để làm điều này. Thực tế, chúng ta thậm chí không cần spawn một task ở đây. Vì các async blocks biên dịch thành anonymous futures, chúng ta có thể đặt mỗi vòng lặp trong một async block và có runtime chạy cả hai đến hoàn thành sử dụng hàm trpl::join.</p>

<p>Trong phần "Waiting for All Threads to Finish" ở Chương 16, chúng ta đã chỉ cách sử dụng method join trên type JoinHandle được trả về khi bạn gọi std::thread::spawn. Hàm trpl::join tương tự, nhưng cho futures. Khi bạn cho nó hai futures, nó tạo ra một future mới có output là một tuple chứa output của mỗi future bạn truyền vào một khi cả hai hoàn thành. Như vậy, trong Listing 17-8, chúng ta sử dụng trpl::join để đợi cả fut1 và fut2 hoàn thành. Chúng ta không await fut1 và fut2 mà thay vào đó là future mới được tạo bởi trpl::join. Chúng ta bỏ qua output, vì nó chỉ là một tuple chứa hai giá trị unit.</p>

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
<p><em>Listing 17-8: Sử dụng trpl::join để await hai anonymous futures</em></p>

<p>Khi chạy, chúng ta thấy cả hai futures chạy đến hoàn thành:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>hi number 1 from the first task!
hi number 1 from the second task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!
hi number 6 from the first task!
hi number 7 from the first task!
hi number 8 from the first task!
hi number 9 from the first task!</code></pre>
</div>

<p>Bây giờ, bạn sẽ thấy chính xác cùng một thứ tự mỗi lần, rất khác với những gì chúng ta thấy với threads và với trpl::spawn_task trong Listing 17-7. Đó là vì hàm trpl::join là fair, có nghĩa là nó kiểm tra mỗi future equally often, xen kẽ giữa chúng, và không bao giờ để một cái vượt lên nếu cái kia sẵn sàng. Với threads, hệ điều hành quyết định kiểm tra thread nào và để nó chạy bao lâu. Với async Rust, runtime quyết định kiểm tra task nào. (Trong thực tế, các chi tiết trở nên phức tạp vì một async runtime có thể sử dụng operating system threads ở bên dưới như một phần của cách nó quản lý concurrency, vì vậy đảm bảo fairness có thể là nhiều công việc hơn cho một runtime—nhưng nó vẫn có thể!) Các runtimes không phải đảm bảo fairness cho bất kỳ operation nào, và chúng thường cung cấp các APIs khác nhau để cho phép bạn chọn có muốn fairness hay không.</p>

<p>Hãy thử một số biến thể này khi await các futures và xem chúng làm gì:</p>
<ul>
    <li>Loại bỏ async block xung quanh một hoặc cả hai vòng lặp.</li>
    <li>Await mỗi async block ngay sau khi định nghĩa nó.</li>
    <li>Chỉ bọc vòng lặp đầu tiên trong một async block, và await future kết quả sau body của vòng lặp thứ hai.</li>
</ul>

<p>Để có thêm thách thức, xem bạn có thể tìm ra output sẽ như thế nào trong mỗi trường hợp trước khi chạy code!</p>

<h3 class="task-heading">Gửi Data Giữa Hai Tasks Sử dụng Message Passing</h3>
<p>Sharing data giữa các futures cũng sẽ quen thuộc: chúng ta sẽ sử dụng message passing, nhưng lần này với các versions async của các types và functions. Chúng ta sẽ đi theo một con đường hơi khác so với phần "Transfer Data Between Threads with Message Passing" ở Chương 16 để minh họa một số khác biệt chính giữa concurrency dựa trên threads và dựa trên futures. Trong Listing 17-9, chúng ta sẽ bắt đầu chỉ với một async block—không spawn một task riêng như chúng ta spawn một thread riêng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let (tx, mut rx) = trpl::channel();

        let val = String::from("hi");
        tx.send(val).unwrap();

        let received = rx.recv().await.unwrap();
        println!("received '{received}'");</code></pre>
</div>
<p><em>Listing 17-9: Tạo một async channel và gán hai nửa cho tx và rx</em></p>

<p>Ở đây, chúng ta sử dụng trpl::channel, một version async của API multiple-producer, single-consumer channel mà chúng ta đã sử dụng với threads ở Chương 16. Version async của API chỉ hơi khác một chút so với version dựa trên threads: nó sử dụng một mutable receiver rx thay vì immutable, và method recv của nó tạo ra một future chúng ta cần await thay vì tạo ra giá trị trực tiếp. Bây giờ chúng ta có thể gửi messages từ sender đến receiver. Lưu ý rằng chúng ta không phải spawn một thread riêng hoặc thậm chí một task; chúng ta chỉ cần await lời gọi rx.recv.</p>

<p>Method đồng bộ Receiver::recv trong std::mpsc::channel block cho đến khi nó nhận được một message. Method trpl::Receiver::recv thì không, vì nó là async. Thay vì blocking, nó trao quyền điều khiển lại cho runtime cho đến khi một message được nhận hoặc phía gửi của channel đóng lại. Ngược lại, chúng ta không await lời gọi send, vì nó không block. Nó không cần phải, vì channel chúng ta gửi vào là unbounded.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Vì tất cả mã async này chạy trong một async block trong lời gọi trpl::block_on, mọi thứ trong đó có thể tránh blocking. Tuy nhiên, mã bên ngoài nó sẽ block trên việc block_on trả về. Đó là toàn bộ ý nghĩa của hàm trpl::block_on: nó cho phép bạn chọn nơi block trên một số mã async, và do đó nơi chuyển đổi giữa mã sync và async.
</div>

<p>Lưu ý hai điều về ví dụ này. Thứ nhất, message sẽ đến ngay lập tức. Thứ hai, mặc dù chúng ta sử dụng một future ở đây, chưa có concurrency nào. Mọi thứ trong listing xảy ra tuần tự, giống như không có futures nào liên quan.</p>

<p>Hãy giải quyết phần đầu tiên bằng cách gửi một loạt messages và sleep ở giữa chúng, như trong Listing 17-10.</p>

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
<p><em>Listing 17-10: Gửi và nhận nhiều messages qua async channel với await sleep giữa mỗi message</em></p>

<p>Ngoài việc gửi messages, chúng ta cần nhận chúng. Trong trường hợp này, vì chúng ta biết có bao nhiêu messages đến, chúng ta có thể làm điều đó thủ công bằng cách gọi rx.recv().await bốn lần. Tuy nhiên, trong thực tế, chúng ta thường sẽ đợi một số lượng messages không xác định, vì vậy chúng ta cần tiếp tục đợi cho đến khi xác định rằng không còn messages nào nữa.</p>

<p>Trong Listing 16-10, chúng ta sử dụng một vòng lặp for để xử lý tất cả các items nhận được từ một synchronous channel. Tuy nhiên, Rust chưa có cách sử dụng vòng lặp for với một series các items được tạo ra một cách async, vì vậy chúng ta cần sử dụng một vòng lặp chúng ta chưa thấy trước đây: vòng lặp conditional while let. Đây là phiên bản vòng lặp của cấu trúc if let mà chúng ta đã thấy trong phần "Concise Control Flow with if let and let...else" ở Chương 6. Vòng lặp sẽ tiếp tục thực thi miễn là pattern nó chỉ định tiếp tục khớp với giá trị.</p>

<p>Lời gọi rx.recv tạo ra một future, mà chúng ta await. Runtime sẽ tạm dừng future cho đến khi nó sẵn sàng. Khi một message đến, future sẽ resolve thành Some(message) bao nhiêu lần tùy thuộc vào số message đến. Khi channel đóng lại, bất kể có message nào đến hay không, future sẽ thay vào đó resolve thành None để chỉ ra rằng không còn giá trị nào và do đó chúng ta nên dừng polling—tức là, dừng awaiting.</p>

<p>Vòng lặp while let kết hợp tất cả những điều này. Nếu kết quả của việc gọi rx.recv().await là Some(message), chúng ta có quyền truy cập vào message và chúng ta có thể sử dụng nó trong loop body, giống như với if let. Nếu kết quả là None, vòng lặp kết thúc. Mỗi khi vòng lặp hoàn thành, nó lại đến điểm await, vì vậy runtime tạm dừng nó cho đến khi một message khác đến.</p>

<p>Mã bây giờ gửi và nhận thành công tất cả các messages. Thật không may, vẫn có một vài vấn đề. Một là, các messages không đến theo khoảng nửa giây. Chúng đến tất cả cùng lúc, 2 giây (2.000 mili giây) sau khi chúng ta bắt đầu chương trình. Một vấn đề khác là, chương trình này cũng không bao giờ thoát! Thay vào đó, nó đợi vô thời hạn các messages mới. Bạn sẽ cần tắt nó bằng ctrl-C.</p>

<h3 class="task-heading">Code Trong Một Async Block Thực Thi Theo Thứ tự Tuyến tính</h3>
<p>Hãy bắt đầu bằng việc kiểm tra tại sao các messages đến tất cả cùng lúc sau độ trễ đầy đủ, thay vì đến với độ trễ giữa mỗi cái. Trong một async block nhất định, thứ tự xuất hiện của các từ khóa await trong code cũng là thứ tự chúng được thực thi khi chương trình chạy.</p>

<p>Chỉ có một async block trong Listing 17-10, vì vậy mọi thứ trong đó chạy tuyến tính. Vẫn chưa có concurrency. Tất cả các lời gọi tx.send xảy ra, xen kẽ với tất cả các lời gọi trpl::sleep và các điểm await liên quan của chúng. Chỉ sau đó vòng lặp while let mới được đi qua bất kỳ điểm await nào trên các lời gọi recv.</p>

<p>Để có được hành vi chúng ta muốn, nơi sleep delay xảy ra giữa mỗi message, chúng ta cần đặt các operations tx và rx trong các async blocks riêng biệt của chúng, như trong Listing 17-11. Sau đó runtime có thể thực thi từng cái riêng biệt sử dụng trpl::join, giống như trong Listing 17-8. Một lần nữa, chúng ta await kết quả của việc gọi trpl::join, không phải các futures riêng lẻ. Nếu chúng ta await các futures riêng lẻ theo tuần tự, chúng ta sẽ kết thúc lại trong một luồng tuần tự—chính xác là điều chúng ta đang cố không làm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let tx_fut = async {
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
        };

        let rx_fut = async {
            while let Some(value) = rx.recv().await {
                println!("received '{value}'");
            }
        };

        trpl::join(tx_fut, rx_fut).await;</code></pre>
</div>
<p><em>Listing 17-11: Tách send và recv thành các async blocks riêng biệt và awaiting các futures cho các blocks đó</em></p>

<p>Với code cập nhật trong Listing 17-11, các messages được in ra theo khoảng 500 mili giây, thay vì tất cả cùng lúc sau 2 giây.</p>

<h3 class="task-heading">Di chuyển Ownership Vào Một Async Block</h3>
<p>Tuy nhiên, chương trình vẫn không bao giờ thoát, vì cách vòng lặp while let tương tác với trpl::join:</p>
<ul>
    <li>Future được trả về từ trpl::join chỉ hoàn thành một khi cả hai futures truyền cho nó đã hoàn thành.</li>
    <li>Future tx_fut hoàn thành một khi nó hoàn thành việc sleep sau khi gửi message cuối cùng trong vals.</li>
    <li>Future rx_fut sẽ không hoàn thành cho đến khi vòng lặp while let kết thúc.</li>
    <li>Vòng lặp while let sẽ không kết thúc cho đến khi awaiting rx.recv tạo ra None.</li>
    <li>Awaiting rx.recv sẽ trả về None chỉ khi đầu kia của channel đóng lại.</li>
    <li>Channel sẽ đóng lại chỉ khi chúng ta gọi rx.close hoặc khi phía gửi, tx, được dropped.</li>
    <li>Chúng ta không gọi rx.close ở bất kỳ đâu, và tx sẽ không được dropped cho đến khi async block outermost truyền cho trpl::block_on kết thúc.</li>
    <li>Block không thể kết thúc vì nó đang blocked trên việc trpl::join hoàn thành, đưa chúng ta quay lại đầu danh sách này.</li>
</ul>

<p>Hiện tại, async block nơi chúng ta gửi các messages chỉ borrow tx vì việc gửi một message không yêu cầu ownership, nhưng nếu chúng ta có thể move tx vào async block đó, nó sẽ được dropped một khi block đó kết thúc. Trong phần "Capturing References or Moving Ownership" ở Chương 13, bạn đã học cách sử dụng từ khóa move với closures, và, như đã thảo luận trong phần "Using move Closures with Threads" ở Chương 16, chúng ta thường cần move data vào closures khi làm việc với threads. Động lực cơ bản tương tự áp dụng cho async blocks, vì vậy từ khóa move hoạt động với async blocks giống như với closures.</p>

<p>Trong Listing 17-12, chúng ta thay đổi block được sử dụng để gửi messages từ async thành async move.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let (tx, mut rx) = trpl::channel();

        let tx_fut = async move {
            // --snip--
        };</code></pre>
</div>
<p><em>Listing 17-12: Sửa đổi code từ Listing 17-11 để shutdown đúng cách khi hoàn thành</em></p>

<p>Khi chạy phiên bản này của code, nó shutdown một cách graceful sau khi message cuối cùng được gửi và nhận. Tiếp theo, hãy xem điều gì cần thay đổi để gửi data từ nhiều hơn một future.</p>

<h3 class="task-heading">Join Nhiều Futures với join! Macro</h3>
<p>Async channel này cũng là một multiple-producer channel, vì vậy chúng ta có thể gọi clone trên tx nếu chúng ta muốn gửi messages từ nhiều futures, như trong Listing 17-13.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let (tx, mut rx) = trpl::channel();

        let tx1 = tx.clone();
        let tx1_fut = async move {
            let vals = vec![
                String::from("hi"),
                String::from("from"),
                String::from("the"),
                String::from("future"),
            ];

            for val in vals {
                tx1.send(val).unwrap();
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let rx_fut = async {
            while let Some(value) = rx.recv().await {
                println!("received '{value}'");
            }
        };

        let tx_fut = async move {
            let vals = vec![
                String::from("more"),
                String::from("messages"),
                String::from("for"),
                String::from("you"),
            ];

            for val in vals {
                tx.send(val).unwrap();
                trpl::sleep(Duration::from_millis(1500)).await;
            }
        };

        trpl::join!(tx1_fut, tx_fut, rx_fut);</code></pre>
</div>
<p><em>Listing 17-13: Sử dụng nhiều producers với async blocks</em></p>

<p>Đầu tiên, chúng ta clone tx, tạo tx1 bên ngoài async block đầu tiên. Chúng ta move tx1 vào block đó giống như chúng ta đã làm với tx trước đó. Sau đó, sau đó, chúng ta move tx gốc vào một async block mới, nơi chúng ta gửi thêm messages với độ trễ hơi chậm hơn. Chúng ta tình cờ đặt async block mới này sau async block để nhận messages, nhưng nó có thể đứng trước cũng được. Điểm quan trọng là thứ tự các futures được await, không phải thứ tự chúng được tạo.</p>

<p>Cả hai async blocks để gửi messages cần là async move blocks để cả tx và tx1 đều được dropped khi các blocks đó kết thúc. Nếu không, chúng ta sẽ kết thúc trong cùng một vòng lặp vô hạn mà chúng ta bắt đầu.</p>

<p>Cuối cùng, chúng ta chuyển từ trpl::join sang trpl::join! để xử lý future bổ sung: macro join! awaits một số lượng tùy ý của futures nơi chúng ta biết số lượng futures tại thời điểm biên dịch. Chúng ta sẽ thảo luận về việc awaiting một collection với số lượng futures không xác định sau trong chương.</p>

<p>Bây giờ chúng ta thấy tất cả messages từ cả hai sending futures, và vì các sending futures sử dụng độ trễ hơi khác nhau sau khi gửi, các messages cũng được nhận ở các khoảng khác nhau:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>received 'hi'
received 'more'
received 'from'
received 'the'
received 'messages'
received 'future'
received 'for'
received 'you'</code></pre>
</div>

<p>Chúng ta đã khám phá cách sử dụng message passing để gửi data giữa các futures, cách code trong một async block chạy tuần tự, cách move ownership vào một async block, và cách join nhiều futures. Tiếp theo, hãy thảo luận về cách và tại sao nói cho runtime biết nó có thể chuyển sang task khác.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Async Concurrency:</strong>
  <ul>
    <li><strong>spawn_task</strong> - Tạo task mới (giống thread::spawn)</li>
    <li><strong>join</strong> - Đợi tất cả futures hoàn thành</li>
    <li><strong>select</strong> - Race futures, lấy cái nào xong trước</li>
    <li><strong>channel</strong> - Async message passing</li>
    <li><strong>async move</strong> - Di chuyển ownership vào async block</li>
    <li><strong>join!</strong> - Macro để join nhiều futures</li>
    <li><strong>Fair</strong> - Join kiểm tra mỗi future equally often</li>
    <li><strong>Polling</strong> - Quá trình kiểm tra xem future đã sẵn sàng chưa</li>
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
    println!("3. select     - Race futures, lấy cái nào xong trước");
    println!("4. channel    - Async message passing");
    println!("5. async move - Di chuyển ownership vào async block");
    println!("6. join!      - Macro để join nhiều futures");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Async Concurrency Concepts ===

1. spawn_task - Tạo task mới (giống thread::spawn)
2. join       - Đợi tất cả futures hoàn thành
3. select     - Race futures, lấy cái nào xong trước
4. channel    - Async message passing
5. async move - Di chuyển ownership vào async block
6. join!      - Macro để join nhiều futures

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
