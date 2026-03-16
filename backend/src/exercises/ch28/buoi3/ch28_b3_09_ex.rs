// Exercise - ch28_b3_09: Tổng lập phương
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // S = (1+2+...+n)^2 = (n(n+1)/2)^2
    let sum = n * (n + 1) / 2;
    let result = sum * sum;
    println!("{}", result);
}
