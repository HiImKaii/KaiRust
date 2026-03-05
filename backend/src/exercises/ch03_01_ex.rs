#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_variables_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        
        // Kiểm tra xem có khai báo biến x bất biến không: let x = 5
        let has_immutable_x = code.contains("let x = 5;") || code.contains("let x: i32 = 5;");
        assert!(has_immutable_x, "Bạn chưa khai báo biến bất biến x = 5 đúng cách!");
        assert!(!code.contains("let mut x = 5;"), "Biến x phải là bất biến (không dùng mut)!");

        // Kiểm tra xem có khai báo biến y khả biến không: let mut y = 10
        let has_mutable_y = code.contains("let mut y = 10;") || code.contains("let mut y: i32 = 10;");
        assert!(has_mutable_y, "Bạn chưa khai báo biến khả biến y = 10 đúng cách!");

        // Kiểm tra việc gán lại y = 20
        let assigns_y_to_20 = code.contains("y = 20;");
        assert!(assigns_y_to_20, "Bạn chưa gán lại giá trị y = 20!");
    }
}
