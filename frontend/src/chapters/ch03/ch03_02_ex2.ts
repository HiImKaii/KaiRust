import { Lesson } from '../../courses';

export const ch03_02_ex2: Lesson = {
    id: 'ch03-02-ex2',
    title: 'Bài tập 3.2.2: Các phép toán số học (Arithmetic)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Phép toán số học',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Tính toán với hai số nguyên:
- Số a = 43
- Số b = 5

Tính và in ra:
1. Phép chia lấy nguyên (quotient) của a cho b
2. Phép lấy phần dư (remainder/modulo) của a cho b

Hai kết quả cách nhau bằng một khoảng trắng.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng: "8 3" (trong đó 8 là thương, 3 là phần dư)',

    // Các ràng buộc
    constraints: [
        { field: 'Số a', condition: 'Giá trị = 43' },
        { field: 'Số b', condition: 'Giá trị = 5' },
        { field: 'Quotient', condition: 'Phép chia lấy nguyên (a / b)' },
        { field: 'Remainder', condition: 'Phép lấy phần dư (a % b)' }
    ],

    // Ví dụ
    examples: [
        {
            input: '',
            output: '8 3',
            explanation: '43 / 5 = 8 (thương), 43 % 5 = 3 (dư)'
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

