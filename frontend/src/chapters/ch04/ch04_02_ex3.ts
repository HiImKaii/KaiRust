import { Lesson } from '../../courses';

export const ch04_02_ex3: Lesson = {
    id: 'ch04_02_ex3',
    title: 'Bài tập: Tránh Xung đột Tham chiếu (Reference Rules)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Tránh xung đột tham chiếu',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Sửa lỗi borrowing: không thể vừa immutable borrow vừa mutable borrow cùng lúc.',
    inputFormat: 'Cho sẵn String "Rust"',
    outputFormat: 'In kết quả',
    constraints: [
        { field: 'Yêu cầu', condition: 'Tách biến trước khi dùng mutable' }
    ],
    examples: [
        {
            input: 'Rust',
            output: 'Rust'
        }
    ],

    content: `
<p>Không thể vừa immutable borrow vừa mutable borrow cùng lúc. Cần tách scope.</p>
`,
    defaultCode: `fn main() {
    let mut s = String::from("Rust");

    let r1 = &s;
    let r2 = &s;
    println!("{} {}", r1, r2);

    let r3 = &mut s;
    println!("{}", r3);
}
`,
    expectedOutput: 'Rust Rust\nRust'
};
