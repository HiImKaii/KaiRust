// Exercise - ch28_b3_12: Đếm số chữ số
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    if n == 0 {
        println!("1");
        return;
    }

    let mut count = 0;
    let mut temp = n;
    while temp > 0 {
        count += 1;
        temp /= 10;
    }

    println!("{}", count);
}
