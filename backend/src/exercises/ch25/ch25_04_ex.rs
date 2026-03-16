// Exercise - ch25_04_ex: Hoán đổi hai số

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut a: i32 = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut b: i32 = input.trim().parse().unwrap();

    // Hoán đổi
    let temp = a;
    a = b;
    b = temp;

    println!("{} {}", a, b);
}
