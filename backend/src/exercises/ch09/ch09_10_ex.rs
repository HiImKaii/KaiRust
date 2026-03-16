// Exercise - ch09_10_ex: and_then và or_else

fn safe_divide(a: i32, b: i32) -> Option<i32> {
    if b == 0 {
        None
    } else {
        Some(a / b)
    }
}

fn divide_and_add(a: i32, b: i32, c: i32) -> Option<i32> {
    safe_divide(a, b).and_then(|result| result.checked_add(c))
}

fn try_parse(s: &str) -> Option<i32> {
    s.parse::<i32>().ok()
}

fn parse_or_default(s: &str) -> i32 {
    try_parse(s).unwrap_or(0)
}

fn main() {
    match safe_divide(10, 2) {
        Some(result) => println!("10 / 2 = {}", result),
        None => println!("Không thể chia"),
    }

    match safe_divide(10, 0) {
        Some(result) => println!("Kết quả: {}", result),
        None => println!("Không thể chia cho 0"),
    }

    let a = parse_or_default("42");
    let b = parse_or_default("abc");
    println!("a = {}, b = {}", a, b);
}
