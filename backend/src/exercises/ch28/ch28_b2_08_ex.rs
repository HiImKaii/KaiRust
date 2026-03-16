// Exercise - ch28_b2_08_ex: 996A - Rút tiền
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    let bills = [100, 20, 10, 5, 1];
    let mut count = 0;
    let mut remaining = n;

    for &bill in &bills {
        count += remaining / bill;
        remaining %= bill;
    }

    println!("{}", count);
}
