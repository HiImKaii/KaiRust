// Exercise - ch24_01_ex: Kiểm tra số dương/âm

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    if n > 0 {
        println!("duong");
    } else if n < 0 {
        println!("am");
    } else {
        println!("0");
    }
}
