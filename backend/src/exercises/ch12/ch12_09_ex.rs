// Exercise - ch12_09_ex: Mini Grep - Case Insensitive

use std::env;
use std::fs;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Cách dùng: grep <keyword> <filename>");
        process::exit(1);
    }

    let keyword = args[1].to_lowercase();
    let filename = &args[2];

    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for line in contents.lines() {
        if line.to_lowercase().contains(&keyword) {
            println!("{}", line);
        }
    }
}
