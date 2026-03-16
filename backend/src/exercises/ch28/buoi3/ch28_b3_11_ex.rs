// Exercise - ch28_b3_11: Lũy thừa
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let base: u64 = iter.next().unwrap().parse().unwrap();
    let exp: u32 = iter.next().unwrap().parse().unwrap();

    let result = base.pow(exp);
    println!("{}", result);
}
