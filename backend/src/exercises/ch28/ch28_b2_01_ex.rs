// Exercise - ch28_b2_01_ex: 224A - Tổng độ dài các cạnh hình hộp
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let s1: i64 = iter.next().unwrap().parse().unwrap();
    let s2: i64 = iter.next().unwrap().parse().unwrap();
    let s3: i64 = iter.next().unwrap().parse().unwrap();

    // Tính a, b, c từ diện tích 3 mặt
    // a*b = s1, b*c = s2, c*a = s3
    // a = sqrt(s1*s3/s2), b = sqrt(s1*s2/s3), c = sqrt(s2*s3/s1)
    let a = ((s1 * s3) as f64 / s2 as f64).sqrt() as i64;
    let b = ((s1 * s2) as f64 / s3 as f64).sqrt() as i64;
    let c = ((s2 * s3) as f64 / s1 as f64).sqrt() as i64;

    let result = 4 * (a + b + c);
    println!("{}", result);
}
