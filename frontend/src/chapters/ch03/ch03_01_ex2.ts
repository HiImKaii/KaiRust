import { Lesson } from '../../courses';

export const ch03_01_ex2: Lesson = {
    id: 'ch03-01-ex2',
    title: 'Bài tập 3.1.2: Shadowing (Che phủ biến)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Shadowing - Che phủ biến',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sử dụng kỹ thuật Shadowing để tạo biến, đổi kiểu và tính toán.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra giá trị cuối cùng của secret_number',
    constraints: [
        { field: 'Bước 1', condition: 'Tạo secret_number = "42" (kiểu &str)' },
        { field: 'Bước 2', condition: 'Shadow: parse sang i32' },
        { field: 'Bước 3', condition: 'Shadow: nhân đôi giá trị' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '84'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Shadowing cho phép ta đổi không chỉ giá trị mà còn <strong>kiểu dữ liệu</strong> của một biến mà vẫn tái sử dụng được tên biến đó. Bạn sẽ cần dùng lại từ khóa <code>let</code> cho mỗi lần shadow!
</div>
`,
    defaultCode: `fn main() {
    // Bước 1: Tạo biến secret_number = "42" (kiểu &str)
    let secret_number = "42";

    // Bước 2: Shadowing - parse sang i32
    let secret_number = secret_number.parse::<i32>().unwrap();

    // Bước 3: Shadowing - nhân đôi
    let secret_number = secret_number * 2;

    println!("{}", secret_number);
}
`
};
