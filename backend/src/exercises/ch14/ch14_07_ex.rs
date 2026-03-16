// Exercise - ch14_07_ex: cycle()
fn main() { let v: Vec<i32> = vec![1, 2].into_iter().cycle().take(6).collect(); println!("{:?}", v); }
