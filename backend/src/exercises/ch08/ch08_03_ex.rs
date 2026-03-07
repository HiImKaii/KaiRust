#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_string_reverse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_reverse = code.contains(".rev()");
        assert!(has_reverse, "Phải đảo ngược chuỗi!");
    }

    #[test]
    fn test_split() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_split = code.contains("split(") || code.contains("split_whitespace");
        assert!(has_split, "Phải tách từ!");
    }

    #[test]
    fn test_replace() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_replace = code.contains("replace(");
        assert!(has_replace, "Phải thay thế!");
    }
}
