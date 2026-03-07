import { Lesson } from '../../courses';

export const ch08_03_ex: Lesson = {
    id: 'ch08-03-ex',
    title: 'Bài tập 8.3: Strings',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với Strings!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Đảo ngược một chuỗi</li>
  <li>Đếm số từ trong câu</li>
  <li>Kiểm tra palindrome</li>
  <li>Tìm và thay thế từ</li>
</ol>
`,
    defaultCode: `fn main() {
    // Đảo ngược chuỗi

    // Đếm số từ

    // Kiểm tra palindrome

    // Tìm và thay thế
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'reverse("hello")',
            expectedOutput: 'olleh',
            description: 'Đảo ngược chuỗi'
        }
    ]
};
