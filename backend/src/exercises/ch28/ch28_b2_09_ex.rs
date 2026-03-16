// Exercise - ch28_b2_09_ex: 476A - Leo cầu thang
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let n: i64 = iter.next().unwrap().parse().unwrap();
    let m: i64 = iter.next().unwrap().parse().unwrap();

    // Số bước tối thiểu (dùng toàn 2 bước)
    let min_steps = (n + 1) / 2;

    // Tìm số nhỏ nhất >= min_steps và là bội của m
    let steps = ((min_steps + m - 1) / m) * m;

    // Kiểm tra có thể đạt được không (tối đa n bước với mỗi bước 1-2)
    // Số bước tối đa = n (toàn 1 bước)
    if steps <= n {
        println!("{}", steps);
    } else {
        println!("-1");
    }
}
