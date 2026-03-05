import { Lesson } from '../../courses';

export const ch20_01: Lesson = {
            id: 'ch20-01',
            title: '20.1 Unsafe Rust',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Unsafe Rust</strong> cho phép bạn làm những điều mà compiler không thể đảm bảo an toàn. Dùng <code>unsafe</code> block.</p>

<h3 class="task-heading">5 superpowers của unsafe</h3>
<ul class="task-list">
  <li>Dereference raw pointer</li>
  <li>Gọi unsafe function/method</li>
  <li>Truy cập/sửa mutable static variable</li>
  <li>Implement unsafe trait</li>
  <li>Truy cập fields của union</li>
</ul>

<h3 class="task-heading">Raw Pointers</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut num = 5;
let r1 = &num as *const i32;     // raw pointer (immutable)
let r2 = &mut num as *mut i32;   // raw pointer (mutable)

unsafe {
    println!("r1 = {}", *r1);
    println!("r2 = {}", *r2);
}</code></pre>
</div>

<h3 class="task-heading">FFI (Foreign Function Interface)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("abs(-3) = {}", abs(-3));
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quy tắc:</strong> Chỉ dùng <code>unsafe</code> khi thực sự cần thiết. Bọc unsafe code trong safe abstraction và cung cấp safe API cho bên ngoài.
</div>
`,
            defaultCode: `fn main() {
    // Raw pointers (cần unsafe để dereference)
    let x = 42;
    let r = &x as *const i32;

    unsafe {
        println!("Raw pointer value: {}", *r);
    }

    // Safe wrapper cho unsafe operation
    let v = vec![1, 2, 3, 4, 5, 6];
    let (left, right) = split_at(&v, 3);
    println!("Left: {:?}", left);
    println!("Right: {:?}", right);
}

fn split_at(slice: &[i32], mid: usize) -> (&[i32], &[i32]) {
    assert!(mid <= slice.len());
    // Internally uses unsafe, nhưng API an toàn
    (&slice[..mid], &slice[mid..])
}
`,
            expectedOutput: 'Raw pointer value: 42\nLeft: [1, 2, 3]\nRight: [4, 5, 6]'
        };
