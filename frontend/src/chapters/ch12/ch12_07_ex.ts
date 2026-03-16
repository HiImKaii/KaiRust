import { Lesson } from '../../courses';

export const ch12_07_ex: Lesson = {
    id: 'ch12-07-ex',
    title: 'Bài tập 12.7: Path Handling',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành xử lý đường dẫn!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng std::path::Path</li>
  <li>Trích xuất tên file, extension</li>
</ol>
`,
    defaultCode: `use std::path::Path;

fn main() {
    let path = Path::new("/home/user/documents/file.txt");

    // Lấy các thành phần
    println!("File name: {:?}", path.file_name());
    println!("Extension: {:?}", path.extension());
    println!("Parent: {:?}", path.parent());
    println!("Is file: {}", path.is_file());
    println!("Is dir: {}", path.is_dir());

    // Đường dẫn tương đối
    let rel_path = Path::new("src/main.rs");
    println!("\\nRelative path:");
    println!("File name: {:?}", rel_path.file_name());
    println!("Extension: {:?}", rel_path.extension());
}
`,
    expectedOutput: 'File name: Some("file.txt")',
    testCases: [
        {
            input: 'file_name',
            expectedOutput: 'Some("file.txt")',
            description: 'Tên file'
        }
    ]
};
