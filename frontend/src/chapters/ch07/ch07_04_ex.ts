import { Lesson } from '../../courses';

export const ch07_04_ex: Lesson = {
    id: 'ch07-04-ex',
    title: 'Bài tập 7.4: Tổ chức Library',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành tổ chức một thư viện hoàn chỉnh!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo library với cấu trúc:
    <ul>
      <li><code>math::basic</code>: add, subtract, multiply, divide</li>
      <li><code>math::advanced</code>: power, sqrt, factorial</li>
      <li><code>string::uppercase</code>, <code>string::reverse</code></li>
    </ul>
  </li>
  <li>Export các functions cần thiết với pub</li>
</ol>
`,
    defaultCode: `// Tổ chức library

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'math::basic::add(5, 3)',
            expectedOutput: '8',
            description: 'Cộng hai số'
        }
    ]
};
