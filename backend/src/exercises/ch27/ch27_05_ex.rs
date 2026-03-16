// Exercise - ch27_05_ex: Tích hai ma trận
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

    let mut c = vec![vec![0i32; n]; n];
    for i in 0..n {
        for j in 0..n {
            for k in 0..n {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    for i in 0..n {
        for j in 0..n {
            if j > 0 { print!(" "); }
            print!("{}", c[i][j]);
        }
        println!();
    }
}
