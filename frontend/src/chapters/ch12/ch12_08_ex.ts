import { Lesson } from '../../courses';

export const ch12_08_ex: Lesson = {
    id: 'ch12-08-ex',
    title: 'Bài tập 12.8: Mini Grep - Basic',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết mini grep!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Đọc nội dung file</li>
  <li>Tìm các dòng chứa từ khóa</li>
  <li>In ra các dòng tìm thấy</li>
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

    let keyword = &args[1];
    let filename = &args[2];

    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for line in contents.lines() {
        if line.contains(keyword) {
            println!("{}", line);
        }
    }
}
`,
    expectedOutput: 'Hello World',
    testCases: [
        {
            input: 'grep "Hello" file.txt',
            expectedOutput: 'Hello World',
            description: 'Tìm dòng chứa "Hello"'
        }
    ]
};
