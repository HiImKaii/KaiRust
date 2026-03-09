import { Lesson } from '../../courses';

export const ch06_01_ex: Lesson = {
    id: 'ch06-01-ex',
    title: 'Bài tập 6.1: Định nghĩa Enum',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Định nghĩa và sử dụng Enum',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Thực hành định nghĩa và sử dụng Enum trong Rust.

Yêu cầu:
1. Định nghĩa enum Day với các variant: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
2. Định nghĩa enum Status với các variant: Active, Inactive, Pending(String)
3. Viết hàm is_weekend(day: &Day) -> bool để kiểm tra ngày cuối tuần (Saturday, Sunday)`,

    // Định dạng input
    inputFormat: 'Gọi hàm is_weekend với các ngày khác nhau',

    // Định dạng output
    outputFormat: 'In ra true nếu là cuối tuần, false nếu không',

    // Các ràng buộc
    constraints: [
        { field: 'Enum Day', condition: '7 variant: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday' },
        { field: 'Enum Status', condition: '3 variant: Active, Inactive, Pending(String)' },
        { field: 'Hàm is_weekend', condition: 'Trả về bool, true nếu Saturday hoặc Sunday' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: 'Day::Saturday',
            output: 'true',
            explanation: 'Thứ 7 là cuối tuần'
        },
        {
            input: 'Day::Monday',
            output: 'false',
            explanation: 'Thứ 2 không phải cuối tuần'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Hướng dẫn</h3>

<h4>Định nghĩa Enum:</h4>
<pre><code>enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}</code></pre>

<h4>Enum với dữ liệu:</h4>
<pre><code>enum Status {
    Active,
    Inactive,
    Pending(String), // Tuple-like variant
}</code></pre>

<h4>Hàm kiểm tra cuối tuần:</h4>
<pre><code>fn is_weekend(day: &Day) -> bool {
    match day {
        Day::Saturday | Day::Sunday => true,
        _ => false,
    }
}</code></pre>
`,

    // Code mẫu có sẵn
    defaultCode: `// TODO: Định nghĩa enum Day với 7 variant

// TODO: Định nghĩa enum Status với 3 variant (Active, Inactive, Pending(String))

// TODO: Viết hàm is_weekend nhận &Day và trả về bool

fn main() {
    // Test các ngày
    println!("Saturday: {}", is_weekend(&Day::Saturday));
    println!("Monday: {}", is_weekend(&Day::Monday));
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: 'Day::Saturday',
            expectedOutput: 'true',
            description: 'Thứ 7 là cuối tuần'
        },
        {
            input: 'Day::Sunday',
            expectedOutput: 'true',
            description: 'Chủ nhật là cuối tuần'
        },
        {
            input: 'Day::Monday',
            expectedOutput: 'false',
            description: 'Thứ 2 không phải cuối tuần'
        },
        {
            input: 'Day::Friday',
            expectedOutput: 'false',
            description: 'Thứ 6 không phải cuối tuần'
        }
    ]
};
