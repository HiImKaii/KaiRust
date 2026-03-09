// Chapter 5: Defining and Instantiating Structs
// Bài tập 4: Tuple Structs

#![allow(dead_code)]

// TODO: Định nghĩa Tuple Struct Color với 3 tham số i32
struct Color(i32, i32, i32);

// TODO: Định nghĩa Tuple Struct Point với 3 tham số i32
struct Point(i32, i32, i32);

fn main() {
    // Tạo instance Color
    let black = Color(0, 0, 0);

    // Tạo instance Point
    let origin = Point(0, 0, 0);

    // Truy cập các field bằng index
    println!("Black color: R={}, G={}, B={}", black.0, black.1, black.2);
    println!("Origin point: x={}, y={}, z={}", origin.0, origin.1, origin.2);

    // TODO: Destructure tuple struct
    let Point(x, y, z) = origin;
    println!("Destructured point: x={}, y={}, z={}", x, y, z);
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_tuple_struct_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra định nghĩa Color tuple struct
        assert!(code_normalized.contains("structColor(i32,i32,i32)"),
            "Chưa định nghĩa Color(i32, i32, i32)!");

        // Kiểm tra định nghĩa Point tuple struct
        assert!(code_normalized.contains("structPoint(i32,i32,i32)"),
            "Chưa định nghĩa Point(i32, i32, i32)!");
    }

    #[test]
    fn test_tuple_struct_instantiation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra tạo instance
        assert!(code_normalized.contains("letblack=Color(0,0,0)"),
            "Chưa tạo Color(0, 0, 0)!");
        assert!(code_normalized.contains("letorigin=Point(0,0,0)"),
            "Chưa tạo Point(0, 0, 0)!");
    }

    #[test]
    fn test_tuple_struct_access() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra truy cập bằng index
        assert!(code_normalized.contains("black.0") || code_normalized.contains("black.1") || code_normalized.contains("black.2"),
            "Phải truy cập tuple struct bằng index (.0, .1, .2)!");
    }

    #[test]
    fn test_tuple_struct_destructuring() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra destructure
        assert!(code_normalized.contains("letPoint(x,y,z)=origin"),
            "Phải destructure tuple struct Point!");
    }
}
