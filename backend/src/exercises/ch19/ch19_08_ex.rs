// Exercise - ch19_08_ex: Matching Multiple Values
fn main() {
    let x = 1;
    match x {
        1 | 2 | 3 => println!("1-3"),
        4 | 5 | 6 => println!("4-6"),
        _ => println!("Khác"),
    }
}
