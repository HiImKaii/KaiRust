import { Lesson } from '../../courses';

export const ch09_05_ex: Lesson = {
    id: 'ch09-05-ex',
    title: 'Bài tập 9.5: Custom Error Type',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành tạo custom error type!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo enum MathError với các variants: DivisionByZero, NegativeRoot, Overflow</li>
  <li>Implement Display trait cho MathError</li>
  <li>Tạo function divide(a: f64, b: f64) -> Result&lt;f64, MathError&gt;</li>
  <li>Tạo function sqrt(x: f64) -> Result&lt;f64, MathError&gt;</li>
</ol>
`,
    defaultCode: `use std::fmt;

// Tạo custom error enum
#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeRoot,
    Overflow,
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Cannot divide by zero"),
            MathError::NegativeRoot => write!(f, "Cannot take square root of negative number"),
            MathError::Overflow => write!(f, "Number overflow"),
        }
    }
}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    // Nếu b = 0, trả về Err(DivisionByZero)
    // Ngược lại trả về Ok(a / b)
    unimplemented!()
}

fn sqrt(x: f64) -> Result<f64, MathError> {
    // Nếu x < 0, trả về Err(NegativeRoot)
    // Ngược lại trả về Ok(x.sqrt())
    unimplemented!()
}

fn main() {
    // Test divide
    match divide(10.0, 2.0) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test sqrt
    match sqrt(16.0) {
        Ok(result) => println!("sqrt(16) = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match sqrt(-4.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '10 / 2 = 5\nLỗi: Cannot divide by zero\nsqrt(16) = 4\nLỗi: Cannot take square root of negative number',
    testCases: [
        {
            input: 'divide(10.0, 2.0)',
            expectedOutput: '5',
            description: 'Chia 10 cho 2 = 5'
        },
        {
            input: 'sqrt(16.0)',
            expectedOutput: '4',
            description: 'sqrt(16) = 4'
        },
        {
            input: 'divide(5.0, 0.0)',
            expectedOutput: 'Err',
            description: 'Chia cho 0 phải lỗi'
        }
    ]
};
