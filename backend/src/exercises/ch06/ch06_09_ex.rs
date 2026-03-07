#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_tree_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_tree = code.contains("enum Tree");
        assert!(has_tree, "Bạn chưa định nghĩa enum Tree!");

        let has_empty = code.contains("Empty");
        let has_node = code.contains("Node {");
        assert!(has_empty && has_node, "Tree phải có Empty và Node!");
    }

    #[test]
    fn test_insert_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_insert = code.contains("fn insert");
        assert!(has_insert, "Bạn chưa định nghĩa hàm insert!");
    }

    #[test]
    fn test_contains_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_contains = code.contains("fn contains");
        assert!(has_contains, "Bạn chưa định nghĩa hàm contains!");
    }

    #[test]
    fn test_sum_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_sum = code.contains("fn sum");
        assert!(has_sum, "Bạn chưa định nghĩa hàm sum!");
    }

    #[test]
    fn test_height_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_height = code.contains("fn height");
        assert!(has_height, "Bạn chưa định nghĩa hàm height!");
    }

    #[test]
    fn test_recursive_pattern_matching() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_match_tree = code.matches("match").count() >= 3;
        assert!(has_match_tree, "Nên sử dụng nhiều match để xử lý cây!");
    }
}
