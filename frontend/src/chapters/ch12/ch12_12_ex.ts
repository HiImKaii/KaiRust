import { Lesson } from '../../courses';

export const ch12_12_ex: Lesson = {
    id: 'ch12-12-ex',
    title: 'Bài tập 12.12: CSV Parser',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc file CSV!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Đọc file CSV</li>
  <li>Parse từng dòng</li>
  <li>Tách các cột</li>
</ol>
`,
    defaultCode: `use std::fs;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Cách dùng: csv <filename>");
        return;
    }

    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for (i, line) in contents.lines().enumerate() {
        let fields: Vec<&str> = line.split(',').collect();
        println!("Dòng {}: {:?}", i + 1, fields);
    }
}
`,
    expectedOutput: 'Dòng 1: ["name", "age"]',
    testCases: [
        {
            input: 'line count',
            expectedOutput: '2',
            description: 'Số dòng'
        }
    ]
};
