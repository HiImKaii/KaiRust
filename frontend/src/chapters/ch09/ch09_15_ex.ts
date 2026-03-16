import { Lesson } from '../../courses';

export const ch09_15_ex: Lesson = {
    id: 'ch09-15-ex',
    title: 'Bài tập 9.15: Tổng hợp Error Handling',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy tổng hợp tất cả kiến thức về Error Handling!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo một mini calculator với error handling đầy đủ</li>
  <li>Hỗ trợ: cộng, trừ, nhân, chia</li>
  <li>Xử lý tất cả các trường hợp lỗi</li>
</ol>
`,
    defaultCode: `use std::num::ParseIntError;

#[derive(Debug)]
enum CalcError {
    ParseError(ParseIntError),
    DivisionByZero,
    InvalidOperation(String),
}

impl std::fmt::Display for CalcError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            CalcError::ParseError(e) => write!(f, "Parse error: {}", e),
            CalcError::DivisionByZero => write!(f, "Cannot divide by zero"),
            CalcError::InvalidOperation(op) => write!(f, "Invalid operation: {}", op),
        }
    }
}

fn calculate(a: &str, op: &str, b: &str) -> Result<i32, CalcError> {
    // Parse a và b, thực hiện phép tính
    // Xử lý tất cả các lỗi
    unimplemented!()
}

fn main() {
    // Test cộng
    match calculate("10", "+", "5") {
        Ok(result) => println!("10 + 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test trừ
    match calculate("10", "-", "5") {
        Ok(result) => println!("10 - 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test nhân
    match calculate("10", "*", "5") {
        Ok(result) => println!("10 * 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test chia
    match calculate("10", "/", "5") {
        Ok(result) => println!("10 / 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test chia cho 0
    match calculate("10", "/", "0") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test parse error
    match calculate("abc", "+", "5") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '10 + 5 = 15\n10 - 5 = 5\n10 * 5 = 50\n10 / 5 = 2\nLỗi: Cannot divide by zero\nLỗi: Parse error',
    testCases: [
        {
            input: 'calculate("10", "+", "5")',
            expectedOutput: '15',
            description: '10 + 5 = 15'
        },
        {
            input: 'calculate("10", "-", "5")',
            expectedOutput: '5',
            description: '10 - 5 = 5'
        },
        {
            input: 'calculate("10", "*", "5")',
            expectedOutput: '50',
            description: '10 * 5 = 50'
        },
        {
            input: 'calculate("10", "/", "5")',
            expectedOutput: '2',
            description: '10 / 5 = 2'
        }
    ]
};
