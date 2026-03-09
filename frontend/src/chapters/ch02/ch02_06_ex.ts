import { Lesson } from '../../courses';

export const ch02_06_ex: Lesson = {
    id: 'ch02-06-ex',
    title: 'Bài tập 2.6: Nhập xuất dữ liệu cơ bản',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Nhập xuất dữ liệu cơ bản',
    memoryLimit: '256MB',
    timeLimit: '500ms',
    problemDescription: `Viết chương trình cho phép nhập vào số tuổi của bạn Duy và sau đó in ra giá trị vừa nhập.`,
    inputFormat: 'Một số nguyên là số tuổi',
    outputFormat: 'In ra: "Tuoi cua Duy la {age}"',
    constraints: [],
    examples: [
        {
            input: '20',
            output: 'Tuoi cua Duy la 20',
            explanation: 'In ra số tuổi đã nhập'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Đọc dữ liệu từ bàn phím và chuyển đổi sang số nguyên, sau đó in ra theo định dạng yêu cầu.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Đọc dữ liệu từ bàn phím</li>
    <li>Chuyển đổi sang số nguyên</li>
    <li>In ra theo format: "Tuoi cua Duy la {age}"</li>
</ul>
`,
    defaultCode: `use std::io;

fn main() {
    // Tạo biến mutable
    // let mut input = String::new();

    // Đọc dữ liệu
    // io::stdin()
    //     .read_line(&mut input)
    //     .expect("Failed to read line");

    // Chuyển đổi sang số
    // let age: i32 = input.trim().parse().expect("Failed to parse");

    // In ra màn hình
    // println!("Tuoi cua Duy la {}", age);
}
`,
    expectedOutput: 'Tuoi cua Duy la 20',
    testCases: [
        {
            input: '20',
            expectedOutput: 'Tuoi cua Duy la 20',
            description: 'Nhập tuổi 20'
        }
    ]
};
