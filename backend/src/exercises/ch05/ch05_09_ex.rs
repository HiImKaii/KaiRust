// Chapter 5: Method Syntax
// Bài tập 9: Associated Functions (Constructor)

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // TODO: Định nghĩa associated function square
    // Nhận vào một tham số size: u32
    // Trả về một Rectangle với width = height = size
    // Sử dụng Self keyword
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    // Gọi associated function square bằng :: syntax
    let sq = Rectangle::square(3);

    println!("Square: {:?}", sq);
    println!("Square area: {}", sq.area());
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_associated_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra associated function square
        assert!(code_normalized.contains("fnsquare(size:u32)->Self") ||
                code_normalized.contains("fn square(size: u32) -> Self"),
            "Phải định nghĩa associated function square!");
    }

    #[test]
    fn test_self_keyword() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra sử dụng Self keyword
        assert!(code_normalized.contains("->Self{") || code_normalized.contains("->Self {"),
            "Phải return Self trong associated function!");
    }

    #[test]
    fn test_square_logic() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra tạo square với width = height = size
        assert!(code_normalized.contains("width:size") || code_normalized.contains("width: size"),
            "width phải bằng size!");
        assert!(code_normalized.contains("height:size") || code_normalized.contains("height: size"),
            "height phải bằng size!");
    }

    #[test]
    fn test_associated_function_call() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra gọi associated function bằng :: syntax
        assert!(code_normalized.contains("Rectangle::square(3)"),
            "Phải gọi Rectangle::square(3)!");
    }
}
