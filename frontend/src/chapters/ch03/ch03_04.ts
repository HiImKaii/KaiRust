import { Lesson } from '../../courses';

export const ch03_04: Lesson = {
  id: 'ch03-04',
  title: '3.4 Chú thích (Comments)',
  duration: '10 phút',
  type: 'theory',
  content: `
<p>Tất cả các lập trình viên đều cố gắng làm cho code dễ hiểu, nhưng đôi khi cần có giải thích thêm. Trong những trường hợp này, lập trình viên để lại <strong>chú thích</strong> (comments) trong mã nguồn mà trình biên dịch sẽ bỏ qua nhưng người đọc code có thể thấy hữu ích.</p>

<h3 class="task-heading">Comment trong Rust</h3>

<p>Trong Rust, kiểu chú thích quen thuộc nhất bắt đầu bằng hai dấu gạch chéo <code>//</code>, và chú thích kéo dài đến cuối dòng.</p>

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

<p>Thường gặp hơn, bạn sẽ thấy comment được sử dụng ở dạng đặt trên dòng code cần giải thích:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // Tôi đang cảm thấy may mắn hôm nay
    let lucky_number = 7;
}</code></pre>
</div>

<h3 class="task-heading">Documentation Comments</h3>

<p>Rust còn có <strong>Documentation comments</strong> (chú thích tài liệu) sử dụng để tự động tạo tài liệu HTML bằng <code>cargo doc</code>:</p>

<ul class="task-list">
  <li><code>///</code> - Chú thích tài liệu cho item đứng sau (thường dùng cho hàm, struct...)</li>
  <li><code>//!</code> - Chú thích tài liệu cho item chứa nó (thường dùng cho module)</li>
</ul>

<p>Documentation comments hỗ trợ <strong>Markdown</strong> để định dạng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>/// Cộng hai số nguyên
///
/// # Arguments
///
/// * \`a\` - Số thứ nhất
/// * \`b\` - Số thứ hai
///
/// # Returns
///
/// Tổng của a và b
fn add(a: i32, b: i32) -> i32 {
    a + b
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Chi tiết về documentation comments sẽ được hướng dẫn ở Chương 14.
</div>

<h3 class="task-heading">Tổng kết</h3>

<table class="comparison-table">
  <tr>
    <th>Loại comment</th>
    <th>Cú pháp</th>
    <th>Mục đích</th>
  </tr>
  <tr>
    <td>Comment thường</td>
    <td><code>// ...</code></td>
    <td>Ghi chú trong code</td>
  </tr>
  <tr>
    <td>Doc comment (bên ngoài)</td>
    <td><code>/// ...</code></td>
    <td>Tạo tài liệu (Markdown)</td>
  </tr>
  <tr>
    <td>Doc comment (bên trong)</td>
    <td><code>//! ...</code></td>
    <td>Tài liệu cho module</td>
  </tr>
</table>
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
