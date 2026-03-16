import { Lesson } from '../../courses';

export const ch12_01_ex: Lesson = {
    id: 'ch12-01-ex',
    title: 'Bài tập 12.1: Command Line Arguments',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc command line arguments!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::env::args() để đọc arguments</li>
  <li>In ra tất cả arguments</li>
  <li>Đếm số lượng arguments</li>
</ol>
`,
    defaultCode: `use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    println!("Số lượng arguments: {}", args.len());

    for (i, arg) in args.iter().enumerate() {
        println!("Arg {}: {}", i, arg);
    }
}
`,
    expectedOutput: 'Số lượng arguments: 1\nArg 0: test',
    testCases: [
        {
            input: 'args.len()',
            expectedOutput: '1',
            description: 'Số lượng arguments'
        }
    ]
};
