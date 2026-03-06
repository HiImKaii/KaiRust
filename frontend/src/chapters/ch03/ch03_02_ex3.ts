import { Lesson } from '../../courses';

export const ch03_02_ex3: Lesson = {
    id: 'ch03-02-ex3',
    title: 'Bài tập 3.2.3: Truy cập phần tử Mảng (Array)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Mảng trong Rust có kích thước cố định. Bạn có biết phần tử đầu tiên luôn bắt đầu bằng chỉ số 0 không?</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main</code>, tôi đã cho sẵn một mảng <code>months</code> chứa số ngày của các tháng trong năm dương lịch.</li>
  <li>Hãy lấy giá trị số ngày của <strong>tháng đầu tiên</strong> (Tháng 1) lưu vào biến <code>first_month_days</code>.</li>
  <li>Lấy giá trị số ngày của <strong>tháng cuối cùng</strong> (Tháng 12) lưu vào biến <code>last_month_days</code>.</li>
  <li>Cộng hai giá trị lại bằng một biến <code>total</code> và in <code>total</code> ra màn hình.</li>
</ol>
<div class="cyber-alert info">
  <strong>Chỉ mục (Index):</strong> Dùng cặp ngoặc vuông <code>[]</code> để truy cập. Ví dụ: <code>my_array[0]</code>. Lưu ý: mảng có 12 phần tử thì phần tử cuối cùng sẽ ở vị trí nào?
</div>
`,
    defaultCode: `fn main() {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

}
`
};
