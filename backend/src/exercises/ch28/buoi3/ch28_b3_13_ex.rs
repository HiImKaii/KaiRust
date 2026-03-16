// Exercise - ch28_b3_13: Tổng các chữ số
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    let mut sum = 0u64;
    let mut temp = n;
    while temp > 0 {
        sum += temp % 10;
        temp /= 10;
    }

    println!("{}", sum);
}
