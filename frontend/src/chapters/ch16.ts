import { Chapter } from '../courses';

export const ch16: Chapter = {
    id: 'ch16',
    title: 'Chương 16: Concurrency (Đa luồng)',
    lessons: [
        {
            id: 'ch16-01',
            title: '16.1 Threads',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Rust đảm bảo <strong>fearless concurrency</strong> — hệ thống ownership ngăn chặn data race tại compile time.</p>

<h3 class="task-heading">Tạo thread mới</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::thread;
use std::time::Duration;

let handle = thread::spawn(|| {
    for i in 1..10 {
        println!("Thread phụ: {i}");
        thread::sleep(Duration::from_millis(1));
    }
});

for i in 1..5 {
    println!("Thread chính: {i}");
    thread::sleep(Duration::from_millis(1));
}

handle.join().unwrap(); // Chờ thread kết thúc</code></pre>
</div>

<h3 class="task-heading">move closure</h3>
<p>Dùng <code>move</code> để closure lấy ownership biến:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3];
let handle = thread::spawn(move || {
    println!("Vector: {:?}", v);
});
handle.join().unwrap();</code></pre>
</div>
`,
            defaultCode: `use std::thread;

fn main() {
    // Spawn multiple threads
    let mut handles = vec![];

    for i in 0..5 {
        let handle = thread::spawn(move || {
            let result = (i + 1) * (i + 1);
            println!("Thread {}: {}² = {}", i, i + 1, result);
            result
        });
        handles.push(handle);
    }

    let mut total = 0;
    for handle in handles {
        total += handle.join().unwrap();
    }
    println!("Tổng bình phương 1-5: {total}");
}
`,
            expectedOutput: 'Thread 0: 1² = 1\nThread 1: 2² = 4\nThread 2: 3² = 9\nThread 3: 4² = 16\nThread 4: 5² = 25\nTổng bình phương 1-5: 55'
        },
        {
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
        },
        {
            id: 'ch16-03',
            title: '16.3 Shared State: Mutex & Arc',
            duration: '20 phút',
            type: 'practice',
            content: `
<p><strong>Mutex&lt;T&gt;</strong> (mutual exclusion) cho phép chỉ 1 thread truy cập dữ liệu tại một thời điểm.</p>

<h3 class="task-heading">Mutex</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::Mutex;

let m = Mutex::new(5);
{
    let mut num = m.lock().unwrap();
    *num = 6;
} // lock tự động release khi ra khỏi scope
println!("m = {:?}", m);</code></pre>
</div>

<h3 class="task-heading">Arc&lt;T&gt; — Atomic Reference Counting</h3>
<p>Giống <code>Rc&lt;T&gt;</code> nhưng thread-safe. Kết hợp với Mutex cho shared state:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::sync::{Arc, Mutex};
use std::thread;

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

println!("Result: {}", *counter.lock().unwrap());</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Send và Sync traits:</strong>
  <ul>
    <li><code>Send</code> — kiểu có thể transfer ownership qua threads</li>
    <li><code>Sync</code> — kiểu có thể shared reference qua threads</li>
  </ul>
  Rust compiler tự kiểm tra tại compile time!
</div>
`,
            defaultCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(Vec::new()));
    let mut handles = vec![];

    for i in 0..5 {
        let data = Arc::clone(&data);
        let handle = thread::spawn(move || {
            let mut vec = data.lock().unwrap();
            vec.push(i * i);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    let result = data.lock().unwrap();
    println!("Kết quả từ 5 threads: {:?}", *result);
    println!("Tổng: {}", result.iter().sum::<i32>());
}
`,
            expectedOutput: 'Kết quả từ 5 threads: [0, 1, 4, 9, 16]\nTổng: 30'
        }
    ]
};
