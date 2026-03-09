// Chapter 5: Method Syntax
// Bài tập 10: Multiple impl Blocks

#![allow(dead_code)]

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Định nghĩa impl block đầu tiên với method area
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// TODO: Định nghĩa impl block thứ hai với method can_hold
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    println!("Area of rect1: {}", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_multiple_impl_blocks() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Đếm số lượng impl Rectangle
        let impl_count = user_code.matches("impl Rectangle").count();
        assert!(impl_count >= 2, "Phải có ít nhất 2 impl blocks cho Rectangle!");
    }

    #[test]
    fn test_area_in_first_impl() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra method area
        assert!(code_normalized.contains("fnarea(&self)"),
            "Phải có method area trong impl block!");
    }

    #[test]
    fn test_can_hold_in_second_impl() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra method can_hold
        assert!(code_normalized.contains("fncan_hold(&self,other:&Rectangle)->bool"),
            "Phải có method can_hold trong impl block!");
    }
}
