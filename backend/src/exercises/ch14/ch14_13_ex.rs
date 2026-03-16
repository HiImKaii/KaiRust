// Exercise - ch14_13_ex: Chain
fn main() { let a = vec![1, 2, 3]; let b = vec![4, 5, 6]; let c: Vec<i32> = a.into_iter().chain(b.into_iter()).collect(); println!("{:?}", c); }
