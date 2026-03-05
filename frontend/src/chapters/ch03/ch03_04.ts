import { Lesson } from '../../courses';

export const ch03_04: Lesson = {
      id: 'ch03-04',
      title: '3.4 Chú thích (Comments)',
      duration: '10 phút',
      type: 'theory',
      content: `
<p>Tất cả các lập trình viên đều cố gắng làm cho code dễ hiểu, nhưng đôi khi cần có giải thích thêm. Trong những trường hợp này, lập trình viên để lại <strong>chú thích</strong> (comments) trong mã nguồn mà trình biên dịch sẽ bỏ qua nhưng người đọc code có thể thấy hữu ích.</p>

<p>Trong Rust, kiểu chú thích quen thuộc nhất bắt đầu bằng hai dấu gạch chéo <code>//</code>, và chú thích kéo dài đến cuối dòng. Đối với chú thích vượt qua một dòng đơn, bạn cần đặt <code>//</code> trên mỗi dòng:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Xin chào, đây là comment
fn main() {
    // Comment giải thích logic phức tạp
    // có thể trải dài nhiều dòng
    // mỗi dòng bắt đầu bằng //

    let lucky_number = 7; // Comment cuối dòng cũng OK
}</code></pre>
</div>

<p>Nhưng thường gặp hơn, bạn sẽ thấy chú thích được sử dụng ở dạng đặt trên dòng code cần giải thích:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // Tôi đang cảm thấy may mắn hôm nay
    let lucky_number = 7;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> Rust còn có <em>Documentation comments</em> sử dụng <code>///</code> (trước item) và <code>//!</code> (trong item). Chúng hỗ trợ Markdown và được dùng để tự động tạo tài liệu HTML bằng <code>cargo doc</code>. Chi tiết sẽ ở Chương 14.
</div>
`,
      defaultCode: `// Chương trình demo comments trong Rust

fn main() {
    // Khai báo biến — comment giải thích mục đích
    let x = 5; // giá trị ban đầu

    // Tính toán kết quả
    // Đây là comment nhiều dòng
    // mỗi dòng bắt đầu bằng //
    let y = x * 2;

    println!("x = {x}, y = {y}");
}
`,
      expectedOutput: 'x = 5, y = 10'
    };
