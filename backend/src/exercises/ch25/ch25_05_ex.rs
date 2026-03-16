// Exercise - ch25_05_ex: Tính diện tích hình chữ nhật

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let a: f64 = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let b: f64 = input.trim().parse().unwrap();

    println!("{}", a * b);
}
