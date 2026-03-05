import { Lesson } from '../../courses';

export const ch09_01: Lesson = {
            id: 'ch09-01',
            title: '9.1 Lỗi không phục hồi: panic!',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Rust chia lỗi thành 2 loại: <strong>recoverable</strong> (phục hồi được, dùng <code>Result&lt;T, E&gt;</code>) và <strong>unrecoverable</strong> (không phục hồi, dùng <code>panic!</code>).</p>

<h3 class="task-heading">panic! macro</h3>
<p>Khi gọi <code>panic!</code>, chương trình in thông báo lỗi, dọn dẹp stack, và thoát:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    panic!("crash and burn");
}</code></pre>
</div>

<h3 class="task-heading">Backtrace</h3>
<p>Đặt <code>RUST_BACKTRACE=1</code> để xem stack trace chi tiết khi panic:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ RUST_BACKTRACE=1 cargo run</code></pre>
</div>

<h3 class="task-heading">Khi nào dùng panic?</h3>
<ul class="task-list">
  <li>Ví dụ, prototype, tests</li>
  <li>Khi bạn biết chắc code sẽ không lỗi nhưng compiler không biết</li>
  <li>Khi tiếp tục chạy sẽ <strong>không an toàn</strong></li>
</ul>
`,
            defaultCode: `fn main() {
    // Ví dụ panic do truy cập ngoài phạm vi mảng
    let v = vec![1, 2, 3];

    // An toàn: dùng .get()
    match v.get(99) {
        Some(val) => println!("Giá trị: {val}"),
        None => println!("Index 99 không tồn tại — xử lý an toàn!"),
    }

    println!("Chương trình vẫn chạy bình thường 👍");

    // Nếu uncomment dòng dưới, chương trình sẽ panic:
    // println!("{}", v[99]);
}
`,
            expectedOutput: 'Index 99 không tồn tại — xử lý an toàn!\nChương trình vẫn chạy bình thường 👍'
        };
