// Exercise - ch28_b3_04: Tổng điều hòa (3 chữ số thập phân)
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    let mut sum = 0.0;
    for i in 1..=n {
        sum += 1.0 / i as f64;
    }

    println!("{:.3}", sum);
}
