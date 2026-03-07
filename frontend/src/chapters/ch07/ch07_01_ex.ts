import { Lesson } from '../../courses';

export const ch07_01_ex: Lesson = {
    id: 'ch07-01-ex',
    title: 'Bài tập 7.1: Modules cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành định nghĩa và sử dụng Modules!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo module <code>greeting</code> với hàm <code>say_hello(name: &str)</code></li>
  <li>Tạo module <code>math</code> với các hàm: <code>add</code>, <code>subtract</code>, <code>multiply</code></li>
  <li>Tạo module <code>utils</code> bên trong <code>math</code> với hàm <code>abs_diff(a, b)</code></li>
</ol>
`,
    defaultCode: `// Tạo module greeting

// Tạo module math với nested module utils

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'greeting::say_hello("World")',
            expectedOutput: 'Hello, World!',
            description: 'Gọi hàm từ module'
        }
    ]
};
