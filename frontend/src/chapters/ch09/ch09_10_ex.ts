import { Lesson } from '../../courses';

export const ch09_10_ex: Lesson = {
    id: 'ch09-10-ex',
    title: 'Bài tập 9.10: and_then và or_else',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng and_then() và or_else()!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng .and_then() để chain các operations</li>
  <li>Sử dụng .or_else() để handle errors</li>
  <li>Tạo function safe_divide(a: i32, b: i32) -> Option<i32></li>
</ol>
`,
    defaultCode: `fn safe_divide(a: i32, b: i32) -> Option<i32> {
    // Nếu b = 0, trả về None
    // Ngược lại trả về Some(a / b)
    unimplemented!()
}

fn divide_and_add(a: i32, b: i32, c: i32) -> Option<i32> {
    // Chia a cho b, sau đó cộng c
    // Sử dụng and_then
    unimplemented!()
}

fn try_parse(s: &str) -> Option<i32> {
    // Thử parse string thành i32
    unimplemented!()
}

fn parse_or_default(s: &str) -> i32 {
    // Parse hoặc trả về 0
    // Sử dụng unwrap_or
    unimplemented!()
}

fn main() {
    let numbers = vec![10, 20, 30];

    // Test safe_divide
    match safe_divide(10, 2) {
        Some(result) => println!("10 / 2 = {}", result),
        None => println!("Không thể chia"),
    }

    match safe_divide(10, 0) {
        Some(result) => println!("Kết quả: {}", result),
        None => println!("Không thể chia cho 0"),
    }

    // Test parse_or_default
    let a = parse_or_default("42");
    let b = parse_or_default("abc");
    println!("a = {}, b = {}", a, b);
}
`,
    expectedOutput: '10 / 2 = 5\nKhông thể chia cho 0\na = 42, b = 0',
    testCases: [
        {
            input: 'safe_divide(10, 2)',
            expectedOutput: '5',
            description: '10 / 2 = 5'
        },
        {
            input: 'parse_or_default("42")',
            expectedOutput: '42',
            description: 'Parse "42" = 42'
        }
    ]
};
