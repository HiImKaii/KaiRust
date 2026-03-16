// Exercise - ch14_11_ex: partition()
fn main() { let (evens, odds): (Vec<i32>, Vec<i32>) = (1..=10).partition(|&x| x % 2 == 0); println!("Evens: {:?}\nOdds: {:?}", evens, odds); }
