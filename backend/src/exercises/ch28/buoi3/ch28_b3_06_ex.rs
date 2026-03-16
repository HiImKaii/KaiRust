// Exercise - ch28_b3_06: Dãy đan dấu
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();

    let mut result = 0i64;
    for i in 1..=n {
        if i % 2 == 1 {
            result -= i;
        } else {
            result += i;
        }
    }

    println!("{}", result);
}
