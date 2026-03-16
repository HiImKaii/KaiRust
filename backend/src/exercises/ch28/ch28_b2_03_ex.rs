// Exercise - ch28_b2_03_ex: 1A - Lát gạch
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let n: i64 = iter.next().unwrap().parse().unwrap();
    let m: i64 = iter.next().unwrap().parse().unwrap();
    let a: i64 = iter.next().unwrap().parse().unwrap();

    let tiles_n = (n + a - 1) / a;
    let tiles_m = (m + a - 1) / a;

    let result = tiles_n * tiles_m;
    println!("{}", result);
}
