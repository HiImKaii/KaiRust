// Exercise - ch09_09_ex: Error Handling với Map

fn parse_and_square(s: &str) -> Result<i32, String> {
    s.parse::<i32>()
        .map(|n| n * n)
        .map_err(|_| "Parse error".to_string())
}

fn square(n: i32) -> Result<i32, String> {
    if n >= 0 {
        Ok(n * n)
    } else {
        Err("Cannot square negative number".to_string())
    }
}

fn main() {
    match parse_and_square("5") {
        Ok(result) => println!("5^2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match parse_and_square("abc") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match square(-5) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
