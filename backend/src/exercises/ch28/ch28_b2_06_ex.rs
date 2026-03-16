// Exercise - ch28_b2_06_ex: Mua nước
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let n: i64 = iter.next().unwrap().parse().unwrap();
    let a: i64 = iter.next().unwrap().parse().unwrap();
    let b: i64 = iter.next().unwrap().parse().unwrap();

    // So sánh giá 2 chai 1 lít với 1 chai 2 lít
    let price_per_2liters = std::cmp::min(2 * a, b);
    let result = (n / 2) * price_per_2liters + (n % 2) * a;

    println!("{}", result);
}
