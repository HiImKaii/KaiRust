#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_while_loop_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_mut_number = code.contains("let mut number = 5;");
        assert!(has_mut_number, "Bạn chưa khởi tạo `let mut number = 5;`!");

        let has_while = code.contains("while number != 0");
        assert!(has_while, "Bạn chưa sử dụng vòng lặp `while number != 0`");

        let prints_msg = code.contains("\"Khai hỏa!\"");
        assert!(prints_msg, "Bạn quên in thông điệp Khai hỏa!");
    }
}
