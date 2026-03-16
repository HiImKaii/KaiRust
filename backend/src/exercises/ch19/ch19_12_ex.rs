// Exercise - ch19_12_ex: Guard Expressions
fn main() {
    let x = 5;
    match x {
        n if n > 0 => println!("Dương"),
        n if n < 0 => println!("Âm"),
        _ => println!("Zero"),
    }
}
