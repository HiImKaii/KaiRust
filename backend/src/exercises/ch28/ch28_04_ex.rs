// Exercise - ch28_04_ex: Khoảng cách điểm
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let x1: f64 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let y1: f64 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let x2: f64 = input.trim().parse().unwrap();
    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let y2: f64 = input.trim().parse().unwrap();

    let d = ((x2 - x1).powi(2) + (y2 - y1).powi(2)).sqrt();
    println!("{:.2}", d);
}
