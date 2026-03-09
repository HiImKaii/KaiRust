import { Lesson } from '../../courses';

export const ch05_05_ex: Lesson = {
    id: 'ch05-05-ex',
    title: 'Bài tập 5.5: Unit-Like Structs',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Unit-Like Structs - AlwaysEqual',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Hãy định nghĩa một Unit-Like Struct tên là AlwaysEqual. Đây là loại struct không có bất kỳ field nào, chỉ có một tên và kết thúc bằng dấu chấm phẩy (;). Sau đó tạo một instance của nó và in thông báo thành công.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'In ra: "AlwaysEqual instance created successfully!"',
    constraints: [
        { field: 'AlwaysEqual', condition: 'Unit-Like Struct không có fields' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'AlwaysEqual instance created successfully!',
            explanation: 'Tạo một instance của Unit-Like Struct AlwaysEqual'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Unit-Like Structs</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa Unit-Like Struct (struct không có fields)</li>
    <li>Tạo instance của Unit-Like Struct</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Cú pháp: <code>struct Tên;</code> (không có fields, không có dấu ngoặc nhọn)</li>
    <li>Khởi tạo: <code>let tên_biến = Tên;</code></li>
    <li>Unit-Like Struct hữu ích khi cần implement trait mà không cần lưu trữ dữ liệu</li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa Unit-Like Struct tên là AlwaysEqual
// Cú pháp: struct Tên;

fn main() {
    // TODO: Tạo một instance của AlwaysEqual
    // let subject = AlwaysEqual;

    // In thông báo thành công
    println!("AlwaysEqual instance created successfully!");
}
`,
    expectedOutput: 'AlwaysEqual instance created successfully!',
    testCases: [
        {
            input: '',
            expectedOutput: 'AlwaysEqual instance created successfully!',
            description: 'Tạo và in thông báo từ Unit-Like Struct'
        }
    ]
};
