import { Lesson } from '../../courses';

export const ch02_01: Lesson = {
      id: 'ch02-01',
      title: '2.1 Thiết lập Dự án Mới',
      duration: '15 phút',
      type: 'theory',
      content: `
<p>Hãy cùng khám phá Rust bằng cách cùng nhau thực hiện một dự án thực tế! Chương này giới thiệu cho bạn một vài khái niệm Rust phổ biến bằng cách chỉ cho bạn cách sử dụng chúng trong một chương trình thực tế. Bạn sẽ học về <code>let</code>, <code>match</code>, các phương thức, các hàm liên kết, các crate bên ngoài, và nhiều hơn nữa! Trong các chương tiếp theo, chúng ta sẽ khám phá những ý tưởng này chi tiết hơn. Trong chương này, bạn sẽ chỉ thực hành các nguyên tắc cơ bản.</p>

<p>Chúng ta sẽ thực hiện một bài toán lập trình kinh điển cho người mới bắt đầu: trò chơi đoán số. Đây là cách nó hoạt động: Chương trình sẽ tạo ra một số nguyên ngẫu nhiên từ 1 đến 100. Sau đó nó sẽ nhắc người chơi nhập vào một dự đoán. Sau khi một dự đoán được nhập vào, chương trình sẽ chỉ ra xem dự đoán đó là quá thấp hay quá cao. Nếu dự đoán là chính xác, trò chơi sẽ in ra một thông báo chúc mừng và thoát.</p>

<h3 class="task-heading">Thiết lập Dự án Mới</h3>
<p>Để thiết lập một dự án mới, hãy đi tới thư mục <code>projects</code> mà bạn đã tạo trong Chương 1 và tạo một dự án mới bằng cách sử dụng Cargo, như sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new guessing_game
  $ cd guessing_game</code></pre>
</div>
<p>Lệnh đầu tiên, <code>cargo new</code>, nhận tên của dự án (<code>guessing_game</code>) làm đối số đầu tiên. Lệnh thứ hai chuyển sang thư mục của dự án mới.</p>

<p>Hãy nhìn vào tệp <code>Cargo.toml</code> được tạo ra:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>

<p>Như bạn đã thấy trong Chương 1, <code>cargo new</code> tạo ra một chương trình “Hello, world!” cho bạn. Hãy kiểm tra tệp <code>src/main.rs</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>

<p>Bây giờ hãy biên dịch chương trình “Hello, world!” này và chạy nó trong cùng một bước bằng cách sử dụng lệnh <code>cargo run</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.08s
     Running \`target/debug/guessing_game\`
Hello, world!</code></pre>
</div>

<p>Lệnh <code>run</code> trở nên hữu ích khi bạn cần lặp lại thử nghiệm nhanh chóng trên một dự án, như chúng ta sẽ làm trong trò chơi này, nhanh chóng kiểm tra từng lần lặp lại trước khi chuyển sang lần tiếp theo.</p>
<p>Mở lại tệp <code>src/main.rs</code>. Bạn sẽ viết tất cả mã nguồn trong tệp này.</p>
`,
      defaultCode: `fn main() {
    println!("Hello, world!");
}
`,
      expectedOutput: 'Hello, world!'
    };
