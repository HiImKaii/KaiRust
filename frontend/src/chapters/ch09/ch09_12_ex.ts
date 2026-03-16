import { Lesson } from '../../courses';

export const ch09_12_ex: Lesson = {
    id: 'ch09-12-ex',
    title: 'Bài tập 9.12: Chaining Multiple Operations',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành chaining nhiều operations với Result!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Parse string thành i32</li>
  <li>Kiểm tra số dương</li>
  <li>Tính giai thừa</li>
  <li>Chain tất cả với ? operator</li>
</ol>
`,
    defaultCode: `use std::num::ParseIntError;

fn parse_positive(s: &str) -> Result<i32, String> {
    // Parse string, kiểm tra dương
    unimplemented!()
}

fn factorial(n: i32) -> Result<i64, String> {
    // Tính giai thừa (n phải >= 0 và <= 20)
    unimplemented!()
}

fn parse_and_factorial(s: &str) -> Result<i64, String> {
    // Parse, kiểm tra dương, tính giai thừa
    unimplemented!()
}

fn main() {
    // Test thành công
    match parse_and_factorial("5") {
        Ok(result) => println!("5! = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test số âm
    match parse_and_factorial("-1") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test parse lỗi
    match parse_and_factorial("abc") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '5! = 120',
    testCases: [
        {
            input: 'parse_and_factorial("5")',
            expectedOutput: '120',
            description: '5! = 120'
        },
        {
            input: 'parse_and_factorial("0")',
            expectedOutput: '1',
            description: '0! = 1'
        }
    ]
};
