// Exercise - ch29_03_ex: Đảo ngược chuỗi
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();

    let reversed: String = s.chars().rev().collect();
    println!("{}", reversed);
}
