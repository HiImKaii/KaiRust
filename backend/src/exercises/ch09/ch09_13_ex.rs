// Exercise - ch09_13_ex: Result trong Closures

fn main() {
    let numbers = vec!["1", "2", "abc", "4", "hello", "6"];

    // Parse tất cả strings thành numbers
    // Lọc bỏ các strings không hợp lệ
    let parsed: Vec<i32> = numbers
        .iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();

    println!("Parsed: {:?}", parsed);

    // Nhân đôi các số hợp lệ
    let doubled: Vec<i32> = parsed.iter().map(|x| x * 2).collect();
    println!("Doubled: {:?}", doubled);

    // Cộng tất cả
    let sum: i32 = parsed.iter().sum();
    println!("Sum: {}", sum);
}
