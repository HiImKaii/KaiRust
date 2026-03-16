// Exercise - ch28_b3_25: Hoán vị
// P(n, n) = n!
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u32 = input.trim().parse().unwrap();

    let mut result: u64 = 1;
    for i in 2..=n {
        result *= i as u64;
    }

    println!("{}", result);
}
