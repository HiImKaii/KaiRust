import { Lesson } from '../../courses';

export const ch16_03: Lesson = {
            id: 'ch16-03',
            title: '16.3 Shared-State Concurrency',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Message passing là một cách tốt để handle concurrency, nhưng nó không phải là cách duy nhất. Một phương pháp khác là cho nhiều threads truy cập cùng một shared data. Hãy xem xét lại phần slogan từ tài liệu Go: "Do not communicate by sharing memory."</p>

<p>Communicate by sharing memory trông như thế nào? Hơn nữa, tại sao những người đam mê message-passing lại cảnh báo không nên sử dụng memory sharing?</p>

<p>Theo một cách nào đó, channels trong bất kỳ ngôn ngữ lập trình nào đều tương tự như single ownership vì một khi bạn transfer một value xuống một channel, bạn không nên sử dụng value đó nữa. Shared-memory concurrency giống như multiple ownership: Nhiều threads có thể truy cập cùng một memory location cùng một lúc. Như bạn đã thấy trong Chương 15, nơi smart pointers làm cho multiple ownership trở nên possible, multiple ownership có thể add complexity vì các owners khác nhau cần được quản lý. Rust's type system và ownership rules hỗ trợ rất nhiều trong việc quản lý đúng cách này. Ví dụ, hãy nhìn vào mutexes, một trong những concurrency primitives phổ biến nhất cho shared memory.</p>

<h3 class="task-heading">Điều khiển Truy cập với Mutexes</h3>
<p>Mutex là viết tắt của mutual exclusion, như trong một mutex chỉ cho phép một thread truy cập một số data tại bất kỳ thời điểm nào. Để truy cập data trong một mutex, một thread trước tiên phải signal rằng nó muốn truy cập bằng cách yêu cầu acquire mutex's lock. Lock là một data structure là một phần của mutex theo dõi ai hiện tại có quyền truy cập exclusive đến data. Do đó, mutex được mô tả như đang guard data mà nó giữ thông qua hệ thống locking.</p>

<p>Mutexes có tiếng là khó sử dụng vì bạn phải nhớ hai quy tắc:</p>

<ul>
  <li>Bạn phải attempt to acquire lock trước khi sử dụng data.</li>
  <li>Khi bạn done với data mà mutex guards, bạn phải unlock data để các threads khác có thể acquire lock.</li>
</ul>

<p>Cho một real-world metaphor cho mutex, hãy tưởng tượng một panel discussion tại một hội nghị chỉ có một microphone. Trước khi một panelist có thể nói, họ phải ask hoặc signal rằng họ muốn sử dụng microphone. Khi họ có microphone, họ có thể nói bao lâu tùy thích và sau đó đưa microphone cho next panelist. Nếu một panelist quên đưa microphone khi họ xong, không ai khác có thể nói!</p>

<p>Management of mutexes có thể cực kỳ khó đúng, đó là lý do tại sao nhiều người nhiệt tình về channels. Tuy nhiên, nhờ Rust's type system và ownership rules, bạn không thể get locking và unlocking sai.</p>

<h3 class="task-heading">API của Mutex&lt;T&gt;</h3>
<p>Như một ví dụ về cách sử dụng mutex, hãy bắt đầu bằng việc sử dụng mutex trong một single-threaded context, như trong Listing 16-12.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }

    println!("m = {m:?}");
}</code></pre>
</div>
<p><em>Listing 16-12: Exploring the API of Mutex&lt;T&gt; in a single-threaded context for simplicity</em></p>

<p>Như với nhiều types, chúng ta tạo một Mutex&lt;T&gt; sử dụng associated function new. Để truy cập data bên trong mutex, chúng ta sử dụng method lock để acquire lock. Call này sẽ block current thread để nó không thể làm bất kỳ công việc nào cho đến khi đến lượt của chúng ta có lock.</p>

<p>Call đến lock sẽ fail nếu một thread khác đang giữ lock bị panicked. Trong trường hợp đó, không ai có thể acquire lock, vì vậy chúng ta đã chọn unwrap và làm cho thread này panic nếu chúng ta ở trong tình huống đó.</p>

<p>Sau khi chúng ta đã acquire lock, chúng ta có thể treat return value, được đặt tên là num trong trường hợp này, như một mutable reference đến data bên trong. Type system đảm bảo rằng chúng ta acquire một lock trước khi sử dụng giá trị trong m. Type của m là Mutex&lt;i32&gt;, không phải i32, vì vậy chúng ta phải gọi lock để có thể sử dụng giá trị i32. Chúng ta không thể quên; type system sẽ không cho phép chúng ta truy cập inner i32 nếu không có lock.</p>

<p>Call đến lock trả về một type gọi là MutexGuard, được wrap trong một LockResult mà chúng ta đã xử lý với call đến unwrap. Type MutexGuard implements Deref để trỏ đến inner data của chúng ta; type đó cũng có một Drop implementation tự động release lock khi một MutexGuard goes out of scope, điều xảy ra ở cuối inner scope. Kết quả là, chúng ta không risk quên release lock và block mutex khỏi việc được sử dụng bởi các threads khác vì lock release xảy ra tự động.</p>

<h3 class="task-heading">Shared Access đến Mutex&lt;T&gt;</h3>
<p>Bây giờ hãy thử share một giá trị giữa nhiều threads sử dụng Mutex&lt;T&gt;. Chúng ta sẽ spin up 10 threads và have them each increment một counter value by 1, vì vậy counter đi từ 0 đến 10.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Mutex::new(0);
    let mut handles = vec![];

    for _ in 0..10 {
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}</code></pre>
</div>
<p><em>Listing 16-13: Ten threads, each incrementing a counter guarded by a Mutex&lt;T&gt;</em></p>

<p>Chúng ta tạo một counter variable để giữ một i32 bên trong một Mutex&lt;T&gt;. Tiếp theo, chúng ta tạo 10 threads bằng cách iterate over một range của numbers. Chúng ta sử dụng thread::spawn và give tất cả các threads cùng một closure: một closure di chuyển counter vào thread, acquires a lock trên Mutex&lt;T&gt; bằng cách gọi method lock, và sau đó thêm 1 vào giá trị trong mutex.</p>

<p>Error message states rằng counter value đã được moved trong iteration trước đó của loop. Rust đang nói rằng chúng ta không thể move ownership của lock counter vào nhiều threads. Hãy fix compiler error này với multiple-ownership method chúng ta đã thảo luận trong Chương 15.</p>

<h3 class="task-heading">Multiple Ownership với Multiple Threads</h3>
<p>Trong Chương 15, chúng ta đã give một value cho nhiều owners bằng cách sử dụng smart pointer Rc&lt;T&gt; để tạo một reference-counted value. Hãy làm điều tương tự ở đây và xem điều gì xảy ra.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
use std::rc::Rc;
use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Rc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Rc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}</code></pre>
</div>
<p><em>Listing 16-14: Attempting to use Rc&lt;T&gt; to allow multiple threads to own the Mutex&lt;T&gt;</em></p>

<p>Chúng ta compile và nhận được... các errors khác nhau! Error quan trọng là: <code>Rc&lt;Mutex&lt;i32&gt;&gt; cannot be sent between threads safely</code>. Trait Send không được implemented cho Rc&lt;Mutex&lt;i32&gt;&gt;.</p>

<p>Rc&lt;T&gt; không an toàn để share across threads. Khi Rc&lt;T&gt; quản lý reference count, nó thêm vào count cho mỗi lần gọi clone và subtract từ count khi mỗi clone được dropped. Nhưng nó không sử dụng bất kỳ concurrency primitives nào để đảm bảo rằng changes to the count không thể bị interrupted bởi một thread khác. Điều này có thể dẫn đến wrong counts. Chúng ta cần một type giống như Rc&lt;T&gt;, nhưng làm changes to the reference count một cách thread-safe.</p>

<h3 class="task-heading">Atomic Reference Counting với Arc&lt;T&gt;</h3>
<p>May mắn thay, Arc&lt;T&gt; là một type giống như Rc&lt;T&gt; an toàn để sử dụng trong các tình huống concurrent. Chữ "a" là viết tắt của atomic, có nghĩa nó là một atomically reference-counted type.</p>

<p>Bạn có thể tự hỏi tại sao tất cả primitive types không phải là atomic và tại sao standard library types không được implemented để sử dụng Arc&lt;T&gt; mặc định. Lý do là thread safety đi kèm với một performance penalty mà bạn chỉ muốn trả khi thực sự cần. Nếu bạn chỉ đang thực hiện các operations trên các values trong một single thread, code của bạn có thể chạy nhanh hơn nếu nó không phải enforce các guarantees mà atomics cung cấp.</p>

<p>Hãy quay lại ví dụ của chúng ta: Arc&lt;T&gt; và Rc&lt;T&gt; có cùng API, vì vậy chúng ta fix program của mình bằng cách thay đổi use line, call đến new, và call đến clone. Code trong Listing 16-15 sẽ compile và chạy.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}</code></pre>
</div>
<p><em>Listing 16-15: Using an Arc&lt;T&gt; to wrap the Mutex&lt;T&gt; to be able to share ownership across multiple threads</em></p>

<p>Code này sẽ in:</p>

<pre><code>Result: 10</code></pre>

<p>Chúng ta đã làm được! Chúng ta đếm từ 0 đến 10. Sử dụng chiến lược này, bạn có thể chia một calculation thành các phần độc lập, split các phần đó across threads, và sau đó sử dụng một Mutex&lt;T&gt; để mỗi thread update kết quả cuối cùng với phần của nó.</p>

<h3 class="task-heading">So sánh RefCell&lt;T&gt;/Rc&lt;T&gt; và Mutex&lt;T&gt;/Arc&lt;T&gt;</h3>
<p>Bạn có thể nhận thấy rằng counter là immutable nhưng chúng ta có thể get một mutable reference đến giá trị bên trong nó; điều này có nghĩa là Mutex&lt;T&gt; cung cấp interior mutability, như Cell family làm. Theo cùng cách chúng ta sử dụng RefCell&lt;T&gt; trong Chương 15 để cho phép chúng ta mutate contents bên trong một Rc&lt;T&gt;, chúng ta sử dụng Mutex&lt;T&gt; để mutate contents bên trong một Arc&lt;T&gt;.</p>

<p>Một chi tiết khác cần lưu ý là Rust không thể protect bạn khỏi tất cả các loại logic errors khi bạn sử dụng Mutex&lt;T&gt;. Nhớ lại từ Chương 15 rằng sử dụng Rc&lt;T&gt; đi kèm với risk tạo reference cycles. Tương tự, Mutex&lt;T&gt; đi kèm với risk tạo deadlocks.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Shared State:</strong>
  <ul>
    <li><strong>Mutex&lt;T&gt;</strong> - Mutual exclusion, chỉ 1 thread truy cập tại một thời điểm</li>
    <li><strong>lock()</strong> - Acquire lock, trả về MutexGuard</li>
    <li><strong>MutexGuard</strong> - Tự động release lock khi ra khỏi scope (Drop)</li>
    <li><strong>Arc&lt;T&gt;</strong> - Atomic reference counting, thread-safe version của Rc&lt;T&gt;</li>
    <li><strong>Arc + Mutex</strong> - Multiple threads share data với thread-safe ownership</li>
  </ul>
</div>
`,
            defaultCode: `use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

fn main() {
    // Tạo counter được bọc trong Arc và Mutex
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    // Tạo 10 threads, mỗi thread tăng counter lên 1
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    // Đợi tất cả threads hoàn thành
    for handle in handles {
        handle.join().unwrap();
    }

    // In kết quả
    println!("Kết quả: {}", *counter.lock().unwrap());
}
`,
            expectedOutput: `Kết quả: 10`
        };
