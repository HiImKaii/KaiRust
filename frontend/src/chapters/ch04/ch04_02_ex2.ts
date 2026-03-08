import { Lesson } from '../../courses';

export const ch04_02_ex2: Lesson = {
    id: 'ch04_02_ex2',
    title: 'Bài tập: Tham chiếu Có thể thay đổi (Mutable Borrow)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Tham chiếu Mutable',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Dùng &mut để thay đổi chuỗi trong hàm.',
    inputFormat: 'Cho sẵn "Xin chào"',
    outputFormat: 'In: Xin chào, bạn tôi!',
    constraints: [
        { field: 'Yêu cầu', condition: 'Dùng &mut String' }
    ],
    examples: [
        {
            input: 'Xin chào',
            output: 'Xin chào, bạn tôi!'
        }
    ],

    content: `
<p>Dùng <code>&mut</code> để cho phép hàm thay đổi giá trị.</p>
`,
    defaultCode: `fn main() {
    let mut message = String::from("Xin chào");
    append_text(&mut message);
    println!("{}", message);
}

fn append_text(s: &mut String) {
    s.push_str(", bạn tôi!");
}
`,
    expectedOutput: 'Xin chào, bạn tôi!'
};
