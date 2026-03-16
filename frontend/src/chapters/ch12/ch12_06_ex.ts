import { Lesson } from '../../courses';

export const ch12_06_ex: Lesson = {
    id: 'ch12-06-ex',
    title: 'Bài tập 12.6: stdin Reading',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc từ stdin!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::io::stdin() để đọc input</li>
  <li>Đọc một dòng từ người dùng</li>
</ol>
`,
    defaultCode: `use std::io;

fn main() {
    println!("Nhập tên của bạn:");

    let mut name = String::new();
    io::stdin()
        .read_line(&mut name)
        .expect("Không thể đọc dòng");

    let name = name.trim();
    println!("Xin chào, {}!", name);
}
`,
    expectedOutput: 'Xin chào, test!',
    testCases: [
        {
            input: 'name',
            expectedOutput: 'test',
            description: 'Tên người dùng'
        }
    ]
};
