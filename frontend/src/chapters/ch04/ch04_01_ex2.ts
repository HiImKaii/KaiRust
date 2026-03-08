import { Lesson } from '../../courses';

export const ch04_01_ex2: Lesson = {
    id: 'ch04_01_ex2',
    title: 'Bài tập: Move vs Clone',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Move vs Clone',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sử dụng .clone() để tạo bản sao deep copy.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra cả hello và world',
    constraints: [
        { field: 'Yêu cầu', condition: 'Dùng .clone() để sao chép' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Chào buổi sáng\nChào buổi sáng'
        }
    ],

    content: `
<p>Trong Rust, để có được một bản sao toàn bộ (deep copy) thay vì Move, bạn dùng phương thức <code>.clone()</code>.</p>
`,
    defaultCode: `fn main() {
    let hello = String::from("Chào buổi sáng");

    let world = hello.clone();

    println!("{}", hello);
    println!("{}", world);
}
`,
    expectedOutput: 'Chào buổi sáng\nChào buổi sáng'
};
