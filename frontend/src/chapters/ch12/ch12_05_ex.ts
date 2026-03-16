import { Lesson } from '../../courses';

export const ch12_05_ex: Lesson = {
    id: 'ch12-05-ex',
    title: 'Bài tập 12.5: Standard Error (eprintln!)',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng stderr!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng eprintln! để in ra stderr</li>
  <li>Phân biệt stdout và stderr</li>
</ol>
`,
    defaultCode: `use std::env;

fn main() {
    // In ra stdout (bình thường)
    println!("Đây là stdout");

    // In ra stderr (lỗi)
    eprintln!("Đây là stderr - dòng lỗi!");

    // In ra error có format
    eprintln!("Error: Không tìm thấy file!");
    eprintln!("Error code: {}", 404);

    println!("Chương trình kết thúc");
}
`,
    expectedOutput: 'Đây là stdout\nChương trình kết thúc',
    testCases: [
        {
            input: 'stdout',
            expectedOutput: 'true',
            description: 'stdout works'
        }
    ]
};
