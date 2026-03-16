// Exercise - ch15_05_ex: Tuple structs
#[derive(Debug)] struct Color(i32, i32, i32);
fn main() { let c = Color(255, 0, 0); println!("{:?}", c); }
