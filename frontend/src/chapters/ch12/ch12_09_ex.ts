import { Lesson } from '../../courses';

export const ch12_09_ex: Lesson = {
    id: 'ch12-09-ex',
    title: 'Bài tập 12.9: Mini Grep - Case Insensitive',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết mini grep với case insensitive!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tìm kiếm không phân biệt hoa thường</li>
  <li>Sử dụng to_lowercase()</li>
</ol>
`,
    defaultCode: `use std::env;
use std::fs;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Cách dùng: grep <keyword> <filename>");
        process::exit(1);
    }

    let keyword = args[1].to_lowercase();
    let filename = &args[2];

    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for line in contents.lines() {
        if line.to_lowercase().contains(&keyword) {
            println!("{}", line);
        }
    }
}
`,
    expectedOutput: 'Hello World',
    testCases: [
        {
            input: 'grep "hello" file.txt',
            expectedOutput: 'Hello World',
            description: 'Tìm không phân biệt hoa thường'
        }
    ]
};
