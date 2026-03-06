import { Lesson } from '../../courses';

export const ch03_01_ex2: Lesson = {
    id: 'ch03-01-ex2',
    title: 'Bài tập 3.1.2: Shadowing (Che phủ biến)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy cùng thực hành kỹ thuật <strong>Shadowing</strong> vô cùng mạnh mẽ trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến bất biến tên là <code>secret_number</code> và gán chuỗi <code>"42"</code> (kiểu <code>&str</code>).</li>
  <li>Sử dụng tính năng shadowing, tạo một biến <strong>cùng tên</strong> <code>secret_number</code> bằng cách parse biến cũ sang số nguyên <code>i32</code> (bạn có thể giả định chuyển đổi luôn thành công với <code>.parse::&lt;i32&gt;().unwrap()</code>).</li>
  <li>Sử dụng shadowing một lần nữa để nhân <code>secret_number</code> lên 2 lần.</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Shadowing cho phép ta đổi không chỉ giá trị mà còn <strong>kiểu dữ liệu</strong> của một biến mà vẫn tái sử dụng được tên biến đó. Bạn sẽ cần dùng lại từ khóa <code>let</code> cho mỗi lần shadow!
</div>
`,
    defaultCode: `fn main() {

}
`
};
