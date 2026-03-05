import { Lesson } from '../../courses';

export const ch16_01: Lesson = {
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
        };
