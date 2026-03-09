import { Lesson } from '../../courses';

export const ch05_06_ex: Lesson = {
    id: 'ch05-06-ex',
    title: 'Bài tập 5.6: Tính diện tích hình chữ nhật',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tính diện tích hình chữ nhật',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa một struct Rectangle với hai field: width (chiều rộng) và height (chiều cao), cả hai đều có kiểu u32. Sau đó viết một hàm area nhận vào tham chiếu bất biến của Rectangle (&Rectangle) và trả về diện tích (u32). Tạo một instance rect1 với width = 30, height = 50. Tính và in diện tích. Cuối cùng, in rect1 sử dụng định dạng Debug.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: "The area of the rectangle is 1500 square pixels."\nDòng 2: "rect1 is Rectangle { width: 30, height: 50 }"',
    constraints: [
        { field: 'Rectangle', condition: 'Struct với width: u32, height: u32' },
        { field: 'area function', condition: 'Nhận &Rectangle, trả về u32' }
    ],
    examples: [
        {
            input: '',
            output: 'The area of the rectangle is 1500 square pixels.\nrect1 is Rectangle { width: 30, height: 50 }',
            explanation: 'Tính diện tích = 30 * 50 = 1500 và in thông tin Rectangle'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Tính diện tích hình chữ nhật</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa struct Rectangle với width và height</li>
    <li>Sử dụng #[derive(Debug)] để có thể in struct ra màn hình</li>
    <li>Viết hàm tính diện tích nhận tham chiếu bất biến</li>
    <li>Gọi hàm và in kết quả</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Định nghĩa struct: <code>struct Rectangle { width: u32, height: u32 }</code></li>
    <li>Thêm <code>#[derive(Debug)]</code> để in được struct</li>
    <li>Hàm area: <code>fn area(rect: &Rectangle) -> u32 { rect.width * rect.height }</code></li>
    <li>In định dạng Debug: <code>println!("{:?}", rect1)</code></li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với:
// - width: u32
// - height: u32
// Thêm #[derive(Debug)] phía trên

// TODO: Viết hàm area nhận &Rectangle và trả về u32
// Diện tích = width * height

fn main() {
    // TODO: Tạo rect1 với width = 30, height = 50
    // TODO: let rect1 = Rectangle { ... };

    // TODO: Tính và in diện tích
    // Format: "The area of the rectangle is {} square pixels."
    // TODO: println!("The area of the rectangle is {} square pixels.", ...);

    // TODO: In rect1 sử dụng định dạng Debug
    // Format: "rect1 is {:?}"
    // TODO: println!("rect1 is {:?}", rect1);
}
`,
    expectedOutput: 'The area of the rectangle is 1500 square pixels.\nrect1 is Rectangle { width: 30, height: 50 }',
    testCases: [
        {
            input: '',
            expectedOutput: 'The area of the rectangle is 1500 square pixels.\nrect1 is Rectangle { width: 30, height: 50 }',
            description: 'Tính và in diện tích hình chữ nhật'
        }
    ]
};
