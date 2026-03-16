// Exercise - ch28_b3_19: Tìm số có n chữ số chia hết cho t
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let n: u32 = iter.next().unwrap().parse().unwrap();
    let t: u64 = iter.next().unwrap().parse().unwrap();

    // Dùng u128 để tránh overflow
    // Tìm số nhỏ nhất có n chữ số chia hết cho t
    let mut start: u128 = 1;
    for _ in 1..n {
        start *= 10;
    }

    // Tìm số đầu tiên >= start chia hết cho t
    let remainder = start % (t as u128);
    let result = if remainder == 0 {
        start
    } else {
        start + (t as u128 - remainder)
    };

    // Kiểm tra có n chữ số không (nhỏ hơn 10^n)
    let limit: u128 = start * 10;
    if result >= limit {
        println!("-1");
    } else {
        println!("{}", result);
    }
}
