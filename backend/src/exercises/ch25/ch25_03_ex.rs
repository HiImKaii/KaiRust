// Exercise - ch25_03_ex: Kiểm tra số nguyên tố

use std::io;

fn is_prime(n: i32) -> bool {
    if n < 2 { return false; }
    if n == 2 { return true; }
    if n % 2 == 0 { return false; }
    for i in (3..((n as f64).sqrt() as i32) + 1).step_by(2) {
        if n % i == 0 { return false; }
    }
    true
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    if is_prime(n) {
        println!("1");
    } else {
        println!("0");
    }
}
