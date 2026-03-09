import { Lesson } from '../../courses';

export const ch02_01_ex: Lesson = {
    id: 'ch02-01-ex',
    title: 'Bài tập 2.1: Tạo biến String',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tạo biến String',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Viết chương trình khai báo biến guess có kiểu dữ liệu String, gán giá trị "test" cho biến đó, sau đó in ra màn hình.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra một dòng duy nhất: test',
    constraints: [
        { field: 'guess', condition: 'Phải sử dụng kiểu String, không dùng &str' }
    ],
    examples: [
        {
            input: '',
            output: 'test',
            explanation: 'Khai báo biến String với let mut, gán giá trị "test", in ra màn hình'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Trong Rust, để tạo một biến có thể thay đổi (mutable), ta sử dụng từ khóa \`mut\`. Để tạo một String rỗng, ta dùng \`String::new()\`. Để gán giá trị, dùng \`String::from("...")\` hoặc \`"...".to_string()\`.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Khai báo biến \`guess\` kiểu \`String\` với \`let mut\`</li>
    <li>Gán giá trị "test" cho biến</li>
    <li>In ra màn hình bằng \`println!\`</li>
</ul>
`,
    defaultCode: `fn main() {
    // Khai báo biến mutable kiểu String
    // let mut guess = String::new();

    // Gán giá trị "test"
    // guess = String::from("test");

    // In ra màn hình
    // println!("{}", guess);
}
`,
    testCases: [
        {
            input: '',
            expectedOutput: 'test',
            description: 'Tạo biến String và in ra'
        }
    ]
};
