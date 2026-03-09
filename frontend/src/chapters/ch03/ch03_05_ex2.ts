import { Lesson } from '../../courses';

export const ch03_05_ex2: Lesson = {
    id: 'ch03-05-ex2',
    title: 'Bài tập 3.5.2: Gán giá trị kết quả từ If (If Let)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'If expression as value',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Sử dụng if-else như biểu thức để gán giá trị cho biến. Nếu condition = true thì gán 5, else gán 6.',
    inputFormat: 'condition = true',
    outputFormat: 'In ra giá trị number',
    constraints: [
        { field: 'condition', condition: 'true' }
    ],
    examples: [
        {
            input: 'true',
            output: '5'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Gợi ý Quan trọng:</strong> Đừng quên dấu chấm phẩy (<code>;</code>) ở cuối câu lệnh <code>let</code> sau khi kết thúc cả khối block <code>}</code> của biểu thức if nhé!
</div>
`,
    defaultCode: `fn main() {
    let condition = true;

    let number = if condition {
        5
    } else {
        6
    };

    println!("{}", number);
}
`
};
