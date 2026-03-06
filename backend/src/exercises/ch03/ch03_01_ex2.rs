#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shadowing_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_first_let = code.contains("let secret_number = \"42\"");
        assert!(has_first_let, "Bạn chưa khai báo biến secret_number là kiểu chuỗi chữ!");

        let has_shadowing = code.contains("let secret_number = secret_number.parse");
        assert!(has_shadowing, "Bạn chưa shadowing biến secret_number mới bằng parse!");

        let has_shadowing_mul = code.contains("let secret_number = secret_number * 2");
        assert!(has_shadowing_mul, "Bạn chưa shadowing biến secret_number nhân 2!");
    }
}
