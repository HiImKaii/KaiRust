// Chapter 5: Defining and Instantiating Structs
// Bài tập 5: Unit-Like Structs

// TODO: Định nghĩa một Unit-Like Struct AlwaysEqual
struct AlwaysEqual;

fn main() {
    // TODO: Tạo một instance của AlwaysEqual
    let subject = AlwaysEqual;

    println!("AlwaysEqual instance created successfully!");
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_unit_like_struct_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra định nghĩa unit-like struct
        assert!(code_normalized.contains("structAlwaysEqual;"),
            "Chưa định nghĩa struct AlwaysEqual (không có fields)!");
    }

    #[test]
    fn test_unit_like_struct_instantiation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra tạo instance
        assert!(code_normalized.contains("letsubject=AlwaysEqual"),
            "Chưa tạo instance của AlwaysEqual!");
    }
}
