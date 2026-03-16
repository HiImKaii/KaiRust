// Exercise - ch24_05_ex: Switch-case - Ngày trong tuần

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    match n {
        1 => println!("Chu Nhat"),
        2 => println!("Hai"),
        3 => println!("Ba"),
        4 => println!("Tu"),
        5 => println!("Nam"),
        6 => println!("Sau"),
        7 => println!("Thu Bay"),
        _ => println!(""),
    }
}
