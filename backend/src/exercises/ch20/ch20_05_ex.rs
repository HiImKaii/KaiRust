// Exercise - ch20_05_ex: Multiple impl Blocks
struct Rectangle { width: u32, height: u32 }

impl Rectangle {
    fn area(&self) -> u32 { self.width * self.height }
}

impl Rectangle {
    fn perimeter(&self) -> u32 { 2 * (self.width + self.height) }
}

fn main() {
    let r = Rectangle { width: 30, height: 50 };
    println!("Area: {}, Perimeter: {}", r.area(), r.perimeter());
}
