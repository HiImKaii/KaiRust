// Exercise - ch09_03_ex: ? Operator

use std::num::ParseIntError;

fn read_number_from_str(s: &str) -> Result<i32, ParseIntError> {
    s.parse::<i32>()
}

fn multiply(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let a = a.parse::<i32>()?;
    let b = b.parse::<i32>()?;
    Ok(a * b)
}

fn main() {
    match read_number_from_str("42") {
        Ok(n) => println!("Số: {}", n),
        Err(e) => println!("Lỗi: {}", e),
    }

    match multiply("5", "3") {
        Ok(result) => println!("5 * 3 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
