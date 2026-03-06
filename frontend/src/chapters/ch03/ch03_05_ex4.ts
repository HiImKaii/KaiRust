import { Lesson } from '../../courses';

export const ch03_05_ex4: Lesson = {
    id: 'ch03-05-ex4',
    title: 'Bài tập 3.5.4: Vòng lặp While',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Dùng <code>if</code>, <code>else</code>, <code>loop</code>, <code>break</code> thật rắc rối? Vòng lặp <code>while</code> sẽ làm cho mã gọn gàng và dễ đọc hơn khi chúng ta biết cần phải đánh giá một điều kiện nào đó để dừng!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong <code>main</code>, bắt đầu đếm ngược với số nguyên bằng <code>5</code>. Lưu giá trị này ở một biến mutable: <code>let mut number = 5;</code>.</li>
  <li>Sử dụng vòng lặp <code>while</code>, điều kiện là <strong>number khác 0</strong> (<code>number != 0</code>).</li>
  <li>Mỗi lần lặp, in ra số hiện tại <code>number</code>. Sau đó giảm <code>number</code> đi <code>1</code>.</li>
  <li>Bên ngoài vòng lặp (sau khi lặp xong), in ra màn hình thông điệp <code>"Khai hỏa!"</code> (Bắn tên lửa 🚀 nha!).</li>
</ol>
<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Hãy nhớ thay đổi biến number bên trong, nếu không bạn sẽ có một vòng lặp mãi mãi!
</div>
`,
    defaultCode: `fn main() {
    
}
`
};
