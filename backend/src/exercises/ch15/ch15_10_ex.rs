// Exercise - ch15_10_ex: Mutable struct
#[derive(Debug)] struct Rectangle { width: u32, height: u32 }
fn main() { let mut r = Rectangle { width: 30, height: 50 }; r.width = 40; println!("{:?}", r); }
