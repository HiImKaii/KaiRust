import { Lesson } from '../../courses';

export const ch06_04_ex: Lesson = {
    id: 'ch06-04-ex',
    title: 'Bài tập 6.4: Enum cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành định nghĩa và sử dụng Enum cơ bản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>TrafficLight</code> với các variant: Red, Yellow, Green</li>
  <li>Tạo hàm <code>get_action(light: &TrafficLight) -> &str</code> trả về hành động tương ứng:
    <ul>
      <li>Red → "Dừng lại"</li>
      <li>Yellow → "Chuẩn bị dừng"</li>
      <li>Green → "Đi tiếp"</li>
    </ul>
  </li>
</ol>
`,
    defaultCode: `// Định nghĩa enum TrafficLight

// Tạo hàm get_action trả về hành động tương ứng

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'TrafficLight::Red',
            expectedOutput: 'Dừng lại',
            description: 'Đèn đỏ phải dừng lại'
        },
        {
            input: 'TrafficLight::Green',
            expectedOutput: 'Đi tiếp',
            description: 'Đèn xanh được đi tiếp'
        }
    ]
};
