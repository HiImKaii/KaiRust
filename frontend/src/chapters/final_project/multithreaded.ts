import { Lesson } from '../../courses';

export const multithreaded: Lesson = {
            id: 'final-project-02',
            title: 'Từ Server Đơn Luồng đến Server Đa Luồng',
            duration: '75 phút',
            type: 'theory',
            content: `
<p>Ngay bây giờ, server sẽ xử lý mỗi request lần lượt, có nghĩa là nó sẽ không xử lý connection thứ hai cho đến khi connection đầu tiên hoàn tất xử lý. Nếu server nhận được nhiều requests hơn, việc thực thi tuần tự này sẽ ngày càng không tối ưu. Nếu server nhận được một request mà mất thời gian dài để xử lý, các requests tiếp theo sẽ phải đợi cho đến khi request dài hoàn tất, ngay cả khi các requests mới có thể được xử lý nhanh chóng. Chúng ta sẽ cần sửa điều này, nhưng trước tiên chúng ta sẽ xem vấn đề này trong thực tế.</p>

<h3 class="task-heading">Mô phỏng một Request Chậm</h3>
<p>Chúng ta sẽ xem xét cách một request xử lý chậm có thể ảnh hưởng đến các requests khác được thực hiện đến server hiện tại của chúng ta. Listing 21-10 implement việc xử lý một request đến /sleep với một response chậm được mô phỏng sẽ khiến server ngủ trong năm giây trước khi phản hồi.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
};

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, filename) = match &request_line[..] {
        "GET / HTTP/1.1" => ("HTTP/1.1 200 OK", "hello.html"),
        "GET /sleep HTTP/1.1" => {
            thread::sleep(Duration::from_secs(5));
            ("HTTP/1.1 200 OK", "hello.html")
        }
        _ => ("HTTP/1.1 404 NOT FOUND", "404.html"),
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}</code></pre>
</div>
<p><em>Listing 21-10: Mô phỏng một request chậm bằng cách ngủ trong năm giây</em></p>

<p>Chúng ta chuyển từ if sang match vì bây giờ có ba trường hợp. Chúng ta cần match rõ ràng trên một slice của request_line để pattern-match với các giá trị string literal; match không tự động referencing và dereferencing như method equality.</p>

<p>Arm đầu tiên giống như khối if từ Listing 21-9. Arm thứ hai khớp với một request đến /sleep. Khi request đó được nhận, server sẽ ngủ trong năm giây trước khi render trang HTML thành công. Arm thứ ba giống như khối else từ Listing 21-9.</p>

<p>Bạn có thể thấy server của chúng ta nguyên thủy như thế nào: Các thư viện thực sự sẽ xử lý việc nhận diện nhiều requests theo cách ít dài dòng hơn!</p>

<p>Khởi động server bằng cargo run. Sau đó, mở hai cửa sổ trình duyệt: một cho http://127.0.0.1:7878 và cái kia cho http://127.0.0.1:7878/sleep. Nếu bạn nhập URI / vài lần, như trước, bạn sẽ thấy nó phản hồi nhanh chóng. Nhưng nếu bạn nhập /sleep và sau đó load /, bạn sẽ thấy / phải đợi cho đến khi sleep ngủ đủ năm giây trước khi load.</p>

<p>Có nhiều kỹ thuật chúng ta có thể sử dụng để tránh requests bị chặn sau một request chậm, bao gồm việc sử dụng async như chúng ta đã làm trong Chương 17; cái chúng ta sẽ implement là một thread pool.</p>

<h3 class="task-heading">Cải thiện Throughput với Thread Pool</h3>
<p>Một thread pool là một nhóm các spawned threads đang sẵn sàng và đợi để xử lý một task. Khi chương trình nhận được một task mới, nó gán một trong các threads trong pool cho task đó, và thread đó sẽ xử lý task. Các threads còn lại trong pool có sẵn để xử lý bất kỳ tasks nào khác đến trong khi thread đầu tiên đang xử lý. Khi thread đầu tiên hoàn tất xử lý task của nó, nó được trả về pool của các idle threads, sẵn sàng để xử lý một task mới. Một thread pool cho phép bạn xử lý các connections đồng thời, tăng throughput của server của bạn.</p>

<p>Chúng ta sẽ giới hạn số lượng threads trong pool thành một số nhỏ để bảo vệ chúng ta khỏi các cuộc tấn công DoS; nếu chương trình tạo một thread mới cho mỗi request khi nó đến, ai đó thực hiện 10 triệu requests đến server của chúng ta có thể gây hỗn loạn bằng cách sử dụng hết tài nguyên của server và làm chậm việc xử lý requests.</p>

<p>Thay vì spawn các threads không giới hạn, chúng ta sẽ có một số lượng cố định các threads đợi trong pool. Các requests đến được gửi đến pool để xử lý. Pool sẽ duy trì một hàng đợi của các requests đến. Mỗi thread trong pool sẽ pop một request từ hàng đợi này, xử lý request, và sau đó yêu cầu hàng đợi một request khác. Với thiết kế này, chúng ta có thể xử lý đồng thời N requests, trong đó N là số lượng threads. Nếu mỗi thread đang phản hồi một request chạy dài, các requests tiếp theo vẫn có thể backup trong hàng đợi, nhưng chúng ta đã tăng số lượng long-running requests mà chúng ta có thể xử lý trước khi đến điểm đó.</p>

<p>Kỹ thuật này chỉ là một trong nhiều cách để cải thiện throughput của một web server. Các lựa chọn khác bạn có thể khám phá là mô hình fork/join, mô hình single-threaded async I/O, và mô hình multithreaded async I/O. Nếu bạn quan tâm đến chủ đề này, bạn có thể đọc thêm về các giải pháp khác và thử implement chúng; với một ngôn ngữ mức thấp như Rust, tất cả các lựa chọn này đều có thể.</p>

<p>Trước khi bắt đầu implement một thread pool, hãy nói về việc sử dụng pool trông như thế nào. Khi bạn đang cố gắng thiết kế code, việc viết client interface trước có thể giúp hướng dẫn thiết kế của bạn. Viết API của code theo cách bạn muốn gọi nó; sau đó, implement chức năng trong cấu trúc đó thay vì implement chức năng rồi thiết kế public API.</p>

<p>Tương tự như cách chúng ta sử dụng test-driven development trong project ở Chương 12, chúng ta sẽ sử dụng compiler-driven development ở đây. Chúng ta sẽ viết code gọi các functions mà chúng ta muốn, và sau đó chúng ta sẽ nhìn vào các lỗi từ compiler để xác định chúng ta nên thay đổi gì tiếp theo để code hoạt động.</p>

<h3 class="task-heading">Spawning một Thread cho Mỗi Request</h3>
<p>Trước tiên, hãy khám phá code của chúng ta có thể trông như thế nào nếu nó tạo một thread mới cho mỗi connection. Như đã đề cập trước đó, đây không phải là kế hoạch cuối cùng của chúng ta do các vấn đề với việc spawn một số lượng threads không giới hạn, nhưng nó là một điểm bắt đầu để có một server đa luồng hoạt động trước. Sau đó, chúng ta sẽ thêm thread pool như một cải tiến, và việc đối chiếu hai giải pháp sẽ dễ dàng hơn.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        thread::spawn(|| {
            handle_connection(stream);
        });
    }
}</code></pre>
</div>
<p><em>Listing 21-11: Spawn một thread mới cho mỗi stream</em></p>

<p>Như bạn đã học trong Chương 16, thread::spawn sẽ tạo một thread mới và sau đó chạy code trong closure trong thread mới. Nếu bạn chạy code này và load /sleep trong trình duyệt, sau đó / trong hai tabs trình duyệt khác, bạn sẽ thực sự thấy các requests đến / không phải đợi cho /sleep hoàn tất. Tuy nhiên, như chúng ta đã đề cập, điều này cuối cùng sẽ quá tải hệ thống vì bạn đang tạo các threads mới mà không có giới hạn.</p>

<p>Bạn cũng có thể nhớ từ Chương 17 rằng đây chính xác là loại tình huống mà async và await thực sự tỏa sáng! Giữ điều đó trong đầu khi chúng ta xây dựng thread pool và nghĩ về mọi thứ sẽ khác như thế nào hoặc giống như thế nào với async.</p>

<h3 class="task-heading">Tạo một Số Lượng Hữu hạn các Threads</h3>
<p>Chúng ta muốn thread pool của mình hoạt động theo cách tương tự và quen thuộc để việc chuyển từ threads sang thread pool không yêu cầu thay đổi lớn đối với code sử dụng API của chúng ta. Listing 21-12 cho thấy interface giả định cho struct ThreadPool mà chúng ta muốn sử dụng thay vì thread::spawn.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }
}</code></pre>
</div>
<p><em>Listing 21-12: Interface ThreadPool lý tưởng của chúng ta</em></p>

<p>Chúng ta sử dụng ThreadPool::new để tạo một thread pool mới với số lượng threads có thể cấu hình, trong trường hợp này là bốn. Sau đó, trong vòng for, pool.execute có interface tương tự như thread::spawn vì nó nhận một closure mà pool nên chạy cho mỗi stream. Chúng ta cần implement pool.execute để nó nhận closure và đưa nó cho một thread trong pool để chạy. Code này sẽ chưa biên dịch, nhưng chúng ta sẽ thử để compiler có thể hướng dẫn chúng ta sửa nó.</p>

<h3 class="task-heading">Xây dựng ThreadPool Sử dụng Compiler-Driven Development</h3>
<p>Thực hiện các thay đổi trong Listing 21-12 vào src/main.rs, và sau đó hãy sử dụng các lỗi compiler từ cargo check để phát triển. Đây là lỗi đầu tiên chúng ta nhận được:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
error[E0433]: failed to resolve: use of undeclared type \`ThreadPool\`
  --> src/main.rs:11:16
   |
11 |     let pool = ThreadPool::new(4);
   |                ^^^^^^^^^^ use of undeclared type \`ThreadPool\`</code></pre>
</div>

<p>Tuyệt vời! Lỗi này cho chúng ta biết chúng ta cần một type hoặc module ThreadPool, vì vậy chúng ta sẽ xây dựng một cái ngay bây giờ. Implementation ThreadPool của chúng ta sẽ độc lập với loại công việc mà web server đang làm. Vì vậy, hãy chuyển hello crate từ binary crate sang library crate để giữ Implementation ThreadPool của chúng ta.</p>

<p>Tạo file src/lib.rs chứa định nghĩa đơn giản nhất của struct ThreadPool mà chúng ta có thể có:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct ThreadPool;</code></pre>
</div>

<p>Sau đó, chỉnh sửa file main.rs để đưa ThreadPool vào scope từ library crate:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use hello::ThreadPool;</code></pre>
</div>

<p>Code này vẫn chưa hoạt động, nhưng hãy kiểm tra lại để lấy lỗi tiếp theo mà chúng ta cần giải quyết:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
error[E0599]: no function or associated item named \`new\` found for struct \`ThreadPool\`
  --> src/main.rs:12:28
   |
12 |     let pool = ThreadPool::new(4);
   |                            ^^^ function or associated item not found in \`ThreadPool\`</code></pre>
</div>

<p>Lỗi này chỉ ra rằng tiếp theo chúng ta cần tạo một associated function tên là new cho ThreadPool. Chúng ta cũng biết rằng new cần có một parameter có thể chấp nhận 4 làm argument và nên trả về một ThreadPool instance. Hãy implement function new đơn giản nhất có những đặc điểm đó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct ThreadPool;

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        ThreadPool
    }
}</code></pre>
</div>

<p>Chúng ta chọn usize làm kiểu của parameter size vì chúng ta biết một số âm của threads không có ý nghĩa. Chúng ta cũng biết chúng ta sẽ sử dụng 4 như số lượng elements trong một collection của threads, là những gì kiểu usize dành cho.</p>

<p>Hãy kiểm tra lại code:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
error[E0599]: no method named \`execute\` found for struct \`ThreadPool\`
  --> src/main.rs:17:14
   |
17 |         pool.execute(|| {
   |         -----^^^^^^^ method not found in \`ThreadPool\`</code></pre>
</div>

<p>Bây giờ lỗi xảy ra vì chúng ta không có method execute trên ThreadPool. Nhớ lại từ phần "Tạo một Số Lượng Hữu hạn các Threads" rằng chúng ta quyết định thread pool của mình nên có interface tương tự như thread::spawn. Ngoài ra, chúng ta sẽ implement function execute để nó nhận closure và đưa nó cho một idle thread trong pool để chạy.</p>

<p>Chúng ta sẽ định nghĩa method execute trên ThreadPool để nhận một closure như một parameter. Nhớ lại từ "Di chuyển Captured Values Out of Closures" trong Chương 13 rằng chúng ta có thể nhận closures như parameters với ba traits khác nhau: Fn, FnMut, và FnOnce. Chúng ta cần quyết định loại closure nào để sử dụng ở đây. Chúng ta biết chúng ta sẽ kết thúc làm điều gì đó tương tự như implementation thread::spawn của thư viện chuẩn, vì vậy chúng ta có thể xem các bounds mà signature của thread::spawn có trên parameter của nó. Tài liệu cho chúng ta thấy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn spawn&lt;F, T&gt;(f: F) -> JoinHandle&lt;T&gt;
    where
        F: FnOnce() -> T,
        F: Send + 'static,
        T: Send + 'static,</code></pre>
</div>

<p>Type parameter F là cái chúng ta quan tâm ở đây; type parameter T liên quan đến giá trị trả về, và chúng ta không quan tâm đến điều đó. Chúng ta có thể thấy rằng spawn sử dụng FnOnce làm trait bound trên F. Đây có lẽ cũng là những gì chúng ta muốn, vì cuối cùng chúng ta sẽ pass argument mà chúng ta nhận được trong execute cho spawn. Chúng ta có thể tự tin hơn rằng FnOnce là trait chúng ta muốn sử dụng vì thread để chạy một request sẽ chỉ thực thi closure của request đó một lần, khớp với Once trong FnOnce.</p>

<p>Type parameter F cũng có trait bound Send và lifetime bound 'static, hữu ích trong tình huống của chúng ta: Chúng ta cần Send để transfer closure từ một thread sang thread khác và 'static vì chúng ta không biết thread sẽ mất bao lâu để thực thi. Hãy tạo một method execute trên ThreadPool sẽ nhận một generic parameter kiểu F với những bounds này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl ThreadPool {
    pub fn execute&lt;F&gt;(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
    }
}</code></pre>
</div>

<p>Chúng ta vẫn sử dụng () sau FnOnce vì FnOnce này đại diện cho một closure không nhận parameters và trả về unit type (). Giống như function definitions, return type có thể được bỏ qua khỏi signature, nhưng ngay cả khi chúng ta không có parameters, chúng ta vẫn cần các dấu ngoặc đơn.</p>

<p>Một lần nữa, đây là implementation đơn giản nhất của method execute: Nó không làm gì cả, nhưng chúng ta chỉ đang cố gắng làm cho code của chúng ta biên dịch. Hãy kiểm tra:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.24s

It compiles!</code></pre>

<h3 class="task-heading">Xác thực Số Lượng Threads trong new</h3>
<p>Chúng ta không làm gì với các parameters cho new và execute. Hãy implement bodies của các functions này với behavior chúng ta muốn. Để bắt đầu, hãy nghĩ về new. Trước đó chúng ta đã chọn một unsigned type cho parameter size vì một pool với số âm của threads không có ý nghĩa. Tuy nhiên, một pool với zero threads cũng không có ý nghĩa, nhưng zero là một usize hoàn toàn hợp lệ. Chúng ta sẽ thêm code để kiểm tra size lớn hơn zero trước khi trả về một ThreadPool instance, và chúng ta sẽ làm chương trình panic nếu nó nhận được zero bằng cách sử dụng macro assert!:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        ThreadPool
    }
}</code></pre>
</div>
<p><em>Listing 21-13: Implement ThreadPool::new để panic nếu size bằng không</em></p>

<p>Chúng ta cũng đã thêm một số tài liệu cho ThreadPool của mình với doc comments. Lưu ý rằng chúng ta đã tuân thủ các thực hành tài liệu tốt bằng cách thêm phần ghi nhận các tình huống mà function của chúng ta có thể panic, như đã thảo luận trong Chương 14.</p>

<h3 class="task-heading">Tạo Không gian để Lưu trữ các Threads</h3>
<p>Bây giờ chúng ta có cách để biết chúng ta có một số hợp lệ của threads để lưu trữ trong pool, chúng ta có thể tạo các threads đó và lưu trữ chúng trong ThreadPool struct trước khi trả về struct. Nhưng làm thế nào để "lưu trữ" một thread? Hãy xem lại signature của thread::spawn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn spawn&lt;F, T&gt;(f: F) -> JoinHandle&lt;T&gt;
    where
        F: FnOnce() -> T,
        F: Send + 'static,
        T: Send + 'static,</code></pre>
</div>

<p>Hàm spawn trả về một JoinHandle<T>, trong đó T là kiểu mà closure trả về. Hãy thử sử dụng JoinHandle xem điều gì xảy ra. Trong trường hợp của chúng ta, các closures chúng ta đang truyền cho thread pool sẽ xử lý connection và không trả về gì, vì vậy T sẽ là unit type ().</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;

pub struct ThreadPool {
    threads: Vec&lt;thread::JoinHandle&lt;()&gt;&gt;,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let mut threads = Vec::with_capacity(size);

        for _ in 0..size {
            // create some threads and store them in the vector
        }

        ThreadPool { threads }
    }
}</code></pre>
</div>
<p><em>Listing 21-14: Tạo một vector cho ThreadPool để giữ các threads</em></p>

<p>Chúng ta đã đưa std::thread vào scope trong library crate vì chúng ta đang sử dụng thread::JoinHandle như kiểu của các items trong vector trong ThreadPool.</p>

<p>Khi một size hợp lệ được nhận, ThreadPool của chúng ta tạo một vector mới có thể giữ size items. Function with_capacity thực hiện cùng nhiệm vụ như Vec::new nhưng với một sự khác biệt quan trọng: Nó pre-allocates không gian trong vector. Vì chúng ta biết chúng ta cần lưu trữ size elements trong vector, việc thực hiện allocation này trước hơi hiệu quả hơn so với sử dụng Vec::new, tự điều chỉnh kích thước khi elements được chèn.</p>

<h3 class="task-heading">Gửi Code từ ThreadPool đến một Thread</h3>
<p>Chúng ta đã để lại một comment trong vòng for về việc tạo threads. Ở đây, chúng ta sẽ xem cách chúng ta thực sự tạo các threads. Thư viện chuẩn cung cấp thread::spawn như một cách để tạo các threads, và thread::spawn mong đợi nhận một số code mà thread nên chạy ngay khi thread được tạo. Tuy nhiên, trong trường hợp của chúng ta, chúng ta muốn tạo các threads và để chúng đợi code mà chúng ta sẽ gửi sau. Implementation của thư viện chuẩn của các threads không bao gồm bất kỳ cách nào để làm điều đó; chúng ta phải implement nó thủ công.</p>

<p>Chúng ta sẽ implement behavior này bằng cách giới thiệu một cấu trúc dữ liệu mới giữa ThreadPool và các threads sẽ quản lý behavior mới này. Chúng ta sẽ gọi cấu trúc dữ liệu này là Worker, là một thuật ngữ phổ biến trong các implementations pooling. Worker chọn code cần được chạy và chạy code trong thread của nó.</p>

<p>Thay vì lưu trữ một vector của JoinHandle<()> instances trong thread pool, chúng ta sẽ lưu trữ các instances của struct Worker. Mỗi Worker sẽ lưu trữ một JoinHandle<()> instance. Sau đó, chúng ta sẽ implement một method trên Worker sẽ nhận một closure của code để chạy và gửi nó đến thread đang chạy để thực thi. Chúng ta cũng sẽ cho mỗi Worker một id để chúng ta có thể phân biệt giữa các instances khác nhau của Worker trong pool khi logging hoặc debugging.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;

pub struct ThreadPool {
    workers: Vec&lt;Worker&gt;,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id));
        }

        ThreadPool { workers }
    }
}

struct Worker {
    id: usize,
    thread: thread::JoinHandle&lt;()&gt;,
}

impl Worker {
    fn new(id: usize) -> Worker {
        let thread = thread::spawn(|| {});

        Worker { id, thread }
    }
}</code></pre>
</div>
<p><em>Listing 21-15: Sửa đổi ThreadPool để giữ Worker instances thay vì giữ threads trực tiếp</em></p>

<p>Chúng ta đã thay đổi tên của field trên ThreadPool từ threads thành workers vì bây giờ nó đang giữ Worker instances thay vì JoinHandle<()> instances. Chúng ta sử dụng counter trong vòng for làm argument cho Worker::new, và chúng ta lưu trữ mỗi Worker mới trong vector tên là workers.</p>

<h3 class="task-heading">Gửi Requests đến Threads qua Channels</h3>
<p>Vấn đề tiếp theo chúng ta sẽ giải quyết là các closures được đưa cho thread::spawn không làm gì cả. Hiện tại, chúng ta nhận closure chúng ta muốn thực thi trong method execute. Nhưng chúng ta cần đưa thread::spawn một closure để chạy khi chúng ta tạo mỗi Worker trong quá trình tạo ThreadPool.</p>

<p>Chúng ta muốn các Worker instances mà chúng ta vừa tạo fetch code để chạy từ một queue được giữ trong ThreadPool và gửi code đó đến thread của nó để chạy.</p>

<p>Các channels mà chúng ta đã học trong Chương 16 — một cách đơn giản để giao tiếp giữa hai threads — sẽ hoàn hảo cho trường hợp sử dụng này. Chúng ta sẽ sử dụng một channel để hoạt động như queue của các jobs, và execute sẽ gửi một job từ ThreadPool đến các Worker instances, sẽ gửi job đến thread của nó. Đây là kế hoạch:</p>

<ul>
  <li>ThreadPool sẽ tạo một channel và giữ sender.</li>
  <li>Mỗi Worker sẽ giữ receiver.</li>
  <li>Chúng ta sẽ tạo một struct Job mới sẽ giữ các closures chúng ta muốn gửi xuống channel.</li>
  <li>Method execute sẽ gửi job nó muốn thực thi qua sender.</li>
  <li>Trong thread của nó, Worker sẽ loop qua receiver của nó và thực thi các closures của bất kỳ jobs nào nó nhận được.</li>
</ul>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{sync::mpsc, thread};

pub struct ThreadPool {
    workers: Vec&lt;Worker&gt;,
    sender: mpsc::Sender&lt;Job&gt;,
}

struct Job;

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id));
        }

        ThreadPool { workers, sender }
    }
}</code></pre>
</div>
<p><em>Listing 21-16: Sửa đổi ThreadPool để lưu trữ sender của một channel truyền Job instances</em></p>

<p>Hãy thử truyền một receiver của channel vào mỗi Worker khi thread pool tạo channel. Chúng ta biết chúng ta muốn sử dụng receiver trong thread mà các Worker instances spawn, vì vậy chúng ta sẽ tham chiếu receiver parameter trong closure.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Worker {
    fn new(id: usize, receiver: mpsc::Receiver&lt;Job&gt;) -> Worker {
        let thread = thread::spawn(|| {
            receiver;
        });

        Worker { id, thread }
    }
}</code></pre>
</div>
<p><em>Listing 21-17: Truyền receiver cho mỗi Worker</em></p>

<p>Khi chúng ta kiểm tra code này, chúng ta nhận được lỗi này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
error[E0382]: use of moved value: \`receiver\`</code></pre>
</div>

<p>Code đang cố truyền receiver cho nhiều Worker instances. Điều này sẽ không hoạt động, như bạn sẽ nhớ từ Chương 16: Channel implementation mà Rust cung cấp là multiple producer, single consumer. Điều này có nghĩa là chúng ta không thể chỉ clone consuming end của channel để sửa code này.</p>

<p>Ngoài ra, việc lấy một job khỏi channel queue liên quan đến việc mutate receiver, vì vậy các threads cần một cách an toàn để share và modify receiver; nếu không, chúng ta có thể gặp race conditions.</p>

<p>Nhớ lại các smart pointers thread-safe được thảo luận trong Chương 16: Để share ownership qua nhiều threads và cho phép các threads mutate giá trị, chúng ta cần sử dụng Arc<Mutex<T>>. Type Arc sẽ cho phép nhiều Worker instances sở hữu receiver, và Mutex sẽ đảm bảo chỉ một Worker nhận được một job từ receiver tại một thời điểm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{
    sync::{Arc, Mutex, mpsc},
    thread,
};

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool { workers, sender }
    }
}

impl Worker {
    fn new(id: usize, receiver: Arc&lt;Mutex&lt;mpsc::Receiver&lt;Job&gt;&gt;&gt;) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker {id} got a job; executing.");

                job();
            }
        });

        Worker { id, thread }
    }
}</code></pre>
</div>
<p><em>Listing 21-18: Chia sẻ receiver giữa các Worker instances sử dụng Arc và Mutex</em></p>

<p>Với những thay đổi này, code biên dịch! Chúng ta đang tiến tới!</p>

<h3 class="task-heading">Implement Method execute</h3>
<p>Hãy cuối cùng implement method execute trên ThreadPool. Chúng ta cũng sẽ thay đổi Job từ một struct thành một type alias cho một trait object giữ kiểu của closure mà execute nhận.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Job = Box&lt;dyn FnOnce() + Send + 'static&gt;;

impl ThreadPool {
    pub fn execute&lt;F&gt;(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);

        self.sender.send(job).unwrap();
    }
}</code></pre>
</div>
<p><em>Listing 21-19: Tạo type alias Job cho Box giữ mỗi closure và sau đó gửi job xuống channel</em></p>

<p>Sau khi tạo một Job instance mới sử dụng closure mà chúng ta nhận được trong execute, chúng ta gửi job đó xuống sending end của channel. Chúng ta gọi unwrap trên send cho trường hợp gửi thất bại. Điều này có thể xảy ra nếu, ví dụ, chúng ta dừng tất cả các threads của mình khỏi việc thực thi.</p>

<p>Nhưng chúng ta chưa hoàn tất! Trong Worker, closure được truyền cho thread::spawn vẫn chỉ tham chiếu đến receiving end của channel. Thay vào đó, chúng ta cần closure để loop mãi mãi, hỏi receiving end của channel một job và chạy job khi nó nhận được.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Worker {
    fn new(id: usize, receiver: Arc&lt;Mutex&lt;mpsc::Receiver&lt;Job&gt;&gt;&gt;) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker {id} got a job; executing.");

                job();
            }
        });

        Worker { id, thread }
    }
}</code></pre>
</div>
<p><em>Listing 21-20: Nhận và thực thi các jobs trong thread của Worker instance</em></p>

<p>Ở đây, đầu tiên chúng ta gọi lock trên receiver để acquire mutex, sau đó gọi unwrap để panic trên bất kỳ lỗi nào. Acquiring a lock có thể thất bại nếu mutex ở trạng thái poisoned, có thể xảy ra nếu một thread khác panicked trong khi giữ lock. Trong tình huống này, gọi unwrap để thread này panic là hành động đúng đắn.</p>

<p>Nếu chúng ta acquire được lock trên mutex, chúng ta gọi recv để nhận một Job từ channel. Một unwrap cuối cùng di chuyển qua bất kỳ lỗi nào ở đây, có thể xảy ra nếu thread giữ sender đã shut down.</p>

<p>Lời gọi recv blocks, vì vậy nếu chưa có job nào, thread hiện tại sẽ đợi cho đến khi một job có sẵn. Mutex<T> đảm bảo rằng chỉ một Worker thread tại một thời điểm đang yêu cầu một job.</p>

<p>Thread pool của chúng ta bây giờ đang ở trạng thái hoạt động! Hãy thử cargo run và thực hiện một số requests:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 4.91s
     Running \`target/debug/hello\`
Worker 0 got a job; executing.
Worker 2 got a job; executing.
Worker 1 got a job; executing.
Worker 3 got a job; executing.
Worker 0 got a job; executing.
Worker 2 got a job; executing.
Worker 1 got a job; executing.
Worker 3 got a job; executing.</code></pre>

<p>Thành công! Bây giờ chúng ta có một thread pool thực thi các connections không đồng bộ. Không bao giờ có nhiều hơn bốn threads được tạo, vì vậy hệ thống của chúng ta sẽ không bị quá tải nếu server nhận được nhiều requests. Nếu chúng ta thực hiện một request đến /sleep, server sẽ có thể phục vụ các requests khác bằng cách có một thread khác chạy chúng.</p>

<p>Lưu ý: Nếu bạn mở /sleep trong nhiều cửa sổ trình duyệt cùng lúc, chúng có thể load từng cái một với khoảng năm giây. Một số trình duyệt web thực hiện nhiều instances của cùng một request tuần tự vì lý do caching. Hạn chế này không phải do web server của chúng ta gây ra.</p>

<p>Đây là thời điểm tốt để dừng lại và xem xét cách code trong Listings 21-18, 21-19, và 21-20 sẽ khác như thế nào nếu chúng ta sử dụng futures thay vì một closure cho công việc cần làm. Những types nào sẽ thay đổi? Method signatures sẽ khác như thế nào? Những phần nào của code sẽ giữ nguyên?</p>
`,
            defaultCode: `use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
    sync::{Arc, Mutex, mpsc},
};

// ThreadPool implementation
pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

type Job = Box<dyn FnOnce() + Send + 'static>;

struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();
        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool { workers, sender }
    }

    pub fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);
        self.sender.send(job).unwrap();
    }
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();
                println!("Worker {} got a job; executing.", id);
                job();
            }
        });

        Worker { id, thread }
    }
}

// Web server implementation
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        pool.execute(|| {
            handle_connection(stream);
        });
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, filename) = match &request_line[..] {
        "GET / HTTP/1.1" => ("HTTP/1.1 200 OK", "hello.html"),
        "GET /sleep HTTP/1.1" => {
            thread::sleep(Duration::from_secs(5));
            ("HTTP/1.1 200 OK", "hello.html")
        }
        _ => ("HTTP/1.1 404 NOT FOUND", "404.html"),
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}
`,
            expectedOutput: ``
        };
