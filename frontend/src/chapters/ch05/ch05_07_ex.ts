import { Lesson } from '../../courses';

export const ch05_07_ex: Lesson = {
    id: 'ch05-07-ex',
    title: 'Bài tập 5.7: Method area() cho Rectangle',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Method area() cho Rectangle',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa một struct Rectangle với width và height kiểu u32. Sau đó định nghĩa một impl block cho Rectangle với method area(&self) trả về diện tích (width * height). Tạo rect1 với width = 30, height = 50 và gọi method area() để tính diện tích.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'In ra: "The area of the rectangle is 1500 square pixels."',
    constraints: [
        { field: 'Rectangle', condition: 'Struct với width: u32, height: u32' },
        { field: 'impl Rectangle', condition: 'Method area(&self) -> u32' }
    ],
    examples: [
        {
            input: '',
            output: 'The area of the rectangle is 1500 square pixels.',
            explanation: 'Diện tích = 30 * 50 = 1500'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Method area() cho Rectangle</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa struct với impl block</li>
    <li>Định nghĩa method với tham số đầu tiên là &self</li>
    <li>Gọi method sử dụng dot notation</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Cú pháp impl: <code>impl Rectangle { fn area(&self) -> u32 { ... } }</code></li>
    <li>Gọi method: <code>rect1.area()</code></li>
    <li>Trong method, truy cập field: <code>self.width</code></li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với width: u32, height: u32
// Thêm #[derive(Debug)]

// TODO: Định nghĩa impl Rectangle với method area(&self) -> u32
// Diện tích = self.width * self.height

fn main() {
    // TODO: Tạo rect1 với width = 30, height = 50
    // TODO: let rect1 = Rectangle { ... };

    // Gọi method area() và in kết quả
    // Format: "The area of the rectangle is {} square pixels."
    // TODO: println!("The area of the rectangle is {} square pixels.", rect1.area());
}
`,
    expectedOutput: 'The area of the rectangle is 1500 square pixels.',
    testCases: [
        {
            input: '',
            expectedOutput: 'The area of the rectangle is 1500 square pixels.',
            description: 'Tính diện tích sử dụng method'
        }
    ]
};
