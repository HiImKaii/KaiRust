#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_use_keyword() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_use = code.contains("use ");
        assert!(has_use, "Phải sử dụng use!");
    }

    #[test]
    fn test_as_keyword() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_as = code.contains(" as ");
        assert!(has_as, "Phải sử dụng as!");
    }

    #[test]
    fn test_nested_module_structure() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_restaurant = code.contains("mod restaurant");
        assert!(has_restaurant, "Phải có module restaurant!");
    }
}
