// Exercise - ch24_04_ex: Tính tổng từ 1 đến n

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    let mut sum = 0;
    let mut i = 1;
    while i <= n {
        sum += i;
        i += 1;
    }

    println!("{}", sum);
}
