import { Lesson } from '../../courses';

export const ch04_02_ex1: Lesson = {
    id: 'ch04_02_ex1',
    title: 'Bài tập: Tham chiếu Bất biến (Immutable Borrow)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Tham chiếu Bất biến',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Viết hàm nhận &String và trả về độ dài.',
    inputFormat: 'Cho sẵn chuỗi "Tôi yêu Rust"',
    outputFormat: 'In độ dài chuỗi',
    constraints: [
        { field: 'Tham số', condition: '&String' }
    ],
    examples: [
        {
            input: 'Tôi yêu Rust',
            output: '14'
        }
    ],

    content: `
<p>Thay vì move ownership, ta dùng immutable borrow với <code>&</code>.</p>
`,
    defaultCode: `fn main() {
    let text = String::from("Tôi yêu Rust");
    let length = calculate_len(&text);
    println!("{}", length);
}

fn calculate_len(s: &String) -> usize {
    s.len()
}
`,
    expectedOutput: '14'
};
