import { Lesson } from '../../courses';

export const ch09_02_ex: Lesson = {
    id: 'ch09-02-ex',
    title: 'Bài tập 9.2: Result cơ bản',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với Result enum trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function divide(a: i32, b: i32) -> Result&lt;i32, String&gt;</li>
  <li>Trả về Ok(quotient) nếu thành công</li>
  <li>Trả về Err với thông báo lỗi nếu b = 0</li>
  <li>Sử dụng match để xử lý kết quả</li>
</ol>
<h3 class="task-heading">Ví dụ</h3>
<pre><code>divide(10, 2) // => Ok(5)
divide(10, 0) // => Err("Cannot divide by zero")</code></pre>
`,
    defaultCode: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    // Nếu b = 0, trả về Err
    // Ngược lại trả về Ok(a / b)
    unimplemented!()
}

fn main() {
    // Test thành công
    match divide(10, 2) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test lỗi
    match divide(10, 0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '10 / 2 = 5\nLỗi: Cannot divide by zero',
    testCases: [
        {
            input: 'divide(10, 2)',
            expectedOutput: 'Ok(5)',
            description: 'Chia 10 cho 2 phải trả về Ok(5)'
        },
        {
            input: 'divide(15, 3)',
            expectedOutput: 'Ok(5)',
            description: 'Chia 15 cho 3 phải trả về Ok(5)'
        },
        {
            input: 'divide(10, 0)',
            expectedOutput: 'Err',
            description: 'Chia cho 0 phải trả về Err'
        }
    ]
};
