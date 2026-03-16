// Exercise - ch12_12_ex: CSV Parser

use std::fs;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        eprintln!("Cách dùng: csv <filename>");
        return;
    }

    let filename = &args[1];
    let contents = fs::read_to_string(filename)
        .expect("Không thể đọc file");

    for (i, line) in contents.lines().enumerate() {
        let fields: Vec<&str> = line.split(',').collect();
        println!("Dòng {}: {:?}", i + 1, fields);
    }
}
