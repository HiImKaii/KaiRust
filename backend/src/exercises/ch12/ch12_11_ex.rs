// Exercise - ch12_11_ex: Word Counter

use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Cách dùng: wc <filename>");
        return;
    }

    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    let lines = contents.lines().count();
    let words: Vec<&str> = contents.split_whitespace().collect();
    let chars = contents.chars().count();

    println!("{} {} {}", lines, words.len(), chars);
}
