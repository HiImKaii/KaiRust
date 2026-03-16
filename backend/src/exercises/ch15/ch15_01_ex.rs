// Exercise - ch15_01_ex: Struct cơ bản
#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }
fn main() { let r = Rectangle { width: 30, height: 50 }; println!("{:?}", r); }
