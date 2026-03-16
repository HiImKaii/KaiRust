// Exercise - ch20_07_ex: References and Borrowing in Methods
struct Rectangle { width: u32, height: u32 }

impl Rectangle {
    fn width(&self) -> u32 { self.width }
    fn height(&self) -> u32 { self.height }
}

fn main() {
    let r = Rectangle { width: 30, height: 50 };
    println!("{} x {}", r.width(), r.height());
}
