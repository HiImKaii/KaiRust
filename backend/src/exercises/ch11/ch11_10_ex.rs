// Exercise - ch11_10_ex: Testing Custom Types

#[derive(Debug, Clone, PartialEq)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn new(width: u32, height: u32) -> Self {
        Rectangle { width, height }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle::new(30, 50);
    let rect2 = Rectangle::new(10, 40);
    let rect3 = Rectangle::new(35, 55);

    // Test area
    assert_eq!(rect1.area(), 1500);

    // Test perimeter
    assert_eq!(rect1.perimeter(), 160);

    // Test can_hold
    assert!(rect1.can_hold(&rect2));
    assert!(!rect2.can_hold(&rect1));
    assert!(rect3.can_hold(&rect1));

    // Test equality
    let rect4 = Rectangle::new(30, 50);
    assert_eq!(rect1, rect4);

    // Test clone
    let rect5 = rect1.clone();
    assert_eq!(rect1, rect5);

    println!("Custom type tests passed!");
}
