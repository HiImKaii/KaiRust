import { Lesson } from '../../courses';

export const ch12_11_ex: Lesson = {
    id: 'ch12-11-ex',
    title: 'Bài tập 12.11: Word Counter',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đếm từ trong file!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Đọc nội dung file</li>
  <li>Đếm số từ</li>
  <li>Đếm số dòng</li>
</ol>
`,
    defaultCode: `use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Cách dùng: wc <filename>");
        return;
    }

    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    let lines = contents.lines().count();
    let words: Vec<&str> = contents.split_whitespace().collect();
    let chars = contents.chars().count();

    println!("{} {} {}", lines, words.len(), chars);
}
`,
    expectedOutput: '5 20 100',
    testCases: [
        {
            input: 'lines',
            expectedOutput: '5',
            description: 'Số dòng'
        }
    ]
};
