import { Lesson } from '../../courses';

export const ch06_06_ex: Lesson = {
    id: 'ch06-06-ex',
    title: 'Bài tập 6.6: Option<T> nâng cao',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Option<T> nâng cao',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Thực hành xử lý Option<T> trong các tình huống thực tế.

Yêu cầu:
1. Viết hàm safe_divide(a: f64, b: f64) -> Option<f64>
   - Chia hai số, trả về None nếu b = 0
2. Viết hàm find_user(id: u32) -> Option<String>
   - Tìm user theo id (giả lập database)
3. Viết hàm chain_options(opt1: Option<i32>, opt2: Option<i32>) -> Option<i32>
   - Cộng hai giá trị nếu cả hai đều có giá trị, ngược lại trả về None`,

    inputFormat: 'Gọi hàm với các tham số khác nhau',
    outputFormat: 'In ra kết quả tương ứng',

    constraints: [
        { field: 'safe_divide', condition: 'Trả về Option<f64>, None nếu b=0' },
        { field: 'find_user', condition: 'Trả về Option<String>, None nếu không tìm thấy' },
        { field: 'chain_options', condition: 'Trả về Option<i32>, cộng nếu cả hai đều Some' }
    ],

    examples: [
        {
            input: 'safe_divide(10.0, 2.0)',
            output: 'Some(5)',
            explanation: 'Chia 10 cho 2 được 5'
        },
        {
            input: 'safe_divide(10.0, 0.0)',
            output: 'None',
            explanation: 'Chia cho 0 trả về None'
        }
    ],

    content: `
<h3>Hướng dẫn</h3>
<pre><code>// Hàm chia an toàn
fn safe_divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

// Hàm tìm user
fn find_user(id: u32) -> Option<String> {
    let users = [(1, "Alice"), (2, "Bob"), (3, "Charlie")];
    for (uid, name) in &users {
        if *uid == id {
            return Some(name.to_string());
        }
    }
    None
}

// Hàm cộng hai Option
fn chain_options(opt1: Option<i32>, opt2: Option<i32>) -> Option<i32> {
    match (opt1, opt2) {
        (Some(a), Some(b)) => Some(a + b),
        _ => None,
    }
}</code></pre>
`,

    defaultCode: `// TODO: Viết hàm safe_divide(a: f64, b: f64) -> Option<f64>

// TODO: Viết hàm find_user(id: u32) -> Option<String>

// TODO: Viết hàm chain_options(opt1: Option<i32>, opt2: Option<i32>) -> Option<i32>

fn main() {
    println!("{:?}", safe_divide(10.0, 2.0));
    println!("{:?}", safe_divide(10.0, 0.0));
    println!("{:?}", find_user(1));
    println!("{:?}", chain_options(Some(5), Some(3)));
}
`,

    testCases: [
        {
            input: 'safe_divide(10.0, 2.0)',
            expectedOutput: 'Some(5)',
            description: 'Chia an toàn thành công'
        },
        {
            input: 'safe_divide(10.0, 0.0)',
            expectedOutput: 'None',
            description: 'Chia cho 0 trả về None'
        },
        {
            input: 'find_user(1)',
            expectedOutput: 'Some("Alice")',
            description: 'Tìm thấy user'
        },
        {
            input: 'find_user(99)',
            expectedOutput: 'None',
            description: 'Không tìm thấy user'
        }
    ]
};
