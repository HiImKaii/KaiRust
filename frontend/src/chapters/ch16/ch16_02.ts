import { Lesson } from '../../courses';

export const ch16_02: Lesson = {
            id: 'ch16-02',
            title: '16.2 Message Passing với Channels',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Một cách phổ biến để handle concurrency là message passing, trong đó threads hoặc actors gửi messages đến nhau thông qua một channel. Cách tiếp cận này đang ngày càng phổ biến vì một số người cảm thấy nó dễ nghĩ hơn là việc share data trực tiếp: owner duy nhất của data có nghĩa là không cần synchronization phức tạp.</p>

<p>Rust có một implementation của message passing khá nice thông qua channel, mà chúng ta có thể tạo bằng cách sử dụng mpsc::channel. "mpsc" là viết tắt của "multiple producer, single consumer". Nói cách khác, có thể có nhiều "sending end" nhưng chỉ có một "receiving end" cho một channel cụ thể.</p>

<h3 class="task-heading">Tạo Channel</h3>
<p>Ví dụ dưới đây tạo một channel và gửi một message từ một thread spawned đến main thread:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let msg = String::from("xin chào");
        tx.send(msg).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Nhận được: {received}");
}</code></pre>
</div>

<p>Hàm mpsc::channel trả về một tuple: transmitter (tx) và receiver (rx). Tx và Rx viết tắt cho transmitter và receiver.</p>

<p>Closure mà chúng ta pass đến thread::spawn lấy ownership của tx bằng cách sử dụng move, do đó thread spawned có thể gửi messages thông qua channel.</p>

<p>Transmitter có một method send nhận giá trị chúng ta muốn gửi. Nó trả về Result&lt;T, E&gt;, vì vậy nếu receiver đã bị dropped và không còn cách nào để deliver giá trị, operation sẽ return một error.</p>

<p>Receiver có hai method chính: recv và try_recv. Chúng ta đang sử dụng recv, đây là blocking method cho đến khi một giá trị arrives qua channel. Try_recv không block mà return ngay lập tức: Nó hữu ích nếu thread của bạn có công việc khác để làm trong khi đợi messages.</p>

<p>Trong ví dụ trên, chúng ta sử dụng recv như một call blocking. Tuy nhiên, khi chúng ta xem xét main thread như nơi nhận messages, việc sử dụng một for loop trên receiver sẽ thuận tiện hơn. For loop sẽ gọi recv implicitly cho mỗi lần lặp, in các giá trị khi chúng arrive.</p>

<h3 class="task-heading">Channels và Ownership Transfer</h3>
<p>Điều quan trọng cần lưu ý là khi bạn gửi một giá trị đến một thread khác, bạn không còn sở hữu giá trị đó nữa. Khi receiver nhận được một giá trị, nó sẽ lấy ownership của giá trị đó.</p>

<p>Ví dụ, hãy thử biên dịch code này để xem điều gì xảy ra khi bạn cố sử dụng giá trị đã được gửi đi:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let msg = String::from("xin chào");
        tx.send(msg).unwrap();
        println!("msg is \\"{msg}\\"");
    });

    let received = rx.recv().unwrap();
    println!("Nhận được: {received}");
}</code></pre>
</div>

<p>Đây là lỗi: Bởi vì msg được gửi đến channel trước khi println! được gọi, nên msg không còn valid sau khi gọi tx.send. Quy tắc ownership hoạt động trong Rust giúp chúng ta không mắc lỗi này: Nếu chúng ta cố sử dụng msg sau khi gửi, chúng ta sẽ nhận được một compiler error.</p>

<h3 class="task-heading">Gửi Nhiều Giá Trị và Đợi Messages</h3>
<p>Ví dụ dưới đây có spawned thread gửi nhiều messages và tạm dừng giữa mỗi lần:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let msgs = vec!["xin", "chào", "từ", "thread"];

        for msg in msgs {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Nhận được: {received}");
    }
}</code></pre>
</div>

<p>Lần này, spawned thread có một vector gồm các strings mà nó sẽ gửi qua channel. Chúng ta lặp qua chúng, gửi từng string, và tạm dừng một giây giữa mỗi lần gửi.</p>

<p>Trên receiving end, trong main thread, chúng ta gọi rx trực tiếp trong một for loop. Channel owner đóng và quá trình iterate kết thúc khi không còn messages nào được gửi.</p>

<p>Chúng ta không có bất kỳ code nào tạm dừng hoặc delay trong vòng for trong main thread, vì vậy chúng ta có thể nói rằng main thread đang đợi nhận các giá trị từ spawned thread.</p>

<h3 class="task-heading">Tạo Nhiều Producers</h3>
<p>Trước đó chúng ta đề cập rằng mpsc là viết tắt của "multiple producer, single consumer". Hãy để mpsc được sử dụng và mở rộng code để tạo nhiều threads đều gửi giá trị đến cùng một receiver. Chúng ta có thể làm điều này bằng cách cloning transmitter, như trong Listing 16-11.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx1.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    thread::spawn(move || {
        let vals = vec![
            String::from("more"),
            String::from("messages"),
            String::from("for"),
            String::from("you"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {received}");
    }
}</code></pre>
</div>
<p><em>Listing 16-11: Sending multiple messages from multiple producers</em></p>

<p>Lần này, trước khi chúng ta tạo first spawned thread, chúng ta gọi clone trên transmitter. Điều này sẽ cho chúng ta một transmitter mới mà chúng ta có thể pass đến first spawned thread. Chúng ta pass original transmitter đến second spawned thread. Điều này cho chúng ta hai threads, mỗi thread gửi các messages khác nhau đến một receiver.</p>

<p>Khi bạn chạy code, output của bạn sẽ trông như thế này:</p>

<pre><code>Got: hi
Got: more
Got: from
Got: messages
Got: for
Got: the
Got: thread
Got: you</code></pre>

<p>Bạn có thể thấy các giá trị theo thứ tự khác, tùy thuộc vào hệ thống của bạn. Điều này làm cho concurrency vừa thú vị vừa khó. Nếu bạn thử nghiệm với thread::sleep, cho nó các giá trị khác nhau trong các threads khác nhau, mỗi lần chạy sẽ nondeterministic hơn và tạo output khác nhau mỗi lần.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Channels:</strong>
  <ul>
    <li><strong>mpsc::channel</strong> - Tạo channel (multiple producer, single consumer)</li>
    <li><strong>tx.send()</strong> - Gửi giá trị qua channel</li>
    <li><strong>rx.recv()</strong> - Nhận giá trị (blocking)</li>
    <li><strong>rx.try_recv()</strong> - Nhận giá trị (non-blocking)</li>
    <li><strong>tx.clone()</strong> - Tạo nhiều producers</li>
    <li><strong>Ownership transfer</strong> - Giá trị được gửi đi không còn owned bởi sender</li>
  </ul>
</div>
`,
            defaultCode: `use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Clone sender để tạo nhiều producers
    let tx1 = tx.clone();

    // Thread 1 gửi messages
    thread::spawn(move || {
        let messages = vec!["Xin", "chào", "từ", "thread-1"];
        for msg in messages {
            tx1.send(msg.to_string()).unwrap();
            thread::sleep(Duration::from_millis(500));
        }
    });

    // Thread 2 gửi messages
    thread::spawn(move || {
        let messages = vec!["Hello", "from", "thread-2"];
        for msg in messages {
            tx.send(msg.to_string()).unwrap();
            thread::sleep(Duration::from_millis(500));
        }
    });

    // Nhận tất cả messages
    let mut count = 0;
    for received in rx {
        println!("Nhận: {received}");
        count += 1;
    }
    println!("\\nTổng messages: {}", count);
}
`,
            expectedOutput: `Nhận: Xin
Nhận: Hello
Nhận: chào
Nhận: from
Nhận: từ
Nhận: thread-2
Nhận: thread-1

Tổng messages: 7`
        };
