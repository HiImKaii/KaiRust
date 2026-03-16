// Exercise - ch09_02_ex: Result cơ bản

fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10, 2) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }

    match divide(10, 0) {
        Ok(result) => println!("Kết quả: {}", result),
        Err(e) => println!("Lỗi: {}", e),
    }
}
