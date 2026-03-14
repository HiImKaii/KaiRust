import { Lesson } from '../../courses';

export const ch08_01_ex: Lesson = {
    id: 'ch08-01-ex',
    title: 'Bài tập 8.1: Vector cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với Vector!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo vector chứa các số từ 1 đến 5</li>
  <li>Tính tổng các phần tử</li>
  <li>Tìm giá trị lớn nhất</li>
  <li>Thêm phần tử và xóa phần tử cuối</li>
</ol>
`,
    defaultCode: `fn main() {
    // Tạo vector từ 1 đến 5

    // Tính tổng

    // Tìm max

    // Thêm phần tử

    // Xóa phần tử cuối
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'numbers.iter().sum()',
            expectedOutput: '15',
            description: 'Tính tổng các số từ 1 đến 5 = 15'
        },
        {
            input: 'max',
            expectedOutput: '5',
            description: 'Tìm giá trị lớn nhất = 5'
        },
        {
            input: 'push',
            expectedOutput: 'true',
            description: 'Thêm phần tử vào vector'
        },
        {
            input: 'pop',
            expectedOutput: 'true',
            description: 'Xóa phần tử cuối khỏi vector'
        }
    ]
};
