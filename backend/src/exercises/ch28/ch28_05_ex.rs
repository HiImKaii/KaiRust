// Exercise - ch28_05_ex: Sản phẩá cao nhm giất
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();

    let mut max_price = f64::MIN;
    let mut max_name = String::new();

    for _ in 0..n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let name = input.trim().to_string();

        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let price: f64 = input.trim().parse().unwrap();

        if price > max_price {
            max_price = price;
            max_name = name;
        }
    }

    println!("{}", max_name);
}
