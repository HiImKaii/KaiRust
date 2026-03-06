import { Lesson } from '../../courses';

export const ch03_02_ex2: Lesson = {
    id: 'ch03-02-ex2',
    title: 'Bài tập 3.2.2: Các phép toán số học (Arithmetic)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Rust hỗ trợ đầy đủ các phép toán số học cơ bản. Hãy thử vài phép tính nhé!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tính phép chia lấy nguyên của <code>43</code> cho <code>5</code> và lưu vào biến <code>quotient</code>.</li>
  <li>Tính phép chia lấy phần dư (modulo) của <code>43</code> cho <code>5</code> và lưu vào biến <code>remainder</code>.</li>
  <li>In cả hai kết quả ra màn hình.</li>
</ol>
<div class="cyber-alert info">
  <strong>Toán tử:</strong> Phép chia dùng dấu <code>/</code>, phép lấy số dư dùng dấu <code>%</code> (modulo).
</div>
`,
    defaultCode: `fn main() {

}
`
};
