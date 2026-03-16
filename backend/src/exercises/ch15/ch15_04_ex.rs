// Exercise - ch15_04_ex: Multiple impl blocks
#[derive(Debug)] struct Rectangle { width: u32, height: u32 }
impl Rectangle { fn area(&self) -> u32 { self.width * self.height } }
impl Rectangle { fn perimeter(&self) -> u32 { 2 * (self.width + self.height) } }
fn main() { let r = Rectangle { width: 30, height: 50 }; println!("{} {}", r.area(), r.perimeter()); }
