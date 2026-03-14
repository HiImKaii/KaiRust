import { Lesson } from '../../courses';

export const ch14_05: Lesson = {
            id: 'ch14-05',
            title: '14.5 Mở rộng Cargo với Custom Commands',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Cargo được thiết kế để bạn có thể mở rộng nó với các subcommands mới mà không phải sửa đổi nó. Nếu một binary trong $PATH của bạn được đặt tên là cargo-something, bạn có thể chạy nó như thể nó là một Cargo subcommand bằng cách chạy cargo something. Các custom commands như thế này cũng được liệt kê khi bạn chạy cargo --list. Khả năng sử dụng cargo install để cài đặt extensions và sau đó chạy chúng giống như các Cargo tools built-in là một lợi ích cực kỳ tiện lợi của thiết kế Cargo!</p>

<h3 class="task-heading">Tạo Custom Command</h3>
<p>Để tạo một custom command, bạn chỉ cần tạo một binary có tên bắt đầu bằng cargo- và đặt nó trong $PATH của bạn.</p>

<p>Ví dụ, để tạo cargo hello command:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/main.rs của cargo-hello
fn main() {
    println!("Hello from custom Cargo command!");
}</code></pre>
</div>

<p>Sau khi compile và đặt trong $PATH:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo hello
Hello from custom Cargo command!</code></pre>
</div>

<p>Liệt kê tất cả commands:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo --list
Installed:
    hello
    build
    run
    test
    ...</code></pre>
</div>

<h3 class="task-heading">Tại sao sử dụng Custom Commands?</h3>
<ul>
  <li>Tự động hóa các tác vụ thường xuyên</li>
  <li>Tích hợp với workflow hiện có</li>
  <li>Chia sẻ tools với team</li>
  <li>Không cần sửa đổi Cargo</li>
</ul>

<div class="cyber-alert info">
  <strong>Tóm tắt Custom Commands:</strong>
  <ul>
    <li><strong>cargo-*</strong> - Đặt tên binary bắt đầu bằng cargo-</li>
    <li><strong>$PATH</strong> - Đặt trong PATH để sử dụng</li>
    <li><strong>cargo --list</strong> - Liệt kê tất cả commands</li>
    <li><strong>Tiện lợi</strong> - Mở rộng Cargo mà không sửa đổi</li>
  </ul>
</div>
`,
            defaultCode: `// Custom command được tạo bằng cách đặt binary trong PATH
// Không thể chạy trực tiếp trong Rust code

fn main() {
    println!("Để tạo custom Cargo command:");
    println!("1. Tạo một binary Rust");
    println!("2. Đặt tên là cargo-ten_command");
    println!("3. Compile và đặt trong $PATH");
    println!("4. Chạy: cargo ten_command");
}
`,
            expectedOutput: 'Để tạo custom Cargo command:\n1. Tạo một binary Rust\n2. Đặt tên là cargo-ten_command\n3. Compile và đặt trong $PATH\n4. Chạy: cargo ten_command'
        };
