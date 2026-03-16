// Exercise - ch29_06_ex: Tách từ
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();

    for word in s.split_whitespace() {
        println!("{}", word);
    }
}
