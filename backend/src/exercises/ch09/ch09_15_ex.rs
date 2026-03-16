// Exercise - ch09_15_ex: Tổng hợp Error Handling

use std::num::ParseIntError;

#[derive(Debug)]
enum CalcError {
    ParseError(ParseIntError),
    DivisionByZero,
    InvalidOperation(String),
}

impl std::fmt::Display for CalcError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            CalcError::ParseError(e) => write!(f, "Parse error: {}", e),
            CalcError::DivisionByZero => write!(f, "Cannot divide by zero"),
            CalcError::InvalidOperation(op) => write!(f, "Invalid operation: {}", op),
        }
    }
}

fn calculate(a: &str, op: &str, b: &str) -> Result<i32, CalcError> {
    let a: i32 = a.parse().map_err(CalcError::ParseError)?;
    let b: i32 = b.parse().map_err(CalcError::ParseError)?;

    match op {
        "+" => Ok(a + b),
        "-" => Ok(a - b),
        "*" => Ok(a * b),
        "/" => {
            if b == 0 {
                Err(CalcError::DivisionByZero)
            } else {
                Ok(a / b)
            }
        }
        _ => Err(CalcError::InvalidOperation(op.to_string())),
    }
}

fn main() {
    // Test cộng
    match calculate("10", "+", "5") {
        Ok(result) => println!("10 + 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test trừ
    match calculate("10", "-", "5") {
        Ok(result) => println!("10 - 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test nhân
    match calculate("10", "*", "5") {
        Ok(result) => println!("10 * 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test chia
    match calculate("10", "/", "5") {
        Ok(result) => println!("10 / 5 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test chia cho 0
    match calculate("10", "/", "0") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test parse error
    match calculate("abc", "+", "5") {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
