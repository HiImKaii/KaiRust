import { Lesson } from '../../courses';

export const ch09_08_ex: Lesson = {
    id: 'ch09-08-ex',
    title: 'Bài tập 9.8: Multiple Error Types',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành xử lý nhiều loại error!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function parse_and_divide(a: &str, b: &str) -> Result&lt;i32, Box&lt;dyn Error&gt;&gt;</li>
  <li>Parse string thành i32 và chia</li>
  <li>Handle cả ParseIntError và DivisionByZero</li>
</ol>
`,
    defaultCode: `use std::error::Error;
use std::num::ParseIntError;

fn parse_and_divide(a: &str, b: &str) -> Result<i32, Box<dyn Error>> {
    // Parse cả hai string và chia
    // Sử dụng ? operator để propagate errors
    unimplemented!()
}

fn main() {
    // Test thành công
    match parse_and_divide("10", "2") {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test lỗi parse
    match parse_and_divide("abc", "2") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi parse: {}", e),
    }

    // Test chia cho 0
    match parse_and_divide("10", "0") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi chia: {}", e),
    }
}
`,
    expectedOutput: '10 / 2 = 5',
    testCases: [
        {
            input: 'parse_and_divide("10", "2")',
            expectedOutput: '5',
            description: '10 / 2 = 5'
        },
        {
            input: 'parse_and_divide("20", "4")',
            expectedOutput: '5',
            description: '20 / 4 = 5'
        }
    ]
};
