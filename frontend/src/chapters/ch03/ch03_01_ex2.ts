import { Lesson } from '../../courses';

export const ch03_01_ex2: Lesson = {
    id: 'ch03-01-ex2',
    title: 'Bài tập 3.1.2: Shadowing - Che phủ biến',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Shadowing - Che phủ biến',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Sử dụng kỹ thuật Shadowing (che phủ biến) để thực hiện các bước sau:
1. Tạo biến secret_number với giá trị là chuỗi "42" (kiểu &str)
2. Sử dụng shadowing để chuyển đổi secret_number sang kiểu i32
3. Sử dụng shadowing để nhân đôi giá trị của secret_number

In ra giá trị cuối cùng của secret_number.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng duy nhất: 84',

    // Các ràng buộc
    constraints: [
        { field: 'Bước 1', condition: 'Tạo secret_number = "42" (kiểu &str)' },
        { field: 'Bước 2', condition: 'Shadowing: chuyển sang kiểu i32 bằng parse()' },
        { field: 'Bước 3', condition: 'Shadowing: nhân đôi giá trị (x 2)' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: '',
            output: '84',
            explanation: '42 (string) -> 42 (i32) -> 84 (nhân đôi)'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Tìm hiểu về Shadowing</h3>

<p>Shadowing là kỹ thuật cho phép bạn <strong>tái khai báo</strong> một biến với cùng tên nhưng với giá trị và kiểu dữ liệu khác.</p>

<h4>Điểm đặc biệt:</h4>
<ul>
    <li>Dùng từ khóa <code>let</code> để shadow</li>
    <li>Có thể <strong>đổi kiểu dữ liệu</strong> (vd: &str -> i32)</li>
    <li>Biến cũ bị "che phủ", không còn truy cập được</li>
</ul>

<h4>Ví dụ:</h4>
<pre><code>let x = "5";      // &str
  let x = x.parse::&lt;i32&gt;().unwrap();  // i32
  let x = x + 10;    // i32 = 15</code></pre>
`,

    // Code mẫu có sẵn
    defaultCode: `fn main() {
    // Bước 1: Tạo biến secret_number = "42" (kiểu &str)
    // TODO: Khai báo biến secret_number với giá trị "42"

    // Bước 2: Shadowing - chuyển sang kiểu i32
    // TODO: Dùng parse() để chuyển đổi kiểu

    // Bước 3: Shadowing - nhân đôi giá trị
    // TODO: Nhân secret_number với 2

    // In ra kết quả
    // TODO: println!("{}", secret_number);
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: '',
            expectedOutput: '84',
            description: 'Kiểm tra shadowing với đổi kiểu và tính toán'
        }
    ]
};
