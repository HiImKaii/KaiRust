// Exercise - ch09_06_ex: Propagating Errors

use std::num::ParseIntError;

fn read_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.parse::<i32>()?;
    Ok(n * 2)
}

fn read_and_add_three(s1: &str, s2: &str) -> Result<i32, ParseIntError> {
    let a = s1.parse::<i32>()?;
    let b = s2.parse::<i32>()?;
    Ok(a + b)
}

fn main() {
    match read_and_double("21") {
        Ok(result) => println!("21 * 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match read_and_add_three("10", "20") {
        Ok(result) => println!("10 + 20 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
