#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_arithmetic_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_division = code.contains("43 / 5");
        assert!(has_division, "Bạn chưa thực hiện phép chia 43 / 5");

        let has_modulo = code.contains("43 % 5");
        assert!(has_modulo, "Bạn chưa thực hiện phép chia lấy dư 43 % 5");
    }
}
