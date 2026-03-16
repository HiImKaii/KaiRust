// Exercise - ch24_06_ex: Bảng cửu chương

use std::io;

fn main() {
    for i in 1..=9 {
        for j in 1..=10 {
            if j > 1 {
                print!(" ");
            }
            print!("{}", i * j);
        }
        println!();
    }
}
