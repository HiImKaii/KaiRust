// Exercise - ch12_08_ex: Mini Grep - Basic

use std::env;
use std::fs;
use std::process;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Cách dùng: grep <keyword> <filename>");
        process::exit(1);
    }

    let keyword = &args[1];
    let filename = &args[2];

    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for line in contents.lines() {
        if line.contains(keyword) {
            println!("{}", line);
        }
    }
}
