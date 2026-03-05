import { Lesson } from '../../courses';

export const ch16_02: Lesson = {
            id: 'ch16-02',
            title: '16.2 Message Passing với Channels',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Rust hỗ trợ <strong>message passing</strong> qua channels: một sender và một receiver.</p>

<h3 class="task-heading">Tạo channel</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::mpsc; // multi-producer, single-consumer
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let msg = String::from("xin chào");
    tx.send(msg).unwrap();
    // msg đã bị move, không dùng được nữa!
});

let received = rx.recv().unwrap(); // Chờ message
println!("Nhận: {received}");</code></pre>
</div>

<h3 class="task-heading">Nhiều messages</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let msgs = vec!["hi", "from", "the", "thread"];
    for msg in msgs {
        tx.send(msg).unwrap();
        thread::sleep(Duration::from_millis(200));
    }
});

// Dùng rx như iterator
for received in rx {
    println!("Got: {received}");
}</code></pre>
</div>
`,
            defaultCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Clone sender cho nhiều producers
    let tx2 = tx.clone();

    thread::spawn(move || {
        let messages = vec!["Xin", "chào", "từ", "thread-1"];
        for msg in messages {
            tx.send(format!("[T1] {msg}")).unwrap();
        }
    });

    thread::spawn(move || {
        let messages = vec!["Hello", "from", "thread-2"];
        for msg in messages {
            tx2.send(format!("[T2] {msg}")).unwrap();
        }
    });

    // Nhận tất cả messages
    let mut count = 0;
    for received in rx {
        println!("{received}");
        count += 1;
    }
    println!("\\nTổng: {count} messages");
}
`,
            expectedOutput: '[T1] Xin\n[T1] chào\n[T1] từ\n[T1] thread-1\n[T2] Hello\n[T2] from\n[T2] thread-2\n\nTổng: 7 messages'
        };
