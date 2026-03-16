// Exercise - ch12_06_ex: stdin Reading

use std::io;

fn main() {
    println!("Nhập tên của bạn:");

    let mut name = String::new();
    io::stdin()
        .read_line(&mut name)
        .expect("Không thể đọc dòng");

    let name = name.trim();
    println!("Xin chào, {}!", name);
}
