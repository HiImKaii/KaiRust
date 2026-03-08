import { Lesson } from '../../courses';

export const ch04_01_ex3: Lesson = {
    id: 'ch04_01_ex3',
    title: 'Bài tập: Trả lại Ownership',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Trả lại Ownership',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Viết hàm trả về ownership của String.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra: hello',
    constraints: [
        { field: 'Yêu cầu', condition: 'Hàm trả về String' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'hello'
        }
    ],

    content: `
<p>Khi một function kết thúc, tất cả các biến local sẽ rơi vào trạng thái <strong>drop</strong>. Giải pháp là bắt hàm trả về ownership.</p>
`,
    defaultCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_returns(s1);
    println!("{}", s2);
}

fn takes_and_returns(a_string: String) -> String {
    a_string
}
`,
    expectedOutput: 'hello'
};
