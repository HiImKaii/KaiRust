// Exercise - ch19_01_ex: Pattern Matching Basics

fn main() {
    let x = 5;
    match x {
        1 => println!("One"),
        2 => println!("Two"),
        3 => println!("Three"),
        _ => println!("Other"),
    }
}
