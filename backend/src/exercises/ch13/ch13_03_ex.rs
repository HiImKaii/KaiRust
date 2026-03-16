// Exercise - ch13_03_ex: Closure capturing environment
fn main() {
    let x = 10;
    let y = 5;
    let sum = || x + y;
    let product = || x * y;
    println!("Sum: {}", sum());
    println!("Product: {}", product());
    let mut count = 0;
    let mut increment = || { count += 1; count };
    println!("Count: {}", increment());
    println!("Count: {}", increment());
    println!("Count: {}", increment());
}
