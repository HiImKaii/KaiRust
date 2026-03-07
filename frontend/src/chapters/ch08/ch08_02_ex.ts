import { Lesson } from '../../courses';

export const ch08_02_ex: Lesson = {
    id: 'ch08-02-ex',
    title: 'Bài tập 8.2: Vector nâng cao',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành các thao tác nâng cao với Vector!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Lọc các số chẵn trong vector</li>
  <li>Đảo ngược vector</li>
  <li>Xóa các phần tử trùng lặp</li>
  <li>Tìm index của phần tử</li>
</ol>
`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Lọc số chẵn

    // Đảo ngược

    // Tìm index của phần tử

    // Xóa trùng lặp
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Filter evens',
            expectedOutput: '[2, 4, 6, 8, 10]',
            description: 'Lọc số chẵn'
        }
    ]
};
