import { Lesson } from '../../courses';

export const ch06_05_ex: Lesson = {
    id: 'ch06-05-ex',
    title: 'Bài tập 6.5: Enum với dữ liệu',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng Enum với dữ liệu để mô hình hóa các tình huống thực tế!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>Shape</code> với:
    <ul>
      <li><code>Circle(f64)</code> - bán kính</li>
      <li><code>Rectangle { width: f64, height: f64 }</code> - chiều rộng và chiều cao</li>
      <li><code>Triangle { base: f64, height: f64 }</code> - đáy và chiều cao</li>
    </ul>
  </li>
  <li>Tạo hàm <code>area(shape: &Shape) -> f64</code> tính diện tích</li>
</ol>
<h3 class="task-heading">Công thức</h3>
<ul>
  <li>Diện tích hình tròn: π * r²</li>
  <li>Diện tích hình chữ nhật: width * height</li>
  <li>Diện tích hình tam giác: base * height / 2</li>
</ul>
`,
    defaultCode: `// Định nghĩa enum Shape với dữ liệu

// Tính diện tích

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Shape::Circle(2.0)',
            expectedOutput: '12.57',
            description: 'Tính diện tích hình tròn'
        },
        {
            input: 'Shape::Rectangle { width: 3.0, height: 4.0 }',
            expectedOutput: '12.00',
            description: 'Tính diện tích hình chữ nhật'
        }
    ]
};
