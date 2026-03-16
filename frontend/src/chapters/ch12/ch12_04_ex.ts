import { Lesson } from '../../courses';

export const ch12_04_ex: Lesson = {
    id: 'ch12-04-ex',
    title: 'Bài tập 12.4: Environment Variables',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc environment variables!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::env::var() để đọc environment variables</li>
  <li>Đọc một biến cụ thể</li>
  <li>Handle lỗi khi biến không tồn tại</li>
</ol>
`,
    defaultCode: `use std::env;

fn main() {
    // Đọc biến USER hoặc USERNAME
    let user = env::var("USER")
        .or_else(|_| env::var("USERNAME"))
        .unwrap_or_else(|_| "Unknown".to_string());

    println!("User: {}", user);

    // Đọc biến PATH
    match env::var("PATH") {
        Ok(path) => println!("PATH: {}", path),
        Err(e) => println!("Lỗi đọc PATH: {}", e),
    }

    // Đọc biến tùy chỉnh
    let custom = env::var("MY_VAR").unwrap_or_else(|_| "default".to_string());
    println!("MY_VAR: {}", custom);
}
`,
    expectedOutput: 'User: quan',
    testCases: [
        {
            input: 'user',
            expectedOutput: 'quan',
            description: 'User name'
        }
    ]
};
