// Exercise - ch28_b3_08: Tổng số lẻ
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // S = 1 + 3 + 5 + ... + (2n-1) = n^2
    let result = n * n;
    println!("{}", result);
}
