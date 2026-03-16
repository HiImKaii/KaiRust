// Exercise - ch28_b3_21: Sao Hoa - Ngày nghỉ
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u64 = input.trim().parse().unwrap();

    // Một tuần có 7 ngày: 5 ngày làm + 2 ngày nghỉ
    // Số tuần đầy đủ
    let full_weeks = n / 7;
    let remaining_days = n % 7;

    // Ngày nghỉ tối thiểu: các tuần đầy đủ + phần dư (tối đa 2 ngày nghỉ trong phần dư)
    let min_rest = full_weeks * 2 + remaining_days.min(2);

    // Ngày nghỉ tối đa: các tuần đầy đủ + phần dư (nếu phần dư >= 5 thì có thể có 2 ngày nghỉ)
    let max_rest = if remaining_days >= 5 {
        full_weeks * 2 + 2
    } else {
        full_weeks * 2 + remaining_days
    };

    println!("{} {}", min_rest, max_rest);
}
