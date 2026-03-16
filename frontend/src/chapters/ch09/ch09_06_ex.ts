import { Lesson } from '../../courses';

export const ch09_06_ex: Lesson = {
    id: 'ch09-06-ex',
    title: 'Bài tập 9.6: Propagating Errors',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành propagating errors với ? operator!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function read_and_double(s: &str) -> Result&lt;i32, ParseIntError&gt;</li>
  <li>Đọc số từ string và nhân đôi</li>
  <li>Sử dụng ? operator để propagate errors</li>
</ol>
`,
    defaultCode: `use std::num::ParseIntError;

fn read_and_double(s: &str) -> Result<i32, ParseIntError> {
    // Đọc số từ string và nhân đôi
    // Sử dụng ? operator
    unimplemented!()
}

fn read_and_add_three(s1: &str, s2: &str) -> Result<i32, ParseIntError> {
    // Đọc hai số từ string và cộng lại
    unimplemented!()
}

fn main() {
    // Test đọc và nhân đôi
    match read_and_double("21") {
        Ok(result) => println!("21 * 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test cộng hai số
    match read_and_add_three("10", "20") {
        Ok(result) => println!("10 + 20 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '21 * 2 = 42\n10 + 20 = 30',
    testCases: [
        {
            input: 'read_and_double("21")',
            expectedOutput: '42',
            description: '21 * 2 = 42'
        },
        {
            input: 'read_and_add_three("10", "20")',
            expectedOutput: '30',
            description: '10 + 20 = 30'
        }
    ]
};
