import { Lesson } from '../../courses';

export const ch05_10_ex: Lesson = {
    id: 'ch05-10-ex',
    title: 'Bài tập 5.10: Multiple impl Blocks',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Multiple impl Blocks cho Rectangle',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa một struct Rectangle với width và height kiểu u32. Sử dụng NHIỀU impl blocks (ít nhất 2 blocks) để định nghĩa các methods. Impl block thứ nhất chứa method area(&self) -> u32. Impl block thứ hai chứa method can_hold(&self, other: &Rectangle) -> bool. Tạo rect1(30, 50) và rect2(10, 40), tính diện tích rect1 và kiểm tra rect1 có thể chứa rect2 không.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: "Area of rect1: 1500"\nDòng 2: "Can rect1 hold rect2? true"',
    constraints: [
        { field: 'Rectangle', condition: 'Struct với width: u32, height: u32' },
        { field: 'impl blocks', condition: 'Có ít nhất 2 impl blocks riêng biệt' },
        { field: 'area method', condition: 'Trong impl block thứ nhất' },
        { field: 'can_hold method', condition: 'Trong impl block thứ hai' }
    ],
    examples: [
        {
            input: '',
            output: 'Area of rect1: 1500\nCan rect1 hold rect2? true',
            explanation: 'rect1 có diện tích 30*50=1500, và rect1(30,50) có thể chứa rect2(10,40)'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Multiple impl Blocks</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Sử dụng nhiều impl blocks cho cùng một struct</li>
    <li>Phân nhóm methods theo chức năng</li>
    <li>Định nghĩa methods trong các impl blocks khác nhau</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Có thể có nhiều impl blocks cho cùng một struct</li>
    <li>Mỗi impl block có thể chứa các methods khác nhau</li>
    <li>Ví dụ: impl Rectangle { fn area(&self) } và impl Rectangle { fn can_hold(&self, other) }</li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với width: u32, height: u32
// Thêm #[derive(Debug)]

// TODO: Định nghĩa impl block THỨ NHẤT với method area(&self) -> u32
// Diện tích = width * height

// TODO: Định nghĩa impl block THỨ HAI với method can_hold(&self, other: &Rectangle) -> bool
// Trả về true nếu self.width > other.width VÀ self.height > other.height

fn main() {
    // TODO: Tạo rect1 với width = 30, height = 50
    // TODO: let rect1 = Rectangle { ... };

    // TODO: Tạo rect2 với width = 10, height = 40
    // TODO: let rect2 = Rectangle { ... };

    // TODO: Tính và in diện tích rect1
    // Format: "Area of rect1: {}"
    // TODO: println!("Area of rect1: {}", ...);

    // TODO: Kiểm tra rect1 có thể chứa rect2 không
    // Format: "Can rect1 hold rect2? {}"
    // TODO: println!("Can rect1 hold rect2? {}", ...);
}
`,
    expectedOutput: 'Area of rect1: 1500\nCan rect1 hold rect2? true',
    testCases: [
        {
            input: '',
            expectedOutput: 'Area of rect1: 1500\nCan rect1 hold rect2? true',
            description: 'Tính diện tích và kiểm tra có thể chứa với multiple impl blocks'
        }
    ]
};
