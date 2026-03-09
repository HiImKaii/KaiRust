import { Lesson } from '../../courses';

export const ch05_08_ex: Lesson = {
    id: 'ch05-08-ex',
    title: 'Bài tập 5.8: Method can_hold() cho Rectangle',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Method can_hold() cho Rectangle',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa một struct Rectangle với width và height kiểu u32. Trong impl Rectangle, định nghĩa method area(&self) trả về diện tích và method can_hold(&self, other: &Rectangle) trả về bool. Method can_hold trả về true nếu hình chữ nhật hiện tại (self) có thể chứa được hình chữ nhật khác (other), tức là cả width và height của self đều lớn hơn width và height của other. Tạo rect1(30, 50) và rect2(10, 40), kiểm tra xem rect1 có thể chứa rect2 không.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'In ra: "Can rect1 hold rect2? true"',
    constraints: [
        { field: 'Rectangle', condition: 'Struct với width: u32, height: u32' },
        { field: 'area method', condition: '&self -> u32' },
        { field: 'can_hold method', condition: '&self, &Rectangle -> bool' }
    ],
    examples: [
        {
            input: '',
            output: 'Can rect1 hold rect2? true',
            explanation: 'rect1(30,50) có width=30>10 và height=50>40, nên có thể chứa rect2(10,40)'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Method can_hold() cho Rectangle</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa method với nhiều tham số</li>
    <li>So sánh các field giữa hai instance</li>
    <li>Trả về giá trị boolean</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Method can_hold nhận 2 tham số: &self và &Rectangle</li>
    <li>Trả về true khi: self.width > other.width && self.height > other.height</li>
    <li>Gọi method: rect1.can_hold(&rect2)</li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với width: u32, height: u32
// Thêm #[derive(Debug)]

// TODO: Định nghĩa impl Rectangle với:
// 1. Method area(&self) -> u32 (diện tích = width * height)
// 2. Method can_hold(&self, other: &Rectangle) -> bool
//    Trả về true nếu self.width > other.width VÀ self.height > other.height

fn main() {
    // TODO: Tạo rect1 với width = 30, height = 50
    // TODO: let rect1 = Rectangle { ... };

    // TODO: Tạo rect2 với width = 10, height = 40
    // TODO: let rect2 = Rectangle { ... };

    // TODO: Kiểm tra rect1 có thể chứa rect2 không
    // Format: "Can rect1 hold rect2? {}"
    // TODO: println!("Can rect1 hold rect2? {}", ...);
}
`,
    expectedOutput: 'Can rect1 hold rect2? true',
    testCases: [
        {
            input: '',
            expectedOutput: 'Can rect1 hold rect2? true',
            description: 'rect1(30,50) chứa được rect2(10,40)'
        }
    ]
};
