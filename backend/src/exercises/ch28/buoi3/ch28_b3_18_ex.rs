// Exercise - ch28_b3_18: Tổng các số nguyên tố
// Phân tích n thành tổng các số nguyên tố sao cho số lượng các số hạng là lớn nhất

fn is_prime(n: u64) -> bool {
    if n < 2 {
        return false;
    }
    if n == 2 {
        return true;
    }
    if n % 2 == 0 {
        return false;
    }
    let mut i = 3;
    while i * i <= n {
        if n % i == 0 {
            return false;
        }
        i += 2;
    }
    true
}

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    // Chiến lược: dùng càng nhiều số 2 càng tốt (vì 2 là số nguyên tố nhỏ nhất)
    // Nếu n là số nguyên tố → 1 số hạng
    // Nếu n chẵn → toàn số 2
    // Nếu n lẻ và không phải số nguyên tố → dùng 1 số 3 + (n-3)/2 số 2

    let result = if is_prime(n) {
        1
    } else if n % 2 == 0 {
        n / 2
    } else {
        // n lẻ và không phải số nguyên tố
        // Dùng 1 số 3 + (n-3)/2 số 2
        1 + (n - 3) / 2
    };

    println!("{}", result);
}
