// Exercise - ch24_03_ex: In số từ 1 đến n

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    for i in 1..=n {
        if i > 1 {
            print!(" ");
        }
        print!("{}", i);
    }
    println!();
}
