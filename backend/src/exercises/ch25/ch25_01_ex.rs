// Exercise - ch25_01_ex: Hàm tính giai thừa

use std::io;

fn giai_thua(n: u64) -> u64 {
    if n == 0 || n == 1 {
        return 1;
    }
    n * giai_thua(n - 1)
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    println!("{}", giai_thua(n));
}
