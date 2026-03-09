import { Lesson } from '../../courses';

export const ch06_02_ex: Lesson = {
    id: 'ch06-02-ex',
    title: 'Bài tập 6.2: Pattern Matching với match',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Pattern Matching với match',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Thực hành sử dụng match expression để xử lý các variant của Enum.

Yêu cầu:
1. Định nghĩa enum Message với các variants:
   - Quit (không có dữ liệu)
   - Move { x: i32, y: i32 } (giống struct)
   - Write(String) (tuple-like)
   - ChangeColor(i32, i32, i32) (tuple-like)
2. Viết hàm process_message(msg: &Message) sử dụng match để xử lý từng variant
3. Trích xuất dữ liệu từ các variant và in ra màn hình`,

    // Định dạng input
    inputFormat: 'Gọi hàm process_message với các Message khác nhau',

    // Định dạng output
    outputFormat: 'In ra thông tin tương ứng với từng loại Message',

    // Các ràng buộc
    constraints: [
        { field: 'Enum Message', condition: '4 variant: Quit, Move{x:i32,y:i32}, Write(String), ChangeColor(i32,i32,i32)' },
        { field: 'Hàm process_message', condition: 'Sử dụng match để xử lý tất cả variant' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: 'Message::Write(String::from("Hello"))',
            output: 'tin nhắn: Hello',
            explanation: 'Xử lý message Write, trích xuất String và in ra'
        },
        {
            input: 'Message::Move { x: 10, y: 20 }',
            output: 'di chuyển đến: x=10, y=20',
            explanation: 'Xử lý message Move với dữ liệu struct'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Hướng dẫn</h3>

<h4>Định nghĩa Enum Message:</h4>
<pre><code>enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}</code></pre>

<h4>Hàm xử lý với match:</h4>
<pre><code>fn process_message(msg: &Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("di chuyển đến: x={}, y={}", x, y),
        Message::Write(s) => println!("tin nhắn: {}", s),
        Message::ChangeColor(r, g, b) => println!("đổi màu: r={}, g={}, b={}", r, g, b),
    }
}</code></pre>
`,

    // Code mẫu có sẵn
    defaultCode: `// TODO: Định nghĩa enum Message với 4 variant

// TODO: Viết hàm process_message xử lý từng variant

fn main() {
    // Test các message
    process_message(&Message::Write(String::from("Hello")));
    process_message(&Message::Move { x: 10, y: 20 });
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: 'Message::Write(String::from("Hello"))',
            expectedOutput: 'tin nhắn: Hello',
            description: 'Xử lý message Write'
        },
        {
            input: 'Message::Move { x: 10, y: 20 }',
            expectedOutput: 'di chuyển đến: x=10, y=20',
            description: 'Xử lý message Move'
        },
        {
            input: 'Message::Quit',
            expectedOutput: 'Quit',
            description: 'Xử lý message Quit'
        },
        {
            input: 'Message::ChangeColor(255, 0, 0)',
            expectedOutput: 'đổi màu: r=255, g=0, b=0',
            description: 'Xử lý message ChangeColor'
        }
    ]
};
