// Chapter 5: Example Program - Using Structs
// Bài tập 6: Tính diện tích hình chữ nhật với Struct

// TODO: Định nghĩa struct Rectangle với width và height là u32
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Viết hàm area nhận vào tham chiếu Rectangle và trả về diện tích
fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}

fn main() {
    // Tạo instance Rectangle
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    // Tính và in diện tích
    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );

    // In struct ra màn hình (sử dụng Debug trait)
    println!("rect1 is {:?}", rect1);
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_rectangle_struct() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra định nghĩa Rectangle
        assert!(code_normalized.contains("structRectangle{"), "Chưa định nghĩa struct Rectangle!");
        assert!(code_normalized.contains("width:u32"), "Thiếu field width: u32!");
        assert!(code_normalized.contains("height:u32"), "Thiếu field height: u32!");
    }

    #[test]
    fn test_area_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra hàm area
        assert!(code_normalized.contains("fnarea(&Rectangle)->u32") || code_normalized.contains("fnarea(rectangle:&Rectangle)->u32"),
            "Chưa định nghĩa hàm area với tham số &Rectangle!");
        assert!(code_normalized.contains("rectangle.width*rectangle.height"),
            "Hàm area phải tính rectangle.width * rectangle.height!");
    }

    #[test]
    fn test_debug_trait() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra derive Debug
        assert!(code_normalized.contains("#[derive(Debug)]") || code_normalized.contains("#[derive(Debug)]structRectangle"),
            "Phải derive(Debug) cho Rectangle để in được!");
    }
}
