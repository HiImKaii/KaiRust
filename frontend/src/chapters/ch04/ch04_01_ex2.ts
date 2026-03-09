import { Lesson } from '../../courses';

export const ch04_01_ex2: Lesson = {
    id: 'ch04-01-ex2',
    title: 'Bài tập 4.1.2: Move vs Clone',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Move vs Clone',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Trong Rust, để tạo một bản sao độc lập (deep copy) của dữ liệu, ta sử dụng phương thức .clone().

Cho đoạn code:
<pre><code>let hello = String::from("Chào buổi sáng");
let world = hello;  // LỖI: hello bị move
println!("{}", hello);
println!("{}", world);</code></pre>

Hãy sử dụng .clone() để tạo bản sao của hello, giúp cả hai biến đều có thể sử dụng được.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: `In ra hai dòng:
Dòng 1: Chào buổi sáng
Dòng 2: Chào buổi sáng`,

    // Các ràng buộc
    constraints: [
        { field: 'Yêu cầu', condition: 'Sử dụng .clone() để tạo bản sao' },
        { field: 'Kết quả', condition: 'Cả hello và world đều in được giá trị' }
    ],

    // Ví dụ
    examples: [
        {
            input: '',
            output: 'Chào buổi sáng\nChào buổi sáng',
            explanation: '.clone() tạo bản sao độc lập, cả hai biến đều sử dụng được'
        }
    ],

    // Nội dung lý thuyết
    content: `
<h3>Tìm hiểu về .clone()</h3>

<p>Phương thức <code>.clone()</code> tạo một bản sao toàn bộ (deep copy) của dữ liệu.</p>

<h4>So sánh Move và Clone:</h4>

<pre><code>// MOVE - chỉ chuyển quyền sở hữu
let s1 = String::from("hello");
let s2 = s1;  // s1 bị move, không dùng được nữa
println!("{}", s1);  // LỖI!

// CLONE - tạo bản sao
let s1 = String::from("hello");
let s2 = s1.clone();  // Tạo bản sao
println!("{}", s1);  // OK
println!("{}", s2);  // OK</code></pre>

<h4>Lưu ý:</h4>
<ul>
    <li>.clone() tốn thêm bộ nhớ vì phải copy dữ liệu</li>
    <li>Nên cân nhắc khi dữ liệu lớn</li>
</ul>
`,

    // Code mẫu
    defaultCode: `fn main() {
    let hello = String::from("Chào buổi sáng");

    // TODO: Sử dụng .clone() để tạo bản sao
    // let world = ...

    // TODO: In hello
    // println!("{}", hello);

    // TODO: In world
    // println!("{}", world);
}
`,

    // Test case
    testCases: [
        {
            input: '',
            expectedOutput: 'Chào buổi sáng\nChào buổi sáng',
            description: 'Kiểm tra clone tạo bản sao độc lập'
        }
    ]
};
