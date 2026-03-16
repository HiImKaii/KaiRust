// Exercise - ch26_02_ex: Tìm kiếm tuyến tính

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let x: i32 = input.trim().parse().unwrap();

    let mut arr = Vec::new();
    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let val: i32 = input.trim().parse().unwrap();
        arr.push(val);
    }

    for i in 0..n {
        if arr[i] == x {
            println!("{}", i);
            return;
        }
    }
    println!("-1");
}
