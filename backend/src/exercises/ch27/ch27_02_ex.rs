// Exercise - ch27_02_ex: Tổng đường chéo chính
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut sum = 0;
    for i in 0..n {
        for j in 0..n {
            input = String::new();
            io::stdin().read_line(&mut input).unwrap();
            let val: i32 = input.trim().parse().unwrap();
            if i == j { sum += val; }
        }
    }

    println!("{}", sum);
}
