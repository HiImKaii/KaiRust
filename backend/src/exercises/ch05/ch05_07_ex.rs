// Chapter 5: Method Syntax
// Bài tập 7: Định nghĩa Methods với impl Block

#![allow(dead_code)]

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Định nghĩa một impl block cho Rectangle
impl Rectangle {
    // TODO: Định nghĩa method area (không có tham số khác ngoài &self)
    // Trả về diện tích = width * height
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    // Gọi method area bằng dot notation
    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_impl_block() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra impl block
        assert!(code_normalized.contains("implRectangle{"), "Chưa định nghĩa impl Rectangle!");
    }

    #[test]
    fn test_method_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra method area với &self
        assert!(code_normalized.contains("fnarea(&self)->u32") || code_normalized.contains("fnarea(&self)"),
            "Phải định nghĩa method area với tham số &self!");
    }

    #[test]
    fn test_method_body() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra body của method
        assert!(code_normalized.contains("self.width*self.height") || code_normalized.contains("self.width*self.height"),
            "Method area phải tính self.width * self.height!");
    }

    #[test]
    fn test_method_call() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra gọi method bằng dot notation
        assert!(code_normalized.contains("rect1.area()"),
            "Phải gọi method area() bằng dot notation!");
    }
}
