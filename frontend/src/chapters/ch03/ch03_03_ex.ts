import { Lesson } from '../../courses';

export const ch03_03_ex: Lesson = {
  id: 'ch03-03-ex',
  title: 'Bài tập 3.3: Hàm (Functions)',
  duration: '15 phút',
  type: 'practice',
  isExercise: true,
  content: `
<p>Hãy viết một hàm tùy chỉnh trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tôi đã để sẵn hàm <code>main()</code> gọi hàm <code>calculate_volume</code> để kiểm tra.</li>
  <li>Bạn hãy <strong>định nghĩa hàm <code>calculate_volume</code></strong> bên dưới hàm <code>main()</code>. Hàm này:</li>
  <ul>
    <li>Nhận 3 tham số kiểu <code>i32</code> lần lượt là: <code>length</code>, <code>width</code>, và <code>height</code></li>
    <li>Trả về <strong>(Return)</strong> một giá trị kiểu <code>i32</code> là thể tích khối hộp (tích của cả 3 chiều).</li>
  </ul>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Ở phần thân hàm tính toán, bạn nhớ không dùng dấu chấm phẩy (;) ở cuối biểu thức để implicit return (hoặc dùng từ khóa return).
</div>
`,
  defaultCode: `fn main() {
    let vol = calculate_volume(2, 3, 4);
    println!("Thể tích là: {}", vol);
}

fn calculate_volume(length: i32, width: i32, height: i32) -> i32 {

}
`
};
