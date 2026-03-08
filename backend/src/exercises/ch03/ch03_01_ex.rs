#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_variables_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Tách riêng user code và test code
        // User code kết thúc trước #[cfg(test)]
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);

        // Remove all whitespace for flexible matching - CHỈ trên user code!
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra x có giá trị 5 và KHÔNG có mut
        let has_x_equals_5 = code_normalized.contains("letx=5") || code_normalized.contains("letx:i32=5");
        let has_mut_x = code_normalized.contains("letmutx=5") || code_normalized.contains("letmutx:i32=5");

        assert!(has_x_equals_5, "Bạn chưa khai báo biến x = 5 đúng cách!");
        assert!(!has_mut_x, "Biến x phải là bất biến (không dùng mut)!");

        // Kiểm tra y có mut và bằng 10
        let has_mut_y = code_normalized.contains("letmuty=10") || code_normalized.contains("letmuty:i32=10");
        assert!(has_mut_y, "Bạn chưa khai báo biến khả biến y = 10 đúng cách!");

        // Kiểm tra y = 20
        let has_y_20 = code_normalized.contains("y=20");
        assert!(has_y_20, "Bạn chưa gán lại giá trị y = 20!");
    }
}
