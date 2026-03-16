// Exercise - ch14_06_ex: enumerate()
fn main() { let v = vec!["a", "b", "c"]; for (i, val) in v.iter().enumerate() { println!("{}: {}", i, val); } }
