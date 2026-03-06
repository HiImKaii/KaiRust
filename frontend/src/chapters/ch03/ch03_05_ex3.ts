import { Lesson } from '../../courses';

export const ch03_05_ex3: Lesson = {
    id: 'ch03-05-ex3',
    title: 'Bài tập 3.5.3: Trả về giá trị từ Vòng lặp Loop',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Bạn có biết vòng lặp vô hạn <code>loop</code> cũng là một biểu thức và có thể dùng để tính toán không? Nếu bạn đặt giá trị ngay sau lệnh <code>break</code>, giá trị đó sẽ được trả về khi vòng lặp dừng!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main</code>, tạo một biến có thể thay đổi (mutable variable) tên là <code>counter</code> và gán bằng <code>0</code>.</li>
  <li>Dùng biến bất biến (immutable) <code>result</code> để lưu giá trị từ vòng lặp <code>loop</code>. Nghĩa là khởi tạo <code>let result = loop { ... };</code></li>
  <li>Mỗi vòng lặp, tăng <code>counter</code> lên <code>1</code> (<code>counter += 1</code>).</li>
  <li>Nếu vòng lặp thực hiện đến khi <code>counter == 10</code>, hãy dừng vòng lặp bằng <code>break</code> VÀ kết quả trả về của vòng lặp phải là lấy <code>counter * 2</code>.</li>
  <li>Sau cùng in giá trị biến <code>result</code> đó ra.</li>
</ol>
<div class="cyber-alert info">
  <strong>Break trả về giá trị:</strong> Dùng cú pháp <code>break giá_trị;</code> (ví dụ: <code>break 15;</code>).
</div>
`,
    defaultCode: `fn main() {
    // 1. let mut counter = 0;

    // 2. let result = loop {
    // 3. Tăng counter
    // 4. Kiểm tra điều kiện if counter == 10 thì break với kết quả
    // };

    // 5. In kết quả

}
`
};
