// Exercise - ch28_b3_01: Tính tổng từ 1 đến n
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // S = n * (n + 1) / 2
    let result = n * (n + 1) / 2;
    println!("{}", result);
}
