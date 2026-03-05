import { Lesson } from '../../courses';

export const ch16_03: Lesson = {
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
        };
