import { Lesson } from '../../courses';

export const ch02_07_ex: Lesson = {
    id: 'ch02-07-ex',
    title: 'Bài tập 2.7: Sử dụng nhiều kiểu dữ liệu',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Sử dụng nhiều kiểu dữ liệu',
    timeLimit: '500ms',
    memoryLimit: '256MB',
    problemDescription: `Viết chương trình nhập vào hai số: số nguyên và số thực. In ra màn hình lần lượt giá trị của hai số đó.`,
    inputFormat: 'Dòng 1: số nguyên, Dòng 2: số thực',
    outputFormat: 'Dòng 1: "Gia tri cua bien thu nhat la {number1}", Dòng 2: "Gia tri cua bien thu hai la {number2}"',
    constraints: [],
    examples: [
        {
            input: '5\n6.5',
            output: 'Gia tri cua bien thu nhat la 5\nGia tri cua bien thu hai la 6.5',
            explanation: 'In ra giá trị của hai biến'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Khai báo biến với các kiểu dữ liệu khác nhau: \`i32\` cho số nguyên, \`f64\` cho số thực. Đọc và chuyển đổi từng dòng input.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Khai báo biến số nguyên \`i32\`</li>
    <li>Khai báo biến số thực \`f64\`</li>
    <li>Đọc và chuyển đổi hai dòng input</li>
    <li>In ra theo định dạng yêu cầu</li>
</ul>
`,
    defaultCode: `use std::io;

fn main() {
    // Tạo biến số nguyên
    // let mut num1: i32 = 0;

    // Tạo biến số thực
    // let mut num2: f64 = 0.0;

    // Đọc dòng đầu và chuyển sang i32
    // let mut input1 = String::new();
    // io::stdin().read_line(&mut input1).expect("Failed");
    // num1 = input1.trim().parse().expect("Failed");

    // Đọc dòng hai và chuyển sang f64
    // let mut input2 = String::new();
    // io::stdin().read_line(&mut input2).expect("Failed");
    // num2 = input2.trim().parse().expect("Failed");

    // In ra màn hình
    // println!("Gia tri cua bien thu nhat la {}", num1);
    // println!("Gia tri cua bien thu hai la {}", num2);
}
`,
    expectedOutput: 'Gia tri cua bien thu nhat la 5\nGia tri cua bien thu hai la 6.5',
    testCases: [
        {
            input: '5\n6.5',
            expectedOutput: 'Gia tri cua bien thu nhat la 5\nGia tri cua bien thu hai la 6.5',
            description: 'Nhập 5 và 6.5'
        }
    ]
};
