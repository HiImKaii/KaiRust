// Exercise - ch19_02_ex: Matching with Ranges
fn main() {
    let x = 5;
    match x {
        1..=5 => println!("1 đến 5"),
        6..=10 => println!("6 đến 10"),
        _ => println!("Khác"),
    }
}
