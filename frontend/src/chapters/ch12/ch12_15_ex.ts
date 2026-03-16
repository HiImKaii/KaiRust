import { Lesson } from '../../courses';

export const ch12_15_ex: Lesson = {
    id: 'ch12-15-ex',
    title: 'Bài tập 12.15: Tổng hợp I/O',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy tổng hợp tất cả kiến thức về I/O!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo chương trình quản lý ghi chú</li>
  <li>Đọc/ghi file</li>
  <li>Xử lý command line arguments</li>
</ol>
`,
    defaultCode: `use std::env;
use std::fs;
use std::io::{self, Write};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("Cách dùng:");
        println!("  notes add <nội dung> - Thêm ghi chú");
        println!("  notes list           - Liệt kê ghi chú");
        println!("  notes clear          - Xóa tất cả ghi chú");
        return;
    }

    let command = &args[1];
    let notes_file = "notes.txt";

    match command.as_str() {
        "add" => {
            if args.len() < 3 {
                eprintln!("Thiếu nội dung ghi chú!");
                return;
            }
            let content = &args[2..].join(" ");
            let mut file = fs::OpenOptions::new(true, true)
                .create(true)
                .append(true)
                .open(notes_file)
                .expect("Không thể mở file");

            writeln!(file, "{}", content).expect("Không thể ghi");
            println!("Đã thêm ghi chú!");
        }
        "list" => {
            if Path::new(notes_file).exists() {
                let contents = fs::read_to_string(notes_file)
                    .expect("Không thể đọc file");
                println!("=== Ghi chú ===");
                for (i, line) in contents.lines().enumerate() {
                    println!("{}. {}", i + 1, line);
                }
            } else {
                println!("Chưa có ghi chú nào!");
            }
        }
        "clear" => {
            if Path::new(notes_file).exists() {
                fs::remove_file(notes_file).expect("Không thể xóa file");
                println!("Đã xóa tất cả ghi chú!");
            } else {
                println!("Không có ghi chú để xóa!");
            }
        }
        _ => {
            eprintln!("Lệnh không hợp lệ!");
        }
    }
}

use std::path::Path;
`,
    expectedOutput: 'Đã thêm ghi chú!',
    testCases: [
        {
            input: 'add',
            expectedOutput: 'true',
            description: 'Thêm ghi chú'
        }
    ]
};
