import { Lesson } from '../../courses';

export const gracefulShutdown: Lesson = {
            id: 'final-project-03',
            title: 'Graceful Shutdown và Cleanup',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Code trong Listing 21-20 đang phản hồi các requests không đồng bộ thông qua việc sử dụng một thread pool, như ý định của chúng ta. Chúng ta nhận được một số warnings về các fields workers, id, và thread mà chúng ta không sử dụng theo cách trực tiếp, nhắc nhở chúng ta rằng chúng ta không dọn dẹp bất cứ thứ gì. Khi chúng ta sử dụng phương pháp ctrl-C ít thanh lịch hơn để dừng main thread, tất cả các threads khác cũng bị dừng ngay lập tức, ngay cả khi chúng đang ở giữa việc phục vụ một request.</p>

<p>Tiếp theo, chúng ta sẽ implement Drop trait để gọi join trên mỗi thread trong pool để chúng có thể hoàn thành các requests mà chúng đang làm trước khi đóng. Sau đó, chúng ta sẽ implement một cách để nói cho các threads biết rằng chúng nên dừng chấp nhận các requests mới và shut down. Để xem code này hoạt động, chúng ta sẽ sửa đổi server của mình để chỉ chấp nhận hai requests trước khi gracefully shut down thread pool của nó.</p>

<p>Một điều cần lưu ý khi chúng ta tiến hành: Không có thứ gì trong số này ảnh hưởng đến các phần của code xử lý việc thực thi closures, vì vậy mọi thứ ở đây sẽ giống nhau nếu chúng ta sử dụng một thread pool cho một async runtime.</p>

<h3 class="task-heading">Implement Drop Trait trên ThreadPool</h3>
<p>Hãy bắt đầu với việc implement Drop trên thread pool của chúng ta. Khi pool được drop, tất cả các threads của chúng ta nên join để đảm bảo chúng hoàn thành công việc của chúng. Listing 21-22 cho thấy một nỗ lực đầu tiên cho implementation Drop; code này sẽ chưa hoạt động.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Drop for ThreadPool {
    fn drop(&mut self) {
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            worker.thread.join().unwrap();
        }
    }
}</code></pre>
</div>
<p><em>Listing 21-22: Joining mỗi thread khi thread pool ra khỏi scope</em></p>

<p>Đầu tiên, chúng ta loop qua mỗi worker của thread pool. Chúng ta sử dụng &mut cho điều này vì self là một mutable reference, và chúng ta cũng cần có thể mutate worker. Cho mỗi worker, chúng ta in một message nói rằng Worker instance cụ thể này đang shut down, và sau đó gọi join trên thread của Worker instance đó. Nếu lời gọi join thất bại, chúng ta sử dụng unwrap để Rust panic và đi vào một shutdown không graceful.</p>

<p>Đây là lỗi chúng ta nhận được khi biên dịch code này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
error[E0507]: cannot move out of \`worker.thread\` which is behind a mutable reference</code></pre>
</div>

<p>Lỗi cho chúng ta biết rằng chúng ta không thể gọi join vì chúng ta chỉ có một mutable borrow của mỗi worker và join lấy ownership của argument của nó. Để giải quyết vấn đề này, chúng ta cần di chuyển thread ra khỏi Worker instance sở hữu thread để join có thể consume thread. Một cách để làm điều này là tiếp cận tương tự như trong Listing 18-15. Nếu Worker giữ một Option<thread::JoinHandle<()>>, chúng ta có thể gọi method take trên Option để di chuyển giá trị ra khỏi Some variant và để lại một None variant ở vị trí của nó. Nói cách khác, một Worker đang chạy sẽ có một Some variant trong thread, và khi chúng ta muốn dọn dẹp một Worker, chúng ta sẽ thay thế Some bằng None để Worker không có thread để chạy.</p>

<p>Tuy nhiên, thời điểm duy nhất điều này xảy ra sẽ là khi dropping Worker. Đổi lại, chúng ta sẽ phải xử lý Option<thread::JoinHandle<()>> ở bất kỳ đâu chúng ta truy cập worker.thread. Rust idiomatic sử dụng Option khá nhiều, nhưng khi bạn thấy mình bọc một thứ mà bạn biết sẽ luôn present trong một Option như một workaround như thế này, đó là một ý tưởng tốt để tìm kiếm các approaches thay thế để làm cho code của bạn sạch hơn và ít bị lỗi hơn.</p>

<p>Trong trường hợp này, một alternative tốt hơn tồn tại: method Vec::drain. Nó chấp nhận một range parameter để chỉ định items nào cần remove khỏi vector và trả về một iterator của những items đó. Truyền range syntax .. sẽ remove mọi giá trị khỏi vector.</p>

<p>Vì vậy, chúng ta cần cập nhật implementation drop của ThreadPool như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Drop for ThreadPool {
    fn drop(&mut self) {
        for worker in self.workers.drain(..) {
            println!("Shutting down worker {}", worker.id);

            worker.thread.join().unwrap();
        }
    }
}</code></pre>
</div>

<p>Điều này giải quyết lỗi compiler và không yêu cầu bất kỳ thay đổi nào khác cho code của chúng ta. Lưu ý rằng, vì drop có thể được gọi khi panicking, unwrap cũng có thể panic và gây ra một double panic, ngay lập tức crash chương trình và kết thúc bất kỳ cleanup nào đang tiến hành. Điều này ổn cho một chương trình ví dụ, nhưng không được khuyến nghị cho production code.</p>

<h3 class="task-heading">Signal cho các Threads để Dừng Listening cho Jobs</h3>
<p>Với tất cả các thay đổi chúng ta đã thực hiện, code của chúng ta biên dịch mà không có bất kỳ warnings nào. Tuy nhiên, tin xấu là code này không hoạt động theo cách chúng ta muốn. Điểm quan trọng là logic trong các closures được chạy bởi các threads của Worker instances: Tại thời điểm này, chúng ta gọi join, nhưng đó sẽ không shut down các threads, vì chúng loop mãi mãi để tìm jobs. Nếu chúng ta cố drop ThreadPool của mình với implementation drop hiện tại, main thread sẽ block mãi mãi, đợi thread đầu tiên hoàn thành.</p>

<p>Để sửa vấn đề này, chúng ta sẽ cần một thay đổi trong implementation drop của ThreadPool và sau đó là một thay đổi trong Worker loop.</p>

<p>Trước tiên, chúng ta sẽ thay đổi implementation drop của ThreadPool để explicitly drop sender trước khi đợi các threads hoàn thành. Listing 21-23 cho thấy các thay đổi trên ThreadPool để explicitly drop sender.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct ThreadPool {
    workers: Vec&lt;Worker&gt;,
    sender: Option&lt;mpsc::Sender&lt;Job&gt;&gt;,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        // --snip--

        ThreadPool {
            workers,
            sender: Some(sender),
        }
    }

    pub fn execute&lt;F&gt;(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);

        self.sender.as_ref().unwrap().send(job).unwrap();
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        drop(self.sender.take());

        for worker in self.workers.drain(..) {
            println!("Shutting down worker {}", worker.id);

            worker.thread.join().unwrap();
        }
    }
}</code></pre>
</div>
<p><em>Listing 21-23: Explicitly dropping sender trước khi joining các Worker threads</em></p>

<p>Việc dropping sender đóng channel, cho thấy rằng không còn messages nào sẽ được gửi. Khi điều đó xảy ra, tất cả các lời gọi recv mà các Worker instances thực hiện trong infinite loop sẽ trả về một lỗi. Trong Listing 21-24, chúng ta thay đổi Worker loop để gracefully exit khỏi loop trong trường hợp đó, có nghĩa là các threads sẽ hoàn thành khi implementation drop của ThreadPool gọi join trên chúng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Worker {
    fn new(id: usize, receiver: Arc&lt;Mutex&lt;mpsc::Receiver&lt;Job&gt;&gt;&gt;) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let message = receiver.lock().unwrap().recv();

                match message {
                    Ok(job) => {
                        println!("Worker {id} got a job; executing.");

                        job();
                    }
                    Err(_) => {
                        println!("Worker {id} disconnected; shutting down.");
                        break;
                    }
                }
            }
        });

        Worker { id, thread }
    }
}</code></pre>
</div>
<p><em>Listing 21-24: Explicitly breaking out of the loop khi recv trả về một lỗi</em></p>

<p>Để xem code này hoạt động, hãy sửa đổi main để chỉ chấp nhận hai requests trước khi gracefully shut down server, như trong Listing 21-25.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming().take(2) {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Shutting down.");
}</code></pre>
</div>
<p><em>Listing 21-25: Shutting down server sau khi phục vụ hai requests bằng cách exit khỏi loop</em></p>

<p>Bạn không muốn một web server thực tế shut down sau khi chỉ phục vụ hai requests. Code này chỉ chứng minh rằng graceful shutdown và cleanup đang hoạt động đúng.</p>

<p>Method take được định nghĩa trong Iterator trait và giới hạn iteration đến hai items đầu tiên. ThreadPool sẽ ra khỏi scope ở cuối main, và implementation drop sẽ chạy.</p>

<p>Khởi động server với cargo run và thực hiện ba requests. Request thứ ba sẽ bị lỗi, và trong terminal của bạn, bạn sẽ thấy output tương tự như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.41s
     Running \`target/debug/hello\`
Worker 0 got a job; executing.
Shutting down.
Shutting down worker 0
Worker 3 got a job; executing.
Worker 1 disconnected; shutting down.
Worker 2 disconnected; shutting down.
Worker 3 disconnected; shutting down.
Worker 0 disconnected; shutting down.
Shutting down worker 1
Shutting down worker 2
Shutting down worker 3</code></pre>
</div>

<p>Bạn có thể thấy một thứ tự khác của Worker IDs và messages được in. Chúng ta có thể thấy code này hoạt động như thế nào từ các messages: Các Worker instances 0 và 3 nhận được hai requests đầu tiên. Server dừng chấp nhận connections sau connection thứ hai, và implementation Drop trên ThreadPool bắt đầu thực thi trước khi Worker 3 thậm chí bắt đầu job của nó. Việc dropping sender ngắt kết nối tất cả các Worker instances và nói cho chúng shut down. Mỗi Worker instance in một message khi chúng ngắt kết nối, và sau đó thread pool gọi join để đợi mỗi Worker thread hoàn thành.</p>

<p>Chú ý một khía cạnh thú vị của việc thực thi cụ thể này: ThreadPool dropped sender, và trước khi bất kỳ Worker nào nhận được lỗi, chúng ta đã cố gắng join Worker 0. Worker 0 chưa nhận được lỗi từ recv, vì vậy main thread bị block, đợi Worker 0 hoàn thành. Trong khi đó, Worker 3 nhận được một job và sau đó tất cả các threads nhận được một lỗi. Khi Worker 0 hoàn thành, main thread đợi các Worker instances còn lại hoàn thành. Tại thời điểm đó, tất cả đã exit khỏi các loops của chúng và dừng lại.</p>

<p>Chúc mừng! Chúng ta đã hoàn thành dự án của mình; chúng ta có một web server cơ bản sử dụng một thread pool để phản hồi không đồng bộ. Chúng ta có thể thực hiện một graceful shutdown của server, dọn dẹp tất cả các threads trong pool.</p>

<p>Đây là full code để tham khảo:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/main.rs

use hello::ThreadPool;
use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming().take(2) {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Shutting down.");
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
}</code></pre>
</div>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/lib.rs

use std::{
    sync::{Arc, Mutex, mpsc},
    thread,
};

pub struct ThreadPool {
    workers: Vec&lt;Worker&gt;,
    sender: Option&lt;mpsc::Sender&lt;Job&gt;&gt;,
}

type Job = Box&lt;dyn FnOnce() + Send + 'static&gt;;

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();
        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool {
            workers,
            sender: Some(sender),
        }
    }

    pub fn execute&lt;F&gt;(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);
        self.sender.as_ref().unwrap().send(job).unwrap();
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        drop(self.sender.take());

        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}

struct Worker {
    id: usize,
    thread: Option&lt;thread::JoinHandle&lt;()&gt;&gt;,
}

impl Worker {
    fn new(id: usize, receiver: Arc&lt;Mutex&lt;mpsc::Receiver&lt;Job&gt;&gt;&gt;) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let message = receiver.lock().unwrap().recv();

                match message {
                    Ok(job) => {
                        println!("Worker {id} got a job; executing.");
                        job();
                    }
                    Err(_) => {
                        println!("Worker {id} disconnected; shutting down.");
                        break;
                    }
                }
            }
        });

        Worker {
            id,
            thread: Some(thread),
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Chúng ta có thể làm thêm nhiều thứ!</h3>
<p>Nếu bạn muốn tiếp tục nâng cao dự án này, đây là một số ý tưởng:</p>

<ul>
  <li>Thêm nhiều tài liệu hơn cho ThreadPool và các public methods của nó.</li>
  <li>Thêm các tests cho chức năng của library.</li>
  <li>Thay đổi các lời gọi unwrap thành xử lý lỗi mạnh mẽ hơn.</li>
  <li>Sử dụng ThreadPool để thực hiện một số task khác ngoài việc phục vụ web requests.</li>
  <li>Tìm một thread pool crate trên crates.io và implement một web server tương tự sử dụng crate đó. Sau đó, so sánh API và robustness của nó với thread pool chúng ta đã implement.</li>
</ul>

<h3 class="task-heading">Tóm tắt</h3>
<p>Làm tốt lắm! Bạn đã đến cuốn sách này! Chúng tôi muốn cảm ơn bạn đã tham gia cùng chúng tôi trong chuyến tham quan Rust này. Bây giờ bạn đã sẵn sàng để implement các Rust projects của riêng mình và giúp đỡ các projects của người khác. Hãy nhớ rằng có một cộng đồng thân thiện của các Rustaceans khác sẽ rất vui lòng giúp bạn với bất kỳ thách thức nào bạn gặp phải trong hành trình Rust của mình.</p>
`,
            defaultCode: `use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
    thread,
    time::Duration,
    sync::{Arc, Mutex, mpsc},
};

// ThreadPool với Graceful Shutdown
pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: Option<mpsc::Sender<Job>>,
}

type Job = Box<dyn FnOnce() + Send + 'static>;

struct Worker {
    id: usize,
    thread: Option<thread::JoinHandle<()>>,
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

        ThreadPool {
            workers,
            sender: Some(sender),
        }
    }

    pub fn execute<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        let job = Box::new(f);
        self.sender.as_ref().unwrap().send(job).unwrap();
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        // Drop sender để đóng channel
        drop(self.sender.take());

        // Join tất cả các workers
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let message = receiver.lock().unwrap().recv();

                match message {
                    Ok(job) => {
                        println!("Worker {} got a job; executing.", id);
                        job();
                    }
                    Err(_) => {
                        println!("Worker {} disconnected; shutting down.", id);
                        break;
                    }
                }
            }
        });

        Worker {
            id,
            thread: Some(thread),
        }
    }
}

// Web server
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming().take(2) {
        let stream = stream.unwrap();
        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Shutting down.");
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
