// Exercise - ch14_14_ex: cloned()
fn main() { let v = vec![&1, &2, &3]; let c: Vec<i32> = v.into_iter().cloned().collect(); println!("{:?}", c); }
