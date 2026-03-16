import { Lesson } from '../../courses';

export const ch12_14_ex: Lesson = {
    id: 'ch12-14-ex',
    title: 'Bài tập 12.14: File Operations',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành các thao tác file nâng cao!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Copy file</li>
  <li>Kiểm tra file tồn tại</li>
  <li>Lấy metadata</li>
</ol>
`,
    defaultCode: `use std::fs;
use std::path::Path;

fn main() {
    let source = "source.txt";
    let dest = "dest.txt";

    // Kiểm tra file tồn tại
    if Path::new(source).exists() {
        // Copy file
        fs::copy(source, dest).expect("Không thể copy file");
        println!("Đã copy file");

        // Lấy metadata
        let metadata = fs::metadata(dest).expect("Không thể đọc metadata");
        println!("Kích thước: {} bytes", metadata.len());
    } else {
        println!("File không tồn tại");
    }
}
`,
    expectedOutput: 'Đã copy file',
    testCases: [
        {
            input: 'copy',
            expectedOutput: 'true',
            description: 'Copy file'
        }
    ]
};
