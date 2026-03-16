// Exercise - ch28_b2_11_ex: 546A - Mua chuối
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let k: i64 = iter.next().unwrap().parse().unwrap();
    let n: i64 = iter.next().unwrap().parse().unwrap();
    let w: i64 = iter.next().unwrap().parse().unwrap();

    // Tổng tiền = k * (1 + 2 + ... + w) = k * w * (w + 1) / 2
    let total = k * w * (w + 1) / 2;

    let result = if total > n { total - n } else { 0 };
    println!("{}", result);
}
