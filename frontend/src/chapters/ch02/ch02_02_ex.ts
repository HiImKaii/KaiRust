import { Lesson } from '../../courses';

export const ch02_02_ex: Lesson = {
    id: 'ch02-02-ex',
    title: 'Bài tập 2.2: Đọc input từ người dùng',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Đọc input từ người dùng',
    memoryLimit: '256MB',
    timeLimit: '500ms',
    problemDescription: `Viết chương trình cho phép người dùng nhập vào một chuỗi, sau đó in chuỗi đó ra màn hình.`,
    inputFormat: 'Một dòng văn bản bất kỳ',
    outputFormat: 'In ra chuỗi vừa nhập',
    constraints: [],
    examples: [
        {
            input: 'Hello',
            output: 'Hello',
            explanation: 'In ra chuỗi mà người dùng đã nhập'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Để đọc dữ liệu từ bàn phím trong Rust, ta sử dụng module \`std::io\`. Dùng \`read_line\` để đọc và \`expect\` để xử lý lỗi.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Import module \`std::io\`</li>
    <li>Tạo biến \`String\` mutable để lưu trữ input</li>
    <li>Đọc dữ liệu từ bàn phím</li>
    <li>In ra màn hình (dùng \`.trim()\` để bỏ ký tự xuống dòng)</li>
</ul>
`,
    defaultCode: `use std::io;

fn main() {
    // Tạo biến mutable
    // let mut input = String::new();

    // Đọc dữ liệu
    // io::stdin()
    //     .read_line(&mut input)
    //     .expect("Failed to read line");

    // In ra (dùng trim() để bỏ newline)
    // println!("{}", input.trim());
}
`,
    expectedOutput: 'Hello',
    testCases: [
        {
            input: 'Hello',
            expectedOutput: 'Hello',
            description: 'Đọc và in chuỗi'
        },
        {
            input: 'Rust',
            expectedOutput: 'Rust',
            description: 'Đọc và in chuỗi'
        }
    ]
};
