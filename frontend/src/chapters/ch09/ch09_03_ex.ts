import { Lesson } from '../../courses';

export const ch09_03_ex: Lesson = {
    id: 'ch09-03-ex',
    title: 'Bài tập 9.3: ? Operator',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng ? operator để propagate errors!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function read_number_from_str(s: &str) -> Result&lt;i32, ParseIntError&gt;</li>
  <li>Sử dụng ? operator để parse string thành i32</li>
  <li>Tạo function multiply(a: &str, b: &str) -> Result&lt;i32, ParseIntError&gt;</li>
  <li>Sử dụng ? operator để nhân hai số từ string</li>
</ol>
`,
    defaultCode: `use std::num::ParseIntError;

fn read_number_from_str(s: &str) -> Result<i32, ParseIntError> {
    // Sử dụng ? operator để parse string thành i32
    unimplemented!()
}

fn multiply(a: &str, b: &str) -> Result<i32, ParseIntError> {
    // Sử dụng ? operator để nhân hai số
    unimplemented!()
}

fn main() {
    // Test đọc số từ string
    match read_number_from_str("42") {
        Ok(n) => println!("Số: {}", n),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test nhân hai số
    match multiply("5", "3") {
        Ok(result) => println!("5 * 3 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: 'Số: 42\n5 * 3 = 15',
    testCases: [
        {
            input: 'read_number_from_str("42")',
            expectedOutput: '42',
            description: 'Parse "42" thành 42'
        },
        {
            input: 'multiply("5", "3")',
            expectedOutput: '15',
            description: '5 * 3 = 15'
        },
        {
            input: 'multiply("10", "20")',
            expectedOutput: '200',
            description: '10 * 20 = 200'
        }
    ]
};
