// Exercise - ch09_08_ex: Multiple Error Types

use std::error::Error;

fn parse_and_divide(a: &str, b: &str) -> Result<i32, Box<dyn Error>> {
    let a: i32 = a.parse()?;
    let b: i32 = b.parse()?;
    if b == 0 {
        return Err("Cannot divide by zero".into());
    }
    Ok(a / b)
}

fn main() {
    match parse_and_divide("10", "2") {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match parse_and_divide("abc", "2") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi parse: {}", e),
    }

    match parse_and_divide("10", "0") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi chia: {}", e),
    }
}
