// Exercise - ch28_b3_16: Đếm chữ số nguyên tố
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    let prime_digits = [2, 3, 5, 7];
    let mut count = 0u32;
    let mut temp = n;

    if temp == 0 {
        println!("0");
        return;
    }

    while temp > 0 {
        let digit = (temp % 10) as usize;
        if prime_digits.contains(&digit) {
            count += 1;
        }
        temp /= 10;
    }

    println!("{}", count);
}
