// Exercise - ch20_04_ex: Associated Functions
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let sq = Rectangle::square(10);
    println!("Square: {} x {}", sq.width, sq.height);
}
