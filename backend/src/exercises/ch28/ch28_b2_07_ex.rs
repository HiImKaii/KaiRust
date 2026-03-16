// Exercise - ch28_b2_07_ex: 1061A - Đổi tiền
// Với các đồng xu có mệnh giá 1, 2, 3, ..., n (mỗi loại có thể dùng nhiều đồng)
// Dùng càng nhiều đồng mệnh giá lớn càng tốt
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.trim().split_whitespace();
    let n: i64 = iter.next().unwrap().parse().unwrap();
    let s: i64 = iter.next().unwrap().parse().unwrap();

    let mut result = 0i64;
    let mut remaining = s;

    // Dùng greedy: từ mệnh giá n đến 1
    let mut current_coin = n;
    while current_coin >= 1 && remaining > 0 {
        result += remaining / current_coin;
        remaining = remaining % current_coin;
        current_coin -= 1;
    }

    println!("{}", result);
}
