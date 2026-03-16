// Exercise - ch28_b3_26: Số 0 tận cùng của n!
// Đếm số lượng số 0 tận cùng của n!
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    // Số 0 tận cùng = số lần xuất hiện của thừa số 5 trong n!
    // Vì 2 có nhiều hơn 5
    let mut count = 0u64;
    let mut div = n / 5;
    while div > 0 {
        count += div;
        div /= 5;
    }

    println!("{}", count);
}
