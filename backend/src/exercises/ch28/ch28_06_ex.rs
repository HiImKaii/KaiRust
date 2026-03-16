// Exercise - ch28_06_ex: Sắp xếp mảng struct
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut arr = Vec::new();
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let name = input.trim().to_string();

        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let score: i32 = input.trim().parse().unwrap();

        arr.push((name, score));
    }

    arr.sort_by(|a, b| a.0.cmp(&b.0));

    for (name, score) in arr {
        println!("{} {}", name, score);
    }
}
