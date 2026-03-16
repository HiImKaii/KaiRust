// Exercise - ch27_04_ex: Tổng hai ma trận
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut a = vec![vec![0i32; n]; n];
    let mut b = vec![vec![0i32; n]; n];

    for i in 0..n {
        for j in 0..n {
            input = String::new();
            io::stdin().read_line(&mut input).unwrap();
            a[i][j] = input.trim().parse().unwrap();
        }
    }
    for i in 0..n {
        for j in 0..n {
            input = String::new();
            io::stdin().read_line(&mut input).unwrap();
            b[i][j] = input.trim().parse().unwrap();
        }
    }

    for i in 0..n {
        for j in 0..n {
            if j > 0 { print!(" "); }
            print!("{}", a[i][j] + b[i][j]);
        }
        println!();
    }
}
