// Exercise - ch29_01_ex: Đếm ký tự
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();
    println!("{}", s.len());
}
