import { Lesson } from '../../courses';

export const ch03_01_ex3: Lesson = {
    id: 'ch03-01-ex3',
    title: 'Bài tập 3.1.3: Hằng số (Constants)',
    duration: '5 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Hằng số (Constants)',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Khai báo hằng số SPEED_OF_LIGHT với giá trị 299792458 và kiểu u32.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra giá trị hằng số',
    constraints: [
        { field: 'Tên', condition: 'SPEED_OF_LIGHT (viết hoa, có gạch dưới)' },
        { field: 'Giá trị', condition: '299792458' },
        { field: 'Kiểu', condition: 'u32 (bắt buộc)' },
        { field: 'Phạm vi', condition: 'Toàn cục (bên ngoài main)' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '299792458'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Dùng từ khóa <code>const</code> thay vì <code>let</code> và chữ viết hoa phân tách bằng dấu gạch dưới cho tên biến. Bắt buộc phải thêm <code>: u32</code>.
</div>
`,
    defaultCode: `// Khai báo hằng số ở phạm vi toàn cục
const SPEED_OF_LIGHT: u32 = 299792458;

fn main() {
    println!("{}", SPEED_OF_LIGHT);
}
`
};
