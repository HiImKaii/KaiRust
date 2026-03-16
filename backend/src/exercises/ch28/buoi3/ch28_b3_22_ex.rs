// Exercise - ch28_b3_22: Two Knights
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    for k in 1..=n {
        if k <= 2 {
            println!("0");
            continue;
        }
        // Dùng u128 để tránh overflow
        let k128 = k as u128;
        // Tổng số cặp ô: k^2 * (k^2 - 1) / 2
        let total_pairs = (k128 * k128) * (k128 * k128 - 1) / 2;
        // Số cặp bị tấn công: 4 * (k-1) * (k-2)
        let attacked = 4 * (k128 - 1) * (k128 - 2);
        let result = total_pairs - attacked;
        println!("{}", result);
    }
}
