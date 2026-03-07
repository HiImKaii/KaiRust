import { Lesson } from '../../courses';

export const ch07_03_ex: Lesson = {
    id: 'ch07-03-ex',
    title: 'Bài tập 7.3: use và Paths',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng use và paths!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo cấu trúc module: <code>restaurant</code> → <code>front</code>, <code>back</code></li>
  <li>Trong <code>front</code>: module <code>hosting</code> với hàm <code>seat_customer()</code></li>
  <li>Trong <code>back</code>: module <code>kitchen</code> với hàm <code>cook_food()</code></li>
  <li>Sử dụng <code>use</code> để import và gọi các hàm</li>
  <li>Sử dụng <code>as</code> để đặt alias</li>
</ol>
`,
    defaultCode: `// Tạo cấu trúc module

// Sử dụng use và as

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'seat_customer()',
            expectedOutput: 'Seating customer...',
            description: 'Gọi hàm đã được use'
        }
    ]
};
