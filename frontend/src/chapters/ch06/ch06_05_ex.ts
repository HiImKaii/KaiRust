import { Lesson } from '../../courses';

export const ch06_05_ex: Lesson = {
    id: 'ch06-05-ex',
    title: 'Bài tập 6.5: Enum với dữ liệu',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Enum với dữ liệu - Shape',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Thực hành sử dụng Enum với dữ liệu để mô hình hóa các hình học.

Yêu cầu:
1. Định nghĩa enum Shape với:
   - Circle(f64) - bán kính
   - Rectangle { width: f64, height: f64 } - chiều rộng và chiều cao
   - Triangle { base: f64, height: f64 } - đáy và chiều cao
2. Viết hàm area(shape: &Shape) -> f64 tính diện tích

Công thức:
- Hình tròn: π * r²
- Hình chữ nhật: width * height
- Hình tam giác: base * height / 2`,

    inputFormat: 'Gọi hàm area với các Shape khác nhau',
    outputFormat: 'In ra diện tích tương ứng',

    constraints: [
        { field: 'Enum Shape', condition: '3 variant: Circle(f64), Rectangle{width:f64,height:f64}, Triangle{base:f64,height:f64}' },
        { field: 'Hàm area', condition: 'Trả về f64, tính diện tích theo công thức' }
    ],

    examples: [
        {
            input: 'Shape::Circle(2.0)',
            output: '12.57',
            explanation: 'Diện tích hình tròn bán kính 2: π * 2² ≈ 12.57'
        },
        {
            input: 'Shape::Rectangle { width: 3.0, height: 4.0 }',
            output: '12.00',
            explanation: 'Diện tích hình chữ nhật: 3 * 4 = 12'
        }
    ],

    content: `
<h3>Công thức tính diện tích</h3>
<ul>
  <li>Hình tròn: π * r²</li>
  <li>Hình chữ nhật: width * height</li>
  <li>Hình tam giác: base * height / 2</li>
</ul>
`,

    defaultCode: `// TODO: Định nghĩa enum Shape

// TODO: Viết hàm area nhận &Shape, trả về f64

fn main() {
    println!("{:.2}", area(&Shape::Circle(2.0)));
    println!("{:.2}", area(&Shape::Rectangle { width: 3.0, height: 4.0 }));
}
`,

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
        },
        {
            input: 'Shape::Triangle { base: 6.0, height: 4.0 }',
            expectedOutput: '12.00',
            description: 'Tính diện tích hình tam giác'
        }
    ]
};
