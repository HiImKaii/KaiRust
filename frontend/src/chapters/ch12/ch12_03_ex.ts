import { Lesson } from '../../courses';

export const ch12_03_ex: Lesson = {
    id: 'ch12-03-ex',
    title: 'Bài tập 12.3: File Writing',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành ghi file trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::fs::File và std::io::Write</li>
  <li>Ghi nội dung vào file</li>
  <li>Sử dụng ? operator để xử lý lỗi</li>
</ol>
`,
    defaultCode: `use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    // Tạo file mới
    let mut file = File::create("output.txt")?;

    // Ghi nội dung
    file.write_all(b"Hello, Rust!\n")?;
    file.write_all(b"This is a test file.\n")?;
    file.write_all(b"Writing to files is easy.")?;

    println!("Đã ghi file thành công!");
    Ok(())
}
`,
    expectedOutput: 'Đã ghi file thành công!',
    testCases: [
        {
            input: 'write',
            expectedOutput: 'true',
            description: 'Ghi file thành công'
        }
    ]
};
