import { Lesson } from '../../courses';

export const ch05_04_ex: Lesson = {
    id: 'ch05-04-ex',
    title: 'Bài tập 5.4: Tuple Structs - Color và Point',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tuple Structs - Color và Point',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Hãy định nghĩa hai Tuple Structs: Color (màu sắc) với 3 thành phần R, G, B và Point (điểm) với 3 tọa độ x, y, z. Tạo một màu đen Color(0, 0, 0) và một điểm gốc Point(0, 0, 0). Sau đó truy cập các thành phần bằng index (".0", ".1", ".2") và destructure Point thành các biến x, y, z riêng biệt.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: "Black color: R=0, G=0, B=0"\nDòng 2: "Origin point: x=0, y=0, z=0"\nDòng 3: "Destructured point: x=0, y=0, z=0"',
    constraints: [
        { field: 'Color', condition: 'Tuple struct với 3 tham số i32 (R, G, B)' },
        { field: 'Point', condition: 'Tuple struct với 3 tham số i32 (x, y, z)' }
    ],
    examples: [
        {
            input: '',
            output: 'Black color: R=0, G=0, B=0\nOrigin point: x=0, y=0, z=0\nDestructured point: x=0, y=0, z=0',
            explanation: 'Tạo Color và Point, truy cập bằng index và destructure'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Tuple Structs</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa Tuple Struct (struct không có tên field)</li>
    <li>Truy cập các phần tử bằng index (.0, .1, .2)</li>
    <li>Destructure tuple struct thành các biến riêng biệt</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Cú pháp Tuple Struct: <code>struct Tên(i32, i32, i32);</code></li>
    <li>Truy cập: <code>tuple.0</code>, <code>tuple.1</code>, <code>tuple.2</code></li>
    <li>Destructure: <code>let Tên(a, b, c) = tuple;</code></li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa Tuple Struct Color với 3 tham số i32

// TODO: Định nghĩa Tuple Struct Point với 3 tham số i32

fn main() {
    // TODO: Tạo Color đen: Color(0, 0, 0)
    // TODO: let black = Color(...);

    // TODO: Tạo Point gốc tọa độ: Point(0, 0, 0)
    // TODO: let origin = Point(...);

    // TODO: In thông tin color sử dụng index .0, .1, .2
    // Format: "Black color: R={}, G={}, B={}"
    // TODO: println!("Black color: R={}, G={}, B={}", ..., ..., ...);

    // TODO: In thông tin point sử dụng index
    // Format: "Origin point: x={}, y={}, z={}"
    // TODO: println!("Origin point: x={}, y={}, z={}", ..., ..., ...);

    // Destructure Point thành các biến x, y, z
    // TODO: let Point(x, y, z) = origin;

    // TODO: In thông tin đã destructure
    // Format: "Destructured point: x={}, y={}, z={}"
    // TODO: println!("Destructured point: x={}, y={}, z={}", x, y, z);
}
`,
    expectedOutput: 'Black color: R=0, G=0, B=0\nOrigin point: x=0, y=0, z=0\nDestructured point: x=0, y=0, z=0',
    testCases: [
        {
            input: '',
            expectedOutput: 'Black color: R=0, G=0, B=0\nOrigin point: x=0, y=0, z=0\nDestructured point: x=0, y=0, z=0',
            description: 'Tạo và in Tuple Struct Color và Point'
        }
    ]
};
