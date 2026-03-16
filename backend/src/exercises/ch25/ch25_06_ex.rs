// Exercise - ch25_06_ex: Fibonacci

use std::io;

fn fibonacci(n: u32) -> u64 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }
    let mut a = 0u64;
    let mut b = 1u64;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u32 = input.trim().parse().unwrap();

    println!("{}", fibonacci(n));
}
