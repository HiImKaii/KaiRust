// Exercise - ch28_b3_03: Tổng các số chia hết cho 3
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    // Số lượng số chia hết cho 3 từ 1 đến n
    let count = n / 3;
    // Tổng: 3 + 6 + 9 + ... + 3*count = 3 * (1+2+...+count) = 3 * count * (count+1) / 2
    let result = 3 * count * (count + 1) / 2;
    println!("{}", result);
}
