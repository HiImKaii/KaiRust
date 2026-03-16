// Exercise - ch19_13_ex: Binding with @ Patterns
fn main() {
    let x = 5;
    match x {
        n @ 1..=5 => println!("Matched: {}", n),
        _ => println!("Not matched"),
    }
}
