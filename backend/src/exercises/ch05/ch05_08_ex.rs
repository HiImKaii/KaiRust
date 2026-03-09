// Chapter 5: Method Syntax
// Bài tập 8: Methods với nhiều Parameters

#![allow(dead_code)]

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // TODO: Định nghĩa method can_hold nhận vào tham chiếu Rectangle khác
    // Trả về true nếu self có thể chứa được other (width và height đều lớn hơn)
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    // Kiểm tra rect1 có thể chứa rect2 không
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_can_hold_method() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra method can_hold
        assert!(code_normalized.contains("fncan_hold(&self,other:&Rectangle)->bool") ||
                code_normalized.contains("fncan_hold(&self, other: &Rectangle) -> bool"),
            "Phải định nghĩa method can_hold với tham số &Rectangle!");
    }

    #[test]
    fn test_can_hold_logic() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra logic so sánh
        assert!(code_normalized.contains("self.width>other.width") || code_normalized.contains("self.width>other.width&&self.height>other.height"),
            "Phải so sánh cả width và height!");
    }

    #[test]
    fn test_can_hold_call() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra gọi method với tham số
        assert!(code_normalized.contains("rect1.can_hold(&rect2)"),
            "Phải gọi rect1.can_hold(&rect2)!");
    }
}
