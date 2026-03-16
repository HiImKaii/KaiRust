// Exercise - ch28_b2_02_ex: 50A - Domino
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let m: i64 = iter.next().unwrap().parse().unwrap();
    let n: i64 = iter.next().unwrap().parse().unwrap();

    let result = (m * n) / 2;
    println!("{}", result);
}
