#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_calculator_struct() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_calculator = code.contains("struct Calculator");
        assert!(has_calculator, "Phải có struct Calculator!");
    }

    #[test]
    fn test_impl_block() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_impl = code.contains("impl Calculator");
        assert!(has_impl, "Phải có impl block cho Calculator!");
    }

    #[test]
    fn test_pub_use() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_pub_use = code.contains("pub use");
        assert!(has_pub_use, "Nên có pub use để re-export!");
    }

    #[test]
    fn test_result_type() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_result = code.contains("Result<");
        assert!(has_result, "Nên sử dụng Result để xử lý lỗi!");
    }
}
