// Exercise - ch26_05_ex: Đếm số nguyên tố
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
    let n: usize = input.trim().parse().unwrap();

    let mut count = 0;
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let x: i32 = input.trim().parse().unwrap();
        if is_prime(x) { count += 1; }
    }

    println!("{}", count);
}
