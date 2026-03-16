// Exercise - ch15_02_ex: Struct với method
#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }
impl Rectangle { fn area(&self) -> u32 { self.width * self.height } }
fn main() { let r = Rectangle { width: 30, height: 50 }; println!("{}", r.area()); }
