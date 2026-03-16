// Exercise - ch28_b3_15: Đếm chữ số chẵn lẻ
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    let mut count_even = 0u32;
    let mut count_odd = 0u32;
    let mut temp = n;

    if temp == 0 {
        println!("1 0");
        return;
    }

    while temp > 0 {
        let digit = (temp % 10) as u32;
        if digit % 2 == 0 {
            count_even += 1;
        } else {
            count_odd += 1;
        }
        temp /= 10;
    }

    println!("{} {}", count_even, count_odd);
}
