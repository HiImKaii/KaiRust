// Exercise - ch09_12_ex: Chaining Multiple Operations

use std::num::ParseIntError;

fn parse_positive(s: &str) -> Result<i32, String> {
    let n: i32 = s.parse().map_err(|_| "Parse error")?;
    if n < 0 {
        Err("Number must be positive".to_string())
    } else {
        Ok(n)
    }
}

fn factorial(n: i32) -> Result<i64, String> {
    if n < 0 {
        Err("Cannot compute factorial of negative number".to_string())
    } else if n > 20 {
        Err("Number too large, would overflow".to_string())
    } else {
        let mut result: i64 = 1;
        for i in 1..=n as i64 {
            result *= i;
        }
        Ok(result)
    }
}

fn parse_and_factorial(s: &str) -> Result<i64, String> {
    let n = parse_positive(s)?;
    factorial(n)
}

fn main() {
    match parse_and_factorial("5") {
        Ok(result) => println!("5! = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match parse_and_factorial("-1") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match parse_and_factorial("abc") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
