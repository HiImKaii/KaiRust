// Exercise - ch12_01_ex: Command Line Arguments

use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    println!("Số lượng arguments: {}", args.len());

    for (i, arg) in args.iter().enumerate() {
        println!("Arg {}: {}", i, arg);
    }
}
