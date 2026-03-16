// Exercise - ch29_04_ex: Chuẩn hóa tên
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();

    let words: Vec<&str> = s.split_whitespace().collect();
    let mut result = Vec::new();

    for word in words {
        let mut chars = word.chars();
        if let Some(first) = chars.next() {
            let rest: String = chars.collect();
            let capitalized = first.to_uppercase().to_string() + &rest.to_lowercase();
            result.push(capitalized);
        }
    }

    println!("{}", result.join(" "));
}
