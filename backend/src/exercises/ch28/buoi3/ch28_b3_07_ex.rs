// Exercise - ch28_b3_07: Tổng số chẵn
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // S = 2 + 4 + 6 + ... + 2n = 2 * (1 + 2 + ... + n) = 2 * n * (n+1) / 2 = n * (n+1)
    let result = n * (n + 1);
    println!("{}", result);
}
