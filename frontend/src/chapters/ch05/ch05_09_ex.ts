import { Lesson } from '../../courses';

export const ch05_09_ex: Lesson = {
    id: 'ch05-09-ex',
    title: 'Bài tập 5.9: Associated Function square()',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Associated Function square() cho Rectangle',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa một struct Rectangle với width và height kiểu u32. Trong impl Rectangle, định nghĩa method area(&self) trả về diện tích. Sau đó định nghĩa một Associated Function square(size: u32) -> Self để tạo một hình vuông với width = height = size. Sử dụng từ khóa Self để tham chiếu đến kiểu hiện tại. Gọi associated function bằng cú pháp Rectangle::square(3).`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: "Square: Rectangle { width: 3, height: 3 }"\nDòng 2: "Square area: 9"',
    constraints: [
        { field: 'Rectangle', condition: 'Struct với width: u32, height: u32' },
        { field: 'area method', condition: '&self -> u32' },
        { field: 'square function', condition: 'fn square(size: u32) -> Self' }
    ],
    examples: [
        {
            input: '',
            output: 'Square: Rectangle { width: 3, height: 3 }\nSquare area: 9',
            explanation: 'Tạo hình vuông cạnh 3, tính diện tích = 3*3 = 9'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Associated Function square()</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa Associated Function (hàm liên kết)</li>
    <li>Sử dụng từ khóa Self để tham chiếu đến kiểu hiện tại</li>
    <li>Gọi Associated Function bằng cú pháp ::</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Associated Function không có tham số self, thường dùng làm constructor</li>
    <li>Cú pháp: <code>fn square(size: u32) -> Self { Self { width: size, height: size } }</code></li>
    <li>Gọi: <code>Rectangle::square(3)</code></li>
    <li>Self viết hoa tham chiếu đến kiểu Rectangle</li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với width: u32, height: u32
// Thêm #[derive(Debug)]

// TODO: Định nghĩa impl Rectangle với:
// 1. Method area(&self) -> u32 (diện tích = width * height)
// 2. Associated Function square(size: u32) -> Self
//    Trả về Self { width: size, height: size }

fn main() {
    // Gọi associated function square bằng cú pháp ::
    // TODO: let sq = Rectangle::square(3);

    // TODO: In thông tin hình vuông
    // TODO: println!("Square: {:?}", sq);

    // TODO: Tính và in diện tích
    // TODO: println!("Square area: {}", sq.area());
}
`,
    expectedOutput: 'Square: Rectangle { width: 3, height: 3 }\nSquare area: 9',
    testCases: [
        {
            input: '',
            expectedOutput: 'Square: Rectangle { width: 3, height: 3 }\nSquare area: 9',
            description: 'Tạo hình vuông cạnh 3 và tính diện tích'
        }
    ]
};
