// Exercise - ch12_15_ex: Tổng hợp I/O

use std::env;
use std::fs;
use std::io::Write;
use std::path::Path;

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
            let mut file = fs::OpenOptions::new()
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
