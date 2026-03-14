import { Lesson } from '../../courses';

export const ch16_01: Lesson = {
            id: 'ch16-01',
            title: '16.1 Sử dụng Threads để Chạy Code Đồng Thời',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Trong hầu hết các hệ điều hành hiện tại, code của một chương trình đang chạy được quản lý trong một process, và hệ điều hành sẽ quản lý nhiều processes cùng lúc. Trong một chương trình, bạn cũng có thể có các phần độc lập chạy đồng thời. Các tính năng chạy các phần độc lập này được gọi là threads. Ví dụ, một web server có thể có nhiều threads để nó có thể respond nhiều hơn một request cùng một lúc.</p>

<p>Chia computation trong chương trình của bạn thành nhiều threads để chạy nhiều tasks cùng một lúc có thể improve performance, nhưng nó cũng adds complexity. Bởi vì threads có thể chạy đồng thời, không có guarantee nào về thứ tự trong đó các phần code của bạn trên các threads khác nhau sẽ chạy. Điều này có thể dẫn đến các vấn đề, như:</p>

<ul>
  <li><strong>Race conditions</strong>, trong đó threads đang truy cập data hoặc resources theo thứ tự không nhất quán</li>
  <li><strong>Deadlocks</strong>, trong đó hai threads đang đợi nhau, ngăn cản cả hai threads tiếp tục</li>
  <li><strong>Bugs</strong> chỉ xảy ra trong một số điều kiện nhất định và khó reproduce và fix một cách đáng tin cậy</li>
</ul>

<p>Rust cố gắng giảm thiểu các tác động tiêu cực của việc sử dụng threads, nhưng lập trình trong một multithreaded context vẫn đòi hỏi suy nghĩ cẩn thận và yêu cầu một cấu trúc code khác với các chương trình chạy trong một single thread.</p>

<h3 class="task-heading">Cách Triển Khai Threads</h3>
<p>Các ngôn ngữ lập trình triển khai threads theo một vài cách khác nhau, và nhiều hệ điều hành cung cấp một API mà ngôn ngữ lập trình có thể gọi để tạo các threads mới. Thư viện chuẩn của Rust sử dụng mô hình triển khai thread 1:1, theo đó một chương trình sử dụng một operating system thread cho mỗi một language thread. Có những crates triển khai các mô hình threading khác thực hiện các trade-offs khác nhau so với mô hình 1:1.</p>

<h3 class="task-heading">Tạo Thread Mới với spawn</h3>
<p>Để tạo một thread mới, chúng ta gọi hàm thread::spawn và truyền cho nó một closure (chúng ta đã nói về closures trong Chương 13) chứa code chúng ta muốn chạy trong thread mới. Ví dụ trong Listing 16-1 in một số text từ main thread và text khác từ một thread mới.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }
}</code></pre>
</div>
<p><em>Listing 16-1: Creating a new thread to print one thing while the main thread prints something else</em></p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Khi main thread của một Rust program hoàn thành, tất cả spawned threads đều bị shut down, cho dù chúng đã hoàn thành việc chạy hay chưa.
</div>

<p>Output từ chương trình này có thể hơi khác nhau mỗi lần, nhưng nó sẽ trông tương tự như sau:</p>

<pre><code>hi number 1 from the main thread!
hi number 1 from the spawned thread!
hi number 2 from the main thread!
hi number 2 from the spawned thread!
hi number 3 from the main thread!
hi number 3 from the spawned thread!
hi number 4 from the main thread!
hi number 4 from the spawned thread!
hi number 5 from the spawned thread!</code></pre>

<p>Các lời gọi đến thread::sleep force một thread dừng việc thực thi trong một khoảng ngắn, cho phép một thread khác chạy. Các threads có thể thay phiên, nhưng điều đó không được đảm bảo: Nó phụ thuộc vào cách hệ điều hành schedule các threads.</p>

<h3 class="task-heading">Đợi Tất cả Threads Hoàn Thành</h3>
<p>Code trong Listing 16-1 không chỉ dừng spawned thread sớm trong hầu hết các trường hợp do main thread kết thúc, mà còn bởi vì không có guarantee về thứ tự trong đó threads chạy, chúng ta cũng không thể guarantee rằng spawned thread sẽ được chạy chút nào!</p>

<p>Chúng ta có thể fix vấn đề của spawned thread không chạy hoặc kết thúc sớm bằng cách save return value của thread::spawn trong một biến. Return type của thread::spawn là JoinHandle&lt;T&gt;. JoinHandle&lt;T&gt; là một owned value mà khi chúng ta gọi method join trên nó, sẽ đợi cho thread của nó hoàn thành.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}</code></pre>
</div>
<p><em>Listing 16-2: Saving a JoinHandle&lt;T&gt; from thread::spawn to guarantee the thread is run to completion</em></p>

<p>Gọi join trên handle blocks thread hiện đang chạy cho đến khi thread được represent bởi handle terminate. Blocking một thread có nghĩa là thread đó bị ngăn cản thực hiện công việc hoặc thoát.</p>

<p>Nếu chúng ta di chuyển handle.join() trước vòng for trong main, output sẽ không còn interleaved nữa:</p>

<pre><code>hi number 1 from the spawned thread!
hi number 2 from the spawned thread!
...
hi number 1 from the main thread!</code></pre>

<p>Những chi tiết nhỏ, như vị trí gọi join, có thể ảnh hưởng đến việc threads của bạn có chạy đồng thời hay không.</p>

<h3 class="task-heading">Sử dụng move Closures với Threads</h3>
<p>Chúng ta thường sử dụng từ khóa move với closures truyền đến thread::spawn bởi vì closure sẽ sau đó take ownership của các values nó sử dụng từ environment, do đó transferring ownership của những values đó từ một thread sang thread khác.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| {
        println!("Here's a vector: {v:?}");
    });

    handle.join().unwrap();
}</code></pre>
</div>
<p><em>Listing 16-3: Attempting to use a vector created by the main thread in another thread</em></p>

<p>Khi chúng ta compile ví dụ này, chúng ta nhận được lỗi sau:</p>

<pre><code>error[E0373]: closure may outlive the current function, but it borrows \`v\`, which is owned by the current function</code></pre>

<p>Để fix compiler error này, chúng ta có thể sử dụng lời khuyên từ error message:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {v:?}");
    });

    handle.join().unwrap();
}</code></pre>
</div>
<p><em>Listing 16-5: Using the move keyword to force a closure to take ownership of the values it uses</em></p>

<p>Bằng cách thêm từ khóa move trước closure, chúng ta force closure take ownership của các values nó đang sử dụng thay vì cho phép Rust infer rằng nó nên borrow các values.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Threads:</strong>
  <ul>
    <li><strong>thread::spawn</strong> - Tạo thread mới</li>
    <li><strong>JoinHandle&lt;T&gt;</strong> - Dùng join() để đợi thread kết thúc</li>
    <li><strong>move closure</strong> - Chuyển ownership biến sang thread mới</li>
    <li><strong>thread::sleep</strong> - Tạm dừng thread</li>
    <li><strong>1:1 model</strong> - Mỗi language thread = 1 OS thread</li>
  </ul>
</div>
`,
            defaultCode: `use std::thread;
use std::time::Duration;

fn main() {
    // Tạo vector trong main thread
    let v = vec![1, 2, 3];

    // Spawn thread với move để chuyển ownership
    let handle = thread::spawn(move || {
        println!("Vector từ thread mới: {:?}", v);
        // Tính tổng bình phương
        let sum: i32 = v.iter().map(|x| x * x).sum();
        println!("Tổng bình phương: {}", sum);
        sum
    });

    // Đợi thread hoàn thành và lấy kết quả
    let result = handle.join().unwrap();
    println!("Kết quả từ thread: {result}");
    println!("Main thread kết thúc!");
}
`,
            expectedOutput: `Vector từ thread mới: [1, 2, 3]
Tổng bình phương: 14
Kết quả từ thread: 14
Main thread kết thúc!`
        };
