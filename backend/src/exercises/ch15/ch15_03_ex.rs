// Exercise - ch15_03_ex: Associated functions
#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }
impl Rectangle { fn square(size: u32) -> Self { Rectangle { width: size, height: size } } }
fn main() { let s = Rectangle::square(10); println!("{:?}", s); }
