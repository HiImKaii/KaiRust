#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_hashmap() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_hashmap = code.contains("HashMap::new()");
        assert!(has_hashmap, "Phải sử dụng HashMap!");
    }

    #[test]
    fn test_insert() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_insert = code.contains("insert(");
        assert!(has_insert, "Phải insert dữ liệu!");
    }

    #[test]
    fn test_entry() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_entry = code.contains("entry(");
        assert!(has_entry, "Nên sử dụng entry()!");
    }
}
