// Exercise - ch12_14_ex: File Operations

use std::fs;
use std::path::Path;

fn main() {
    let source = "source.txt";
    let dest = "dest.txt";

    if Path::new(source).exists() {
        fs::copy(source, dest).expect("Không thể copy file");
        println!("Đã copy file");

        let metadata = fs::metadata(dest).expect("Không thể đọc metadata");
        println!("Kích thước: {} bytes", metadata.len());
    } else {
        println!("File không tồn tại");
    }
}
