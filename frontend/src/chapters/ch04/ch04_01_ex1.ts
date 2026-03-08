import { Lesson } from '../../courses';

export const ch04_01_ex1: Lesson = {
    id: 'ch04_01_ex1',
    title: 'Bài tập: Lỗi Di chuyển (Move Error)',
    duration: '5 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Lỗi Di chuyển (Move Error)',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sửa lỗi di chuyển (move) trong Rust. Không dùng .clone().',
    inputFormat: 'Không có input',
    outputFormat: 'In ra: Rust',
    constraints: [
        { field: 'Yêu cầu', condition: 'Không dùng .clone(), xóa/comment dòng lỗi' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Rust'
        }
    ],

    content: `
<p>Hãy cùng quan sát xem hệ thống mượn bộ nhớ của Rust hoạt động ra sao. Trong đoạn code dưới đây, biến \`s1\` đang bị di chuyển (move) giá trị quản lý sang \`s2\`, thế nên \`s1\` sẽ không hợp lệ ở dòng \`println!\` thứ 2.</p>
`,
    defaultCode: `fn main() {
    let s1 = String::from("Rust");
    let s2 = s1;

    println!("{}", s2);
    // Xóa/comment dòng println!(s1) vì s1 đã bị move
}
`,
    expectedOutput: 'Rust'
};
