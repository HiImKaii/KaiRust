// Exercise - ch28_b3_14: Tổng chữ số chẵn và lẻ
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    let mut sum_even = 0u64;
    let mut sum_odd = 0u64;
    let mut temp = n;

    if temp == 0 {
        println!("0\n0");
        return;
    }

    while temp > 0 {
        let digit = temp % 10;
        if digit % 2 == 0 {
            sum_even += digit;
        } else {
            sum_odd += digit;
        }
        temp /= 10;
    }

    println!("{}\n{}", sum_even, sum_odd);
}
