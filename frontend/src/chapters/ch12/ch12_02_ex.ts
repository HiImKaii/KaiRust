import { Lesson } from '../../courses';

export const ch12_02_ex: Lesson = {
    id: 'ch12-02-ex',
    title: 'Bài tập 12.2: File Reading',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc file trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::fs::File và std::io::Read</li>
  <li>Đọc nội dung file</li>
  <li>Đếm số dòng trong file</li>
</ol>
`,
    defaultCode: `use std::env;
use std::fs::File;
use std::io::Read;

fn main() {
    // Đọc file "input.txt"
    let mut file = match File::open("input.txt") {
        Ok(f) => f,
        Err(e) => {
            eprintln!("Lỗi mở file: {}", e);
            return;
        }
    };

    let mut contents = String::new();
    match file.read_to_string(&mut contents) {
        Ok(_) => {},
        Err(e) => {
            eprintln!("Lỗi đọc file: {}", e);
            return;
        }
    }

    let lines: Vec<&str> = contents.lines().collect();
    println!("Số dòng: {}", lines.len());
    println!("Nội dung:\\n{}", contents);
}
`,
    expectedOutput: 'Số dòng: 3',
    testCases: [
        {
            input: 'lines',
            expectedOutput: '3',
            description: 'Đếm số dòng'
        }
    ]
};
