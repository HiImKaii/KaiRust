import { Lesson } from '../../courses';

export const ch03_01_ex3: Lesson = {
    id: 'ch03-01-ex3',
    title: 'Bài tập 3.1.3: Hằng số (Constants)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Hằng số (Constants)',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Khai báo một hằng số (constant) có:
- Tên: SPEED_OF_LIGHT (viết hoa, các từ cách nhau bằng dấu gạch dưới)
- Giá trị: 299792458
- Kiểu dữ liệu: u32 (bắt buộc)

Hằng số phải được khai báo ở phạm vi toàn cục (bên ngoài hàm main).

In ra giá trị của hằng số.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng duy nhất: 299792458',

    // Các ràng buộc
    constraints: [
        { field: 'Tên', condition: 'SPEED_OF_LIGHT (viết hoa, dùng gạch dưới giữa các từ)' },
        { field: 'Giá trị', condition: '299792458' },
        { field: 'Kiểu', condition: 'u32 (bắt buộc phải khai báo kiểu)' },
        { field: 'Phạm vi', condition: 'Toàn cục (bên ngoài hàm main)' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: '',
            output: '299792458',
            explanation: 'Hằng số SPEED_OF_LIGHT được khai báo với giá trị 299792458 và in ra màn hình'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Tìm hiểu về Hằng số (Constants)</h3>

<p>Hằng số là giá trị cố định không thay đổi trong suốt chương trình.</p>

<h4>Cú pháp khai báo hằng số:</h4>
<pre><code>const TEN_HANG_SO: kieu = giatri;</code></pre>

<h4>Quy tắc đặt tên:</h4>
<ul>
    <li>Viết hoa toàn bộ</li>
    <li>Dùng dấu gạch dưới (_) để phân tách các từ</li>
    <li><strong>Bắt buộc</strong> phải khai báo kiểu dữ liệu</li>
</ul>

<h4>Ví dụ:</h4>
<pre><code>const MAX_SCORE: u32 = 100;
  const PI: f64 = 3.14159;</code></pre>

<h4>Lưu ý:</h4>
<ul>
    <li>Hằng số phải được khai báo ở phạm vi toàn cục (ngoài hàm)</li>
    <li>Dùng <code>const</code> thay vì <code>let</code></li>
    <li>Phải có kiểu dữ liệu rõ ràng</li>
</ul>
`,

    // Code mẫu có sẵn
    defaultCode: `// TODO: Khai báo hằng số SPEED_OF_LIGHT với giá trị 299792458, kiểu u32
// Lưu ý: Khai báo ở bên ngoài hàm main (phạm vi toàn cục)

// TODO: Định nghĩa hằng số ở đây


fn main() {
    // TODO: In ra giá trị của hằng số
    // Ví dụ: println!("{}", TEN_HANG_SOA);
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: '',
            expectedOutput: '299792458',
            description: 'Kiểm tra khai báo và sử dụng hằng số'
        }
    ]
};
