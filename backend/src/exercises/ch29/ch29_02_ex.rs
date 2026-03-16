// Exercise - ch29_02_ex: Đếm số từ
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();

    let count = s.split_whitespace().count();
    println!("{}", count);
}
