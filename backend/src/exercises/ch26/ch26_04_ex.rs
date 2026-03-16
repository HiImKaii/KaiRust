// Exercise - ch26_04_ex: Tìm phần tử nhỏ nhất
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut min_val = i32::MAX;
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let x: i32 = input.trim().parse().unwrap();
        if x < min_val { min_val = x; }
    }

    println!("{}", min_val);
}
