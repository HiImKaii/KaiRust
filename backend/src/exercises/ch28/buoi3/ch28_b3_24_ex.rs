// Exercise - ch28_b3_24: Chia táo 2
// C(n+m-1, n) hoặc C(n+m-1, m-1)

fn combination(n: u64, k: u64) -> u64 {
    if k > n {
        return 0;
    }
    if k == 0 || k == n {
        return 1;
    }
    if k > n - k {
        return combination(n, n - k);
    }

    let mut result: u64 = 1;
    for i in 0..k {
        result = result * (n - i) / (i + 1);
    }
    result
}

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let n: u64 = iter.next().unwrap().parse().unwrap(); // số trẻ em
    let m: u64 = iter.next().unwrap().parse().unwrap(); // số táo

    // C(n+m-1, n) = C(n+m-1, m-1)
    let result = combination(n + m - 1, n);
    println!("{}", result);
}
