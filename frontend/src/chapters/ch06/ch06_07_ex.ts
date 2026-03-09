import { Lesson } from '../../courses';

export const ch06_07_ex: Lesson = {
    id: 'ch06-07-ex',
    title: 'Bài tập 6.7: Result<T, E> - Xử lý lỗi',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Result<T, E> - Xử lý lỗi',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Thực hành sử dụng Result<T, E> để xử lý lỗi trong Rust.

Yêu cầu:
1. Viết hàm parse_age(s: &str) -> Result<i32, &str>
   - Chuyển string thành tuổi
   - Trả về Err nếu không hợp lệ
2. Viết hàm divide(a: i32, b: i32) -> Result<i32, String>
   - Chia hai số nguyên
   - Trả về Err với thông báo nếu b = 0
3. Sử dụng ? operator để propagate lỗi`,

    inputFormat: 'Gọi hàm với các tham số khác nhau',
    outputFormat: 'In ra Result tương ứng',

    constraints: [
        { field: 'parse_age', condition: 'Trả về Result<i32, &str>, Err nếu không parse được' },
        { field: 'divide', condition: 'Trả về Result<i32, String>, Err nếu b=0' }
    ],

    examples: [
        {
            input: 'parse_age("25")',
            output: 'Ok(25)',
            explanation: 'Parse tuổi hợp lệ thành công'
        },
        {
            input: 'parse_age("abc")',
            output: 'Err',
            explanation: 'Parse thất bại, trả về Err'
        }
    ],

    content: `
<h3>Giới thiệu về Result<T, E></h3>
<pre><code>enum Result<T, E> {
    Ok(T),   // Thành công, chứa giá trị T
    Err(E),  // Thất bại, chứa lỗi E
}</code></pre>

<h3>Hướng dẫn</h3>
<pre><code>fn parse_age(s: &str) -> Result<i32, &str> {
    match s.parse::<i32>() {
        Ok(age) if age > 0 => Ok(age),
        _ => Err("Tuổi không hợp lệ"),
    }
}

fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Không thể chia cho 0".to_string())
    } else {
        Ok(a / b)
    }
}</code></pre>
`,

    defaultCode: `// TODO: Viết hàm parse_age(s: &str) -> Result<i32, &str>

// TODO: Viết hàm divide(a: i32, b: i32) -> Result<i32, String>

fn main() {
    println!("{:?}", parse_age("25"));
    println!("{:?}", parse_age("abc"));
    println!("{:?}", divide(10, 2));
    println!("{:?}", divide(10, 0));
}
`,

    testCases: [
        {
            input: 'parse_age("25")',
            expectedOutput: 'Ok(25)',
            description: 'Parse tuổi hợp lệ'
        },
        {
            input: 'parse_age("abc")',
            expectedOutput: 'Err',
            description: 'Parse thất bại'
        },
        {
            input: 'divide(10, 2)',
            expectedOutput: 'Ok(5)',
            description: 'Chia thành công'
        },
        {
            input: 'divide(10, 0)',
            expectedOutput: 'Err',
            description: 'Chia cho 0'
        }
    ]
};
