#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_safe_divide() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_safe_divide = code.contains("fn safe_divide");
        assert!(has_safe_divide, "Bạn chưa định nghĩa hàm safe_divide!");

        let returns_option = code.contains("-> Option<f64>");
        assert!(returns_option, "Hàm phải trả về Option<f64>!");
    }

    #[test]
    fn test_find_user() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_find_user = code.contains("fn find_user");
        assert!(has_find_user, "Bạn chưa định nghĩa hàm find_user!");
    }

    #[test]
    fn test_get_config() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_get_config = code.contains("fn get_config");
        assert!(has_get_config, "Bạn chưa định nghĩa hàm get_config!");
    }

    #[test]
    fn test_chain_options() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_chain = code.contains("fn chain_options");
        assert!(has_chain, "Bạn chưa định nghĩa hàm chain_options!");

        let uses_match = code.contains("match (opt1, opt2)");
        assert!(uses_match, "Phải sử dụng match!");
    }
}
