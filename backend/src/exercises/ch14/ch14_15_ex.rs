// Exercise - ch14_15_ex: Tổng hợp Iterator
fn main() { let result: i32 = (1..=100).filter(|&x| x % 3 == 0).sum(); println!("Sum of multiples of 3: {}", result); }
