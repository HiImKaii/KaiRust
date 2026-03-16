// Exercise - ch28_b2_04_ex: Frog - Ếch nhảy
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let a: i64 = iter.next().unwrap().parse().unwrap();
    let b: i64 = iter.next().unwrap().parse().unwrap();
    let k: i64 = iter.next().unwrap().parse().unwrap();

    let right_jumps = (k + 1) / 2;
    let left_jumps = k / 2;

    let result = right_jumps * a - left_jumps * b;
    println!("{}", result);
}
