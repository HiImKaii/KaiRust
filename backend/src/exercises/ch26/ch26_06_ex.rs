// Exercise - ch26_06_ex: Sắp xếp mảng giảm dần
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut arr = Vec::new();
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let val: i32 = input.trim().parse().unwrap();
        arr.push(val);
    }

    arr.sort_by(|a, b| b.cmp(a));
    for (i, v) in arr.iter().enumerate() {
        if i > 0 { print!(" "); }
        print!("{}", v);
    }
    println!();
}
