// Exercise - ch12_04_ex: Environment Variables

use std::env;

fn main() {
    let user = env::var("USER")
        .or_else(|_| env::var("USERNAME"))
        .unwrap_or_else(|_| "Unknown".to_string());

    println!("User: {}", user);

    match env::var("PATH") {
        Ok(path) => println!("PATH: {}", path),
        Err(e) => println!("Lỗi đọc PATH: {}", e),
    }

    let custom = env::var("MY_VAR").unwrap_or_else(|_| "default".to_string());
    println!("MY_VAR: {}", custom);
}
