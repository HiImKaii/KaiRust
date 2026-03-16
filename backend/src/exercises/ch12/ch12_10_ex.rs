// Exercise - ch12_10_ex: Command Line Calculator

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 4 {
        eprintln!("Cách dùng: calc <a> <operator> <b>");
        eprintln!("Ví dụ: calc 10 + 5");
        return;
    }

    let a: i32 = match args[1].parse() {
        Ok(n) => n,
        Err(_) => {
            eprintln!("Số thứ nhất không hợp lệ!");
            return;
        }
    };

    let op = &args[2];

    let b: i32 = match args[3].parse() {
        Ok(n) => n,
        Err(_) => {
            eprintln!("Số thứ hai không hợp lệ!");
            return;
        }
    };

    let result = match op.as_str() {
        "+" => a + b,
        "-" => a - b,
        "*" => a * b,
        "/" => {
            if b == 0 {
                eprintln!("Không thể chia cho 0!");
                return;
            }
            a / b
        }
        _ => {
            eprintln!("Phép toán không hợp lệ! Sử dụng +, -, *, /");
            return;
        }
    };

    println!("{} {} {} = {}", a, op, b, result);
}
