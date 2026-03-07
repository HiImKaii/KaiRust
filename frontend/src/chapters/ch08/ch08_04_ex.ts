import { Lesson } from '../../courses';

export const ch08_04_ex: Lesson = {
    id: 'ch08-04-ex',
    title: 'Bài tập 8.4: HashMap',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với HashMap!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo HashMap lưu trữ tên và điểm số</li>
  <li>Đếm tần suất xuất hiện của các ký tự</li>
  <li>Tìm kiếm và cập nhật giá trị</li>
</ol>
`,
    defaultCode: `use std::collections::HashMap;

fn main() {
    // HashMap lưu điểm

    // Đếm tần suất ký tự

    // Tìm và cập nhật
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'char_count of "hello"',
            expectedOutput: 'l: 2',
            description: 'Đếm ký tự'
        }
    ]
};
