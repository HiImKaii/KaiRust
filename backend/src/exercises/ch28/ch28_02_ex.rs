// Exercise - ch28_02_ex: Tính điểm trung bình
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let a: f64 = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let b: f64 = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: f64 = input.trim().parse().unwrap();

    let tb = (a + b + c) / 3.0;
    println!("{:.2}", tb);
}
