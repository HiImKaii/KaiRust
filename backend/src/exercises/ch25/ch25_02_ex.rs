// Exercise - ch25_02_ex: Tính tổng các chữ số

use std::io;

fn tong_chu_so(n: i32) -> i32 {
    let mut n = n;
    let mut sum = 0;
    while n > 0 {
        sum += n % 10;
        n /= 10;
    }
    sum
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    println!("{}", tong_chu_so(n));
}
