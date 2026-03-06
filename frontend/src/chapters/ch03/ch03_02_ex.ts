import { Lesson } from '../../courses';

export const ch03_02_ex: Lesson = {
  id: 'ch03-02-ex',
  title: 'Bài tập 3.2: Kiểu dữ liệu (Data Types)',
  duration: '10 phút',
  type: 'practice',
  isExercise: true,
  content: `
<p>Hãy cùng kiểm tra kiến thức của bạn về Kiểu dữ liệu, Tuple và Array!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một <strong>tuple</strong> tên là <code>my_tuple</code> chứa các giá trị sau: một số nguyên <code>500</code>, một số thực <code>6.4</code>, và một ký tự <code>'Z'</code> (Lưu ý chữ Z in hoa và dùng ngoặc đơn cho char).</li>
  <li>Giải nén (destructure) tuple đó thành 3 biến tương ứng <code>x</code>, <code>y</code>, <code>z</code>.</li>
  <li>Tạo một <strong>mảng (array)</strong> tên là <code>my_array</code> chứa 5 số nguyên đầu tiên (1, 2, 3, 4, 5).</li>
</ol>
<div class="cyber-alert info">
  Sau khi code xong, hãy nhấn <strong>Run</strong> để vượt qua bài kiểm tra!
</div>
`,
  defaultCode: `fn main() {

}
`
};
