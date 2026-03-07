import { Lesson } from '../../courses';

export const ch07_05_ex: Lesson = {
    id: 'ch07-05-ex',
    title: 'Bài tập 7.5: Xây dựng Library hoàn chỉnh',
    duration: '35 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy xây dựng một library hoàn chỉnh với các module và exports!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo library <code>calculator</code> với:
    <ul>
      <li><code>basic</code>: add, sub, mul, div (trả về Result)</li>
      <li><code>advanced</code>: mod, pow, sqrt</li>
      <li><code>trig</code>: sin, cos, tan</li>
    </ul>
  </li>
  <li>Tạo struct <code>Calculator</code> với methods</li>
  <li>Sử dụng pub use để re-export</li>
</ol>
`,
    defaultCode: `// Xây dựng Calculator library

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Calculator::new().add(10, 5)',
            expectedOutput: 'Ok(15)',
            description: 'Cộng với Calculator'
        }
    ]
};
