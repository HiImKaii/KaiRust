import { Lesson } from '../../courses';

export const ch09_09_ex: Lesson = {
    id: 'ch09-09-ex',
    title: 'Bài tập 9.9: Error Handling với Map',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng map() để xử lý Result!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng .map() để transform Result</li>
  <li>Tạo function square(n: i32) -> Result&lt;i32, String&gt;</li>
  <li>Sử dụng .map_err() để transform error</li>
</ol>
`,
    defaultCode: `fn parse_and_square(s: &str) -> Result<i32, String> {
    // Parse string thành i32, sau đó bình phương
    // Sử dụng .map()
    unimplemented!()
}

fn square(n: i32) -> Result<i32, String> {
    // Bình phương số nếu n >= 0
    // Ngược lại trả về lỗi
    unimplemented!()
}

fn main() {
    // Test với số hợp lệ
    match parse_and_square("5") {
        Ok(result) => println!("5^2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test với chuỗi không hợp lệ
    match parse_and_square("abc") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test square với số âm
    match square(-5) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: '5^2 = 25',
    testCases: [
        {
            input: 'parse_and_square("5")',
            expectedOutput: '25',
            description: '5^2 = 25'
        },
        {
            input: 'parse_and_square("10")',
            expectedOutput: '100',
            description: '10^2 = 100'
        }
    ]
};
