// Exercise - ch12_02_ex: File Reading

use std::fs::File;
use std::io::Read;

fn main() {
    let mut file = File::open("input.txt").expect("Không thể mở file");

    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Không thể đọc file");

    let lines: Vec<&str> = contents.lines().collect();
    println!("Số dòng: {}", lines.len());
    println!("Nội dung:\n{}", contents);
}
