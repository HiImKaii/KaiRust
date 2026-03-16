// Exercise - ch09_05_ex: Custom Error Type

use std::fmt;

#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeRoot,
    Overflow,
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "Cannot divide by zero"),
            MathError::NegativeRoot => write!(f, "Cannot take square root of negative number"),
            MathError::Overflow => write!(f, "Number overflow"),
        }
    }
}

fn divide(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        Err(MathError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

fn sqrt(x: f64) -> Result<f64, MathError> {
    if x < 0.0 {
        Err(MathError::NegativeRoot)
    } else {
        Ok(x.sqrt())
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match sqrt(16.0) {
        Ok(result) => println!("sqrt(16) = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match sqrt(-4.0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
