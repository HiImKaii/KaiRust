#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_library_structure() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_math = code.contains("mod math");
        let has_string = code.contains("mod string");
        assert!(has_math && has_string, "Phải có mod math và mod string!");
    }

    #[test]
    fn test_nested_modules() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_basic = code.contains("mod basic");
        let has_advanced = code.contains("mod advanced");
        assert!(has_basic && has_advanced, "Phải có nested modules!");
    }

    #[test]
    fn test_pub_functions() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_pub_fn = code.contains("pub fn");
        assert!(has_pub_fn, "Functions phải là pub!");
    }
}
