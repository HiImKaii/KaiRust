#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_filter() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_filter = code.contains("filter(");
        assert!(has_filter, "Phải lọc phần tử!");
    }

    #[test]
    fn test_reverse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_reverse = code.contains("reverse()");
        assert!(has_reverse, "Phải đảo ngược!");
    }

    #[test]
    fn test_position() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_position = code.contains("position(");
        assert!(has_position, "Phải tìm index!");
    }
}
