#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_module_declaration() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_greeting = code.contains("mod greeting");
        let has_math = code.contains("mod math");
        assert!(has_greeting && has_math, "Phải có mod greeting và mod math!");
    }

    #[test]
    fn test_nested_module() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_utils = code.contains("mod utils") || code.contains("pub mod utils");
        assert!(has_utils, "Phải có nested module utils!");
    }

    #[test]
    fn test_pub_functions() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_say_hello = code.contains("pub fn say_hello");
        let has_add = code.contains("pub fn add");
        assert!(has_say_hello && has_add, "Functions phải là pub!");
    }
}
