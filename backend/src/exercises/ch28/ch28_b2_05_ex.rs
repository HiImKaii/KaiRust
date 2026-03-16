// Exercise - ch28_b2_05_ex: 515A - Draxil và Varda
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let a: i64 = iter.next().unwrap().parse().unwrap();
    let b: i64 = iter.next().unwrap().parse().unwrap();
    let s: i64 = iter.next().unwrap().parse().unwrap();

    let min_steps = a.abs() + b.abs();
    let remaining = s - min_steps;

    if s >= min_steps && remaining % 2 == 0 {
        println!("YES");
    } else {
        println!("NO");
    }
}
