// Exercise - ch26_01_ex: Tìm phần tử lớn nhất

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut max_val = i32::MIN;
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let x: i32 = input.trim().parse().unwrap();
        if x > max_val {
            max_val = x;
        }
    }

    println!("{}", max_val);
}
