import { Lesson } from '../../courses';

export const ch03_02_ex2: Lesson = {
    id: 'ch03-02-ex2',
    title: 'Bài tập 3.2.2: Các phép toán số học (Arithmetic)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Phép toán số học',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Tính phép chia lấy nguyên và phép modulo của 43 cho 5.',
    inputFormat: 'Không có input',
    outputFormat: 'In quotient và remainder cách nhau bởi dấu cách',
    constraints: [
        { field: 'a', condition: '43' },
        { field: 'b', condition: '5' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '8 3'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Toán tử:</strong> Phép chia dùng dấu <code>/</code>, phép lấy số dư dùng dấu <code>%</code> (modulo).
</div>
`,
    defaultCode: `fn main() {
    let a = 43;
    let b = 5;

    // Phép chia lấy nguyên
    let quotient = a / b;

    // Phép modulo (lấy phần dư)
    let remainder = a % b;

    println!("{} {}", quotient, remainder);
}
`
};

