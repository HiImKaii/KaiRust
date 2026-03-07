import { Lesson } from '../../courses';

export const ch08_05_ex: Lesson = {
    id: 'ch08-05-ex',
    title: 'Bài tập 8.5: Iterators',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với Iterators!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo iterator từ 1 đến 10</li>
  <li>Lọc các số chia hết cho 3</li>
  <li>Bình phương các số còn lại</li>
  <li>Tính tổng</li>
</ol>
`,
    defaultCode: `fn main() {
    // Chain iterator operations
    // Lọc số chia hết cho 3, bình phương, tính tổng

    // Iterator với collect

    // enumerate

    // zip
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'filter + map + sum',
            expectedOutput: '299',
            description: 'Chain iterator operations'
        }
    ]
};
