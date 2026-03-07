#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_vector_creation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_vec = code.contains("vec![") || code.contains("Vec::new()");
        assert!(has_vec, "Phải tạo vector!");
    }

    #[test]
    fn test_vector_sum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_sum = code.contains("sum()");
        assert!(has_sum, "Phải tính tổng!");
    }

    #[test]
    fn test_push_pop() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_push = code.contains("push(");
        let has_pop = code.contains("pop(");
        assert!(has_push && has_pop, "Phải có push và pop!");
    }
}
