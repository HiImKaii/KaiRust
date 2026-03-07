#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_linked_list_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_list = code.contains("enum LinkedList");
        assert!(has_list, "Bạn chưa định nghĩa enum LinkedList!");

        let has_nil = code.contains("Nil");
        let has_cons = code.contains("Cons(");
        assert!(has_nil && has_cons, "LinkedList phải có Nil và Cons!");
    }

    #[test]
    fn test_impl_block() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_impl = code.contains("impl LinkedList");
        assert!(has_impl, "Phải có impl block cho LinkedList!");
    }

    #[test]
    fn test_push_methods() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_push_front = code.contains("fn push_front");
        let has_push_back = code.contains("fn push_back");
        assert!(has_push_front && has_push_back,
            "Phải có push_front và push_back!");
    }

    #[test]
    fn test_pop_front() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_pop = code.contains("fn pop_front");
        assert!(has_pop, "Phải có pop_front!");
    }

    #[test]
    fn test_len_and_search() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_len = code.contains("fn len");
        let has_search = code.contains("fn search");
        assert!(has_len && has_search, "Phải có len và search!");
    }

    #[test]
    fn test_to_vec() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_to_vec = code.contains("fn to_vec");
        assert!(has_to_vec, "Phải có to_vec!");
    }

    #[test]
    fn test_pattern_matching_in_methods() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let match_count = code.matches("match self").count() +
                          code.matches("match ").count();
        assert!(match_count >= 5, "Phải sử dụng nhiều match trong methods!");
    }
}
