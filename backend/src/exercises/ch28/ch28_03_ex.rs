// Exercise - ch28_03_ex: Cộng hai phân số
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let a: i32 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let b: i32 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: i32 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let d: i32 = input.trim().parse().unwrap();

    let num = a * d + c * b;
    let den = b * d;
    println!("{}/{}", num, den);
}
