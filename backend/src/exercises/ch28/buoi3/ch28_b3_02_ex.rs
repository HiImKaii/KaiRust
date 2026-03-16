// Exercise - ch28_b3_02: Tính tổng bình phương
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // S = n(n+1)(2n+1)/6
    let result = n * (n + 1) * (2 * n + 1) / 6;
    println!("{}", result);
}
