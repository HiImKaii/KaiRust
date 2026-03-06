import { Lesson } from '../../courses';

export const ch03_01_ex3: Lesson = {
    id: 'ch03-01-ex3',
    title: 'Bài tập 3.1.3: Hằng số (Constants)',
    duration: '5 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Bạn đã biết về biến, giờ hãy thử sức với Hằng số (Constants).</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Hãy khai báo một hằng số tên là <code>SPEED_OF_LIGHT</code> ở <strong>phạm vi toàn cục</strong> (bên ngoài hàm <code>main</code>).</li>
  <li>Gán cho nó giá trị là <code>299792458</code>.</li>
  <li>Bạn có nhớ bắt buộc phải <strong>chú thích kiểu dữ liệu</strong> cho hằng số không? Hãy dùng kiểu số nguyên không dấu 32-bit (<code>u32</code>).</li>
  <li>Trong hàm <code>main</code>, in giá trị hằng số đó ra màn hình.</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Dùng từ khóa <code>const</code> thay vì <code>let</code> và chữ viết hoa phân tách bằng dấu gạch dưới cho tên biến. Bắt buộc phải thêm <code>: u32</code>.
</div>
`,
    defaultCode: `// Viết hằng số ở đây!

fn main() {
    
}
`
};
