// Exercise - ch27_06_ex: Ma trận xoáy ốc
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut a = vec![vec![0i32; n]; n];
    let mut val = 1i32;
    let mut top = 0usize;
    let mut bottom = n - 1;
    let mut left = 0usize;
    let mut right = n - 1;

    while top <= bottom && left <= right {
        for j in left..=right {
            a[top][j] = val;
            val += 1;
        }
        top += 1;
        for i in top..=bottom {
            a[i][right] = val;
            val += 1;
        }
        right -= 1;
        if top <= bottom {
            for j in (left..=right).rev() {
                a[bottom][j] = val;
                val += 1;
            }
            bottom -= 1;
        }
        if left <= right {
            for i in (top..=bottom).rev() {
                a[i][left] = val;
                val += 1;
            }
            left += 1;
        }
    }

    for i in 0..n {
        for j in 0..n {
            if j > 0 { print!(" "); }
            print!("{}", a[i][j]);
        }
        println!();
    }
}
