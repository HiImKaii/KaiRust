import { Lesson } from '../../courses';

export const ch03_03_ex2: Lesson = {
    id: 'ch03-03-ex2',
    title: 'Bài tập 3.3.2: Hàm trả về nhiều giá trị (Tuple)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Hàm trả về Tuple',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Viết hàm calculate_length nhận String và trả về tuple (String, usize) chứa chuỗi và độ dài.',
    inputFormat: 'Không có input (gọi với "hello")',
    outputFormat: 'In ra chuỗi và độ dài',
    constraints: [
        { field: 'Tham số', condition: 'String s' },
        { field: 'Return type', condition: '(String, usize)' }
    ],
    examples: [
        {
            input: 'hello',
            output: 'hello 5'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Tuple trong Rust có dạng <code>(giá trị 1, giá trị 2)</code>. Hãy dùng tuple làm biểu thức cuối cùng (expression) để trả về từ hàm.
</div>
`,
    defaultCode: `fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("{} {}", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let len = s.len();
    (s, len)
}
`
};
