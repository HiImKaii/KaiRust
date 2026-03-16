// Exercise - ch19_05_ex: If let Syntax
fn main() {
    let x = Some(5);
    if let Some(value) = x {
        println!("Giá trị: {}", value);
    }
}
