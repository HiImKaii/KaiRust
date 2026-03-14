import { Lesson } from '../../courses';

export const ch17_01: Lesson = {
            id: 'ch17-01',
            title: '17.1 Futures và Cú Pháp Async',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Các yếu tố chính của lập trình bất đồng bộ trong Rust là futures và các từ khóa async và await của Rust.</p>

<h3 class="task-heading">Futures là gì?</h3>
<p>Một future là một giá trị có thể chưa sẵn sàng ngay bây giờ nhưng sẽ trở nên sẵn sàng tại một thời điểm nào đó trong tương lai. (Khái niệm tương tự xuất hiện trong nhiều ngôn ngữ khác, đôi khi với các tên khác như task hoặc promise.) Rust cung cấp một Future trait như một khối xây dựng (building block) để các thao tác bất đồng bộ khác nhau có thể được triển khai với các cấu trúc dữ liệu khác nhau nhưng với một interface chung. Trong Rust, futures là các types implement Future trait. Mỗi future giữ thông tin riêng của nó về tiến độ đã được thực hiện và "ready" có nghĩa là gì.</p>

<h3 class="task-heading">Async và Await</h3>
<p>Bạn có thể áp dụng từ khóa async vào các blocks và functions để chỉ định rằng chúng có thể bị gián đoạn và tiếp tục. Trong một async block hoặc async function, bạn có thể sử dụng từ khóa await để đợi một future (tức là, đợi cho nó trở nên sẵn sàng). Bất kỳ điểm nào bạn await một future trong một async block hoặc function là một vị trí tiềm năng để block hoặc function đó tạm dừng và tiếp tục. Quá trình kiểm tra với một future để xem giá trị của nó đã có sẵn chưa được gọi là polling.</p>

<p>Một số ngôn ngữ khác, như C# và JavaScript, cũng sử dụng các từ khóa async và await cho lập trình bất đồng bộ. Nếu bạn quen thuộc với những ngôn ngữ đó, bạn có thể nhận thấy một số khác biệt đáng kể trong cách Rust xử lý cú pháp. Đó là có lý do, như chúng ta sẽ thấy!</p>

<p>Khi viết async Rust, chúng ta sử dụng các từ khóa async và await hầu hết thời gian. Rust biên dịch chúng thành mã tương đương sử dụng Future trait, giống như nó biên dịch for loops thành mã tương đương sử dụng Iterator trait. Tuy nhiên, vì Rust cung cấp Future trait, bạn cũng có thể triển khai nó cho các data types của riêng mình khi cần. Nhiều hàm mà chúng ta sẽ thấy trong suốt chương này trả về các types với các triển khai Future riêng của chúng. Chúng ta sẽ quay lại định nghĩa của trait ở cuối chương và đào sâu hơn vào cách nó hoạt động, nhưng đây là đủ chi tiết để tiếp tục.</p>

<p>Tất cả điều này có thể cảm thấy hơi trừu tượng, vì vậy hãy viết chương trình async đầu tiên của chúng ta: một công cụ web scraper nhỏ. Chúng ta sẽ truyền vào hai URLs từ command line, fetch cả hai cùng lúc, và trả về kết quả của cái nào hoàn thành trước. Ví dụ này sẽ có một chút cú pháp mới, nhưng đừng lo—chúng ta sẽ giải thích mọi thứ bạn cần biết khi đi.</p>

<h3 class="task-heading">Chương Trình Async Đầu Tiên</h3>
<p>Để giữ trọng tâm của chương này là học async thay vì juggling các phần của hệ sinh thái, chúng ta đã tạo ra crate trpl (trpl là viết tắt của "The Rust Programming Language"). Nó re-export tất cả các types, traits, và functions bạn cần, chủ yếu từ các crates futures và tokio. Crate futures là nơi chính thức để Rust thử nghiệm cho mã async, và thực tế đó là nơi Future trait được thiết kế ban đầu. Tokio là async runtime được sử dụng rộng rãi nhất trong Rust hiện nay, đặc biệt cho các ứng dụng web. Có những runtimes tuyệt vời khác ngoài kia, và chúng có thể phù hợp hơn cho mục đích của bạn. Chúng ta sử dụng crate tokio ở dưới lớp cho trpl vì nó được kiểm tra kỹ lưỡng và được sử dụng rộng rãi.</p>

<p>Trong một số trường hợp, trpl cũng đổi tên hoặc bọc các APIs gốc để giữ bạn tập trung vào các chi tiết liên quan đến chương này. Nếu bạn muốn hiểu crate đó làm gì, chúng tôi khuyến khích bạn xem mã nguồn của nó. Bạn sẽ có thể thấy crate nào mỗi re-export đến từ, và chúng tôi đã để lại các bình luận giải thích rõ ràng.</p>

<p>Tạo một binary project mới tên là hello-async và thêm crate trpl như một dependency:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello-async
$ cd hello-async
$ cargo add trpl</code></pre>
</div>

<p>Bây giờ chúng ta có thể sử dụng các thành phần khác nhau được cung cấp bởi trpl để viết chương trình async đầu tiên. Chúng ta sẽ xây dựng một công cụ command line nhỏ fetch hai trang web, lấy phần tử &lt;title&gt; từ mỗi trang, và in ra title của trang nào hoàn thành toàn bộ quá trình đó trước.</p>

<h3 class="task-heading">Định nghĩa Hàm page_title</h3>
<p>Hãy bắt đầu bằng cách viết một hàm nhận một URL của trang làm tham số, thực hiện request đến nó, và trả về text của phần tử &lt;title&gt; (xem Listing 17-1).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use trpl::Html;

async fn page_title(url: &str) -> Option&lt;String&gt; {
    let response = trpl::get(url).await;
    let response_text = response.text().await;
    Html::parse(&response_text)
        .select_first("title")
        .map(|title| title.inner_html())
}</code></pre>
</div>
<p><em>Listing 17-1: Định nghĩa một async function để lấy phần tử title từ một trang HTML</em></p>

<p>Đầu tiên, chúng ta định nghĩa một hàm tên là page_title và đánh dấu nó với từ khóa async. Sau đó chúng ta sử dụng hàm trpl::get để fetch URL được truyền vào và thêm từ khóa await để đợi response. Để lấy text của response, chúng ta gọi method text của nó và một lần nữa await nó với từ khóa await. Cả hai bước này đều là bất đồng bộ. Với hàm get, chúng ta phải đợi server gửi lại phần đầu tiên của response, sẽ bao gồm HTTP headers, cookies, v.v. và có thể được gửi riêng biệt với response body. Đặc biệt nếu body rất lớn, có thể mất một thời gian để tất cả đến. Vì chúng ta phải đợi toàn bộ response đến, method text cũng là async.</p>

<p>Chúng ta phải explicitly await cả hai futures này, bởi vì futures trong Rust là lazy: chúng không làm gì cho đến khi bạn ask chúng với từ khóa await. (Thực tế, Rust sẽ hiển thị một compiler warning nếu bạn không sử dụng một future.) Điều này có thể nhắc bạn về việc thảo luận về iterators trong phần "Processing a Series of Items with Iterators" ở Chương 13. Iterators không làm gì trừ khi bạn gọi method next của chúng—trực tiếp hoặc bằng cách sử dụng for loops hoặc các methods như map sử dụng next ở bên dưới. Tương tự, futures không làm gì trừ khi bạn explicitly ask chúng. Sự lười biếng này cho phép Rust tránh chạy mã async cho đến khi nó thực sự cần thiết.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Điều này khác với behavior chúng ta thấy khi sử dụng thread::spawn trong phần "Creating a New Thread with spawn" ở Chương 16, nơi closure chúng ta passed sang một thread khác bắt đầu chạy ngay lập tức. Nó cũng khác với cách nhiều ngôn ngữ khác tiếp cận async. Nhưng điều quan trọng là Rust có thể cung cấp các đảm bảo hiệu suất của nó, cũng như với iterators.
</div>

<p>Khi chúng ta có response_text, chúng ta có thể parse nó thành một instance của kiểu Html bằng Html::parse. Thay vì một raw string, bây giờ chúng ta có một kiểu dữ liệu chúng ta có thể sử dụng để làm việc với HTML như một cấu trúc dữ liệu phong phú hơn. Cụ thể, chúng ta có thể sử dụng method select_first để tìm instance đầu tiên của một CSS selector nhất định. Bằng cách truyền chuỗi "title", chúng ta sẽ nhận được phần tử &lt;title&gt; đầu tiên trong tài liệu, nếu có. Vì có thể không có phần tử nào khớp, select_first trả về Option&lt;ElementRef&gt;. Cuối cùng, chúng ta sử dụng method Option::map, cho phép chúng ta làm việc với item trong Option nếu nó present, và không làm gì nếu không. (Chúng ta cũng có thể sử dụng một match expression ở đây, nhưng map là idiomatic hơn.) Trong body của hàm chúng ta cung cấp cho map, chúng ta gọi inner_html trên title để lấy content của nó, là một String. Khi tất cả được nói và làm, chúng ta có một Option&lt;String&gt;.</p>

<p>Lưu ý rằng từ khóa await của Rust đi sau expression bạn đang await, không phải trước nó. Tức là, nó là một postfix keyword. Điều này có thể khác với những gì bạn quen nếu bạn đã sử dụng async trong các ngôn ngữ khác, nhưng trong Rust nó làm cho các chains của các methods dễ làm việc hơn nhiều. Kết quả là, chúng ta có thể thay đổi body của page_title để chain các lời gọi hàm trpl::get và text lại với nhau với await ở giữa, như trong Listing 17-2.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    let response_text = trpl::get(url).await.text().await;</code></pre>
</div>
<p><em>Listing 17-2: Chaining với từ khóa await</em></p>

<p>Với điều đó, chúng ta đã viết thành công async function đầu tiên! Trước khi thêm một số mã trong main để gọi nó, hãy nói thêm một chút về những gì chúng ta đã viết và ý nghĩa của nó.</p>

<h3 class="task-heading">Async Functions</h3>
<p>Khi Rust thấy một block được đánh dấu với từ khóa async, nó biên dịch nó thành một unique, anonymous data type implement Future trait. Khi Rust thấy một function được đánh dấu với async, nó biên dịch nó thành một non-async function có body là một async block. Return type của một async function là type của anonymous data type mà compiler tạo cho async block đó.</p>

<p>Như vậy, viết async fn tương đương với việc viết một function trả về một future của return type. Đối với compiler, một định nghĩa function như async fn page_title trong Listing 17-1 về cơ bản tương đương với một non-async function được định nghĩa như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::future::Future;
use trpl::Html;

fn page_title(url: &str) -> impl Future&lt;Output = Option&lt;String&gt;&gt; {
    async move {
        let text = trpl::get(url).await.text().await;
        Html::parse(&text)
            .select_first("title")
            .map(|title| title.inner_html())
    }
}</code></pre>
</div>

<p>Hãy đi qua từng phần của phiên bản đã được chuyển đổi:</p>
<ul>
    <li>Nó sử dụng syntax impl Trait mà chúng ta đã thảo luận ở Chương 10 trong phần "Traits as Parameters".</li>
    <li>Giá trị được trả về implement Future trait với một associated type là Output. Lưu ý rằng Output type là Option&lt;String&gt;, giống như return type gốc từ async fn version của page_title.</li>
    <li>Tất cả code được gọi trong body của function gốc được bọc trong một async move block. Nhớ rằng blocks là expressions. Toàn bộ block này là expression được trả về từ function.</li>
    <li>Async block này tạo ra một giá trị với type Option&lt;String&gt;, như vừa mô tả. Giá trị đó khớp với Output type trong return type. Điều này giống như các blocks khác bạn đã thấy.</li>
    <li>Function body mới là một async move block bởi vì cách nó sử dụng tham số url. (Chúng ta sẽ nói nhiều hơn về async so với async move sau trong chương.)</li>
</ul>

<p>Bây giờ chúng ta có thể gọi page_title trong main.</p>

<h3 class="task-heading">Thực thi một Async Function với Runtime</h3>
<p>Để bắt đầu, chúng ta sẽ lấy title cho một trang đơn, được hiển thị trong Listing 17-3. Thật không may, mã này chưa biên dịch được.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
async fn main() {
    let args: Vec&lt;String&gt; = std::env::args().collect();
    let url = &args[1];
    match page_title(url).await {
        Some(title) => println!("The title for {url} was {title}"),
        None => println!("{url} had no title"),
    }
}</code></pre>
</div>
<p><em>Listing 17-3: Gọi hàm page_title từ main với tham số từ người dùng</em></p>

<p>Chúng ta theo cùng pattern chúng ta đã sử dụng để lấy command line arguments trong phần "Accepting Command Line Arguments" ở Chương 12. Sau đó chúng ta truyền URL argument cho page_title và await kết quả. Vì giá trị được tạo bởi future là một Option&lt;String&gt;, chúng ta sử dụng một match expression để in các messages khác nhau để tính đến việc liệu trang có &lt;title&gt; hay không.</p>

<p>Chỗ duy nhất chúng ta có thể sử dụng từ khóa await là trong các async functions hoặc blocks, và Rust sẽ không cho phép chúng ta đánh dấu function main đặc biệt là async.</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>error[E0752]: \`main\` function is not allowed to be \`async\`
 --> src/main.rs:6:1
  |
6 | async fn main() {
  | ^^^^^^^^^^^^^^^ \`main\` function is not allowed to be \`async\`

The reason main can't be marked async is that async code needs a runtime: a Rust crate that manages the details of executing asynchronous code. A program's main function can initialize a runtime, but it's not a runtime itself. (We'll see more about why this is the case in a bit.) Every Rust program that executes async code has at least one place where it sets up a runtime that executes the futures.</code></pre>
</div>

<p>Lý do main không thể được đánh dấu async là vì mã async cần một runtime: một Rust crate quản lý các chi tiết của việc thực thi mã bất đồng bộ. Function main của chương trình có thể khởi tạo một runtime, nhưng bản thân nó không phải là một runtime. (Chúng ta sẽ xem thêm về lý do tại sao điều này là trường hợp.) Mọi chương trình Rust thực thi mã async có ít nhất một nơi nó thiết lập một runtime thực thi các futures.</p>

<p>Hầu hết các ngôn ngữ hỗ trợ async bundle một runtime, nhưng Rust thì không. Thay vào đó, có nhiều async runtimes khác nhau available, mỗi cái đưa ra các trade-offs khác nhau phù hợp với use case nó nhắm đến. Ví dụ, một web server throughput cao với nhiều CPU cores và một lượng RAM lớn có nhu cầu rất khác với một microcontroller với một core đơn, một lượng RAM nhỏ, và không có khả năng cấp phát heap. Các crates cung cấp những runtimes đó cũng thường cung cấp các phiên bản async của các chức năng phổ biến như file hoặc network I/O.</p>

<p>Ở đây, và trong suốt phần còn lại của chương này, chúng ta sẽ sử dụng hàm block_on từ crate trpl, nhận một future làm argument và block current thread cho đến khi future này chạy đến completion. Ở hậu trường, việc gọi block_on thiết lập một runtime sử dụng crate tokio được dùng để chạy future được truyền vào (hành vi block_on của crate trpl tương tự như các hàm block_on của các runtime crates khác). Khi future hoàn thành, block_on trả về bất cứ giá trị nào future tạo ra.</p>

<p>Chúng ta có thể truyền future được trả về bởi page_title trực tiếp cho block_on và, một khi nó hoàn thành, chúng ta có thể match trên Option&lt;String&gt; kết quả như chúng ta đã cố làm trong Listing 17-3. Tuy nhiên, cho hầu hết các ví dụ trong chương (và hầu hết mã async trong thực tế), chúng ta sẽ làm nhiều hơn chỉ một lời gọi async function, vì vậy thay vào đó chúng ta sẽ truyền một async block và explicitly await kết quả của lời gọi page_title, như trong Listing 17-4.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = std::env::args().collect();

    trpl::block_on(async {
        let url = &args[1];
        match page_title(url).await {
            Some(title) => println!("The title for {url} was {title}"),
            None => println!("{url} had no title"),
        }
    })
}</code></pre>
</div>
<p><em>Listing 17-4: Awaiting một async block với trpl::block_on</em></p>

<p>Khi chúng ta chạy mã này, chúng ta nhận được behavior chúng ta mong đợi ban đầu:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run -- "https://www.rust-lang.org"
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.05s
     Running \`target/debug/async_await 'https://www.rust-lang.org'\`
The title for https://www.rust-lang.org was
            Rust Programming Language</code></pre>
</div>

<p>Cuối cùng—chúng ta đã có một số mã async hoạt động! Nhưng trước khi thêm mã để đua hai sites với nhau, hãy nói ngắn gọn về cách futures hoạt động.</p>

<p>Mỗi điểm await—tức là mọi nơi mã sử dụng từ khóa await—đại diện cho một nơi quyền điều khiển được trao lại cho runtime. Để làm điều đó, Rust cần theo dõi trạng thái liên quan trong async block để runtime có thể bắt đầu một số công việc khác và sau đó quay lại khi nó sẵn sàng để thử tiến triển cái đầu tiên một lần nữa. Đây là một state machine vô hình, như thể bạn đã viết một enum như thế này để lưu trạng thái hiện tại tại mỗi điểm await:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum PageTitleFuture&lt;'a&gt; {
    Initial { url: &'a str },
    GetAwaitPoint { url: &'a str },
    TextAwaitPoint { response: trpl::Response },
}</code></pre>
</div>

<p>Tuy nhiên, việc viết mã để chuyển đổi giữa mỗi trạng thái bằng tay sẽ tẻ nhạt và dễ xảy ra lỗi, đặc biệt khi bạn cần thêm nhiều chức năng và nhiều trạng thái hơn vào mã sau này. May mắn thay, compiler Rust tự động tạo và quản lý các cấu trúc dữ liệu state machine cho mã async. Các quy tắc borrowing và ownership bình thường xung quanh các cấu trúc dữ liệu vẫn áp dụng, và vui mừng thay, compiler cũng xử lý việc kiểm tra những thứ đó cho chúng ta và cung cấp các thông báo lỗi hữu ích. Chúng ta sẽ làm việc qua một số trong số đó sau trong chương.</p>

<p>Cuối cùng, một cái gì đó phải thực thi state machine này, và cái đó là một runtime. (Đây là lý do bạn có thể bắt gặp các đề cập đến executors khi tìm hiểu về runtimes: một executor là phần của runtime chịu trách nhiệm thực thi mã async.)</p>

<p>Bây giờ bạn có thể thấy tại sao compiler đã ngăn chúng ta tạo main chính nó là một async function trở lại trong Listing 17-3. Nếu main là một async function, một cái gì đó khác sẽ cần quản lý state machine cho bất kỳ future nào mà main trả về, nhưng main là điểm bắt đầu cho chương trình! Thay vào đó, chúng ta gọi hàm trpl::block_on trong main để thiết lập một runtime và chạy future được trả về bởi async block cho đến khi nó hoàn thành.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Một số runtimes cung cấp macros để bạn có thể viết một async main function. Các macros đó viết lại async fn main() { ... } thành một fn main bình thường, làm điều tương tự như chúng ta đã làm bằng tay trong Listing 17-4: gọi một hàm chạy một future đến completion theo cách block_on của trpl.
</div>

<p>Bây giờ hãy kết hợp các mảnh này lại và xem chúng ta có thể viết mã đồng thời như thế nào.</p>

<h3 class="task-heading">Đua Hai URLs Với Nhau</h3>
<p>Trong Listing 17-5, chúng ta gọi page_title với hai URLs khác nhau từ command line và đua chúng bằng cách chọn future nào hoàn thành trước.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use trpl::{Either, Html};

fn main() {
    let args: Vec&lt;String&gt; = std::env::args().collect();

    trpl::block_on(async {
        let title_fut_1 = page_title(&args[1]);
        let title_fut_2 = page_title(&args[2]);

        let (url, maybe_title) =
            match trpl::select(title_fut_1, title_fut_2).await {
                Either::Left(left) => left,
                Either::Right(right) => right,
            };

        println!("{url} returned first");
        match maybe_title {
            Some(title) => println!("Its page title was: '{title}'"),
            None => println!("It had no title."),
        }
    })
}

async fn page_title(url: &str) -> (&str, Option&lt;String&gt;) {
    let response_text = trpl::get(url).await.text().await;
    let title = Html::parse(&response_text)
        .select_first("title")
        .map(|title| title.inner_html());
    (url, title)
}</code></pre>
</div>
<p><em>Listing 17-5: Gọi page_title cho hai URLs để xem cái nào trả về trước</em></p>

<p>Chúng ta bắt đầu bằng cách gọi page_title cho mỗi URL được cung cấp bởi người dùng. Chúng ta lưu các futures kết quả là title_fut_1 và title_fut_2. Nhớ rằng, những cái này không làm gì cả, vì futures là lazy và chúng ta chưa await chúng. Sau đó chúng ta truyền các futures cho trpl::select, trả về một giá trị để chỉ ra futures nào truyền cho nó hoàn thành trước.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Ở hậu trường, trpl::select được xây dựng trên một hàm select tổng quát hơn được định nghĩa trong crate futures. Hàm select của futures crate có thể làm nhiều thứ mà hàm trpl::select không thể, nhưng nó cũng có một số phức tạp bổ sung mà chúng ta có thể bỏ qua bây giờ.
</div>

<p>Cả hai futures đều có thể "thắng" một cách hợp lệ, vì vậy việc trả về một Result không có ý nghĩa. Thay vào đó, trpl::select trả về một type chúng ta chưa thấy trước đây, trpl::Either. Type Either hơi giống với Result ở chỗ nó có hai cases. Tuy nhiên, không giống như Result, không có khái niệm success hay failure được tích hợp vào Either. Thay vào đó, nó sử dụng Left và Right để chỉ "một hoặc cái khác":</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Either&lt;A, B&gt; {
    Left(A),
    Right(B),
}</code></pre>
</div>

<p>Hàm select trả về Left với output của future đó nếu argument đầu tiên thắng, và Right với output của argument future thứ hai nếu cái đó thắng. Điều này khớp với thứ tự các arguments xuất hiện khi gọi hàm: argument đầu tiên ở bên trái của argument thứ hai.</p>

<p>Chúng ta cũng cập nhật page_title để trả về cùng URL được truyền vào. Bằng cách đó, nếu trang trả về trước không có &lt;title&gt; mà chúng ta có thể resolve, chúng ta vẫn có thể in một message có ý nghĩa. Với thông tin đó có sẵn, chúng ta kết thúc bằng cách cập nhật output của println! để chỉ ra cả URL nào hoàn thành trước và, nếu có, &lt;title&gt; là gì cho trang web tại URL đó.</p>

<p>Bạn đã xây dựng một web scraper nhỏ hoạt động! Chọn một vài URLs và chạy công cụ command line. Bạn có thể thấy một số sites nhất quán nhanh hơn những sites khác, trong khi ở những trường hợp khác, site nhanh hơn thay đổi từ lần chạy này sang lần chạy khác. Quan trọng hơn, bạn đã học những cơ bản của việc làm việc với futures, vì vậy bây giờ chúng ta có thể đào sâu hơn vào những gì chúng ta có thể làm với async.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Futures và Async:</strong>
  <ul>
    <li><strong>Future</strong> - Giá trị có thể chưa sẵn sàng nhưng sẽ trở nên sẵn sàng trong tương lai</li>
    <li><strong>async fn</strong> - Function trả về Future</li>
    <li><strong>await</strong> - Đợi Future hoàn thành (non-blocking)</li>
    <li><strong>Lazy</strong> - Futures không làm gì cho đến khi được await</li>
    <li><strong>Runtime</strong> - Cần runtime như Tokio để chạy mã async</li>
    <li><strong>block_on</strong> - Block thread cho đến khi Future hoàn thành</li>
    <li><strong>select</strong> - Đua nhiều futures, lấy cái hoàn thành trước</li>
    <li><strong>Either</strong> - Type để represent kết quả của select</li>
    <li><strong>Polling</strong> - Quá trình kiểm tra xem future đã sẵn sàng chưa</li>
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
