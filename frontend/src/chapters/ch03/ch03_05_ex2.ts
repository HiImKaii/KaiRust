import { Lesson } from '../../courses';

export const ch03_05_ex2: Lesson = {
    id: 'ch03-05-ex2',
    title: 'Bài tập 3.5.2: Gán giá trị kết quả từ If (If Let)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Rust là một ngôn ngữ dạng biểu thức (expression-oriented). Vì <code>if</code> là một biểu thức (trả về giá trị), bạn có thể dùng nó ngay ở phía bên phải của lệnh <code>let</code> để gán giá trị biến!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main</code>, tôi đã viết sẵn một đoạn code yêu cầu kiểm tra <code>condition</code>.</li>
  <li>Sử dụng <code>if else</code> như một biểu thức.
      <br>Nếu <code>condition</code> là <strong>thật (true)</strong>, trả về số <code>5</code>.
      <br>Nếu <code>condition</code> là <strong>giả (false)</strong>, trả về số <code>6</code>.
  </li>
  <li>Lưu trữ kết quả từ khối lệnh <code>if else</code> vào một biến tên là <code>number</code>. Gợi ý: <code>let number = if ... ;</code></li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý Quan trọng:</strong> Đừng quên dấu chấm phẩy (<code>;</code>) ở cuối câu lệnh <code>let</code> sau khi kết thúc cả khối block <code>}</code> của biểu thức if nhé! Các biểu thức bên trong thân <code>if</code> hoặc <code>else</code> sẽ không được dùng chấm phẩy để trả về.
</div>
`,
    defaultCode: `fn main() {
    let condition = true;

    // Sử dụng if struct để gán số 5 hoặc 6 cho biết \`number\`
    // let number = ...

    // (Tự động) In kết quả
    // println!("Giá trị number là: {number}");
}
`
};
