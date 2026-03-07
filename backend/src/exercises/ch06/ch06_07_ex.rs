#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_parse_age() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_parse_age = code.contains("fn parse_age");
        assert!(has_parse_age, "Bạn chưa định nghĩa hàm parse_age!");

        let returns_result = code.contains("-> Result<i32");
        assert!(returns_result, "Hàm phải trả về Result!");
    }

    #[test]
    fn test_divide() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_divide = code.contains("fn divide");
        assert!(has_divide, "Bạn chưa định nghĩa hàm divide!");
    }

    #[test]
    fn test_get_element_index() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_index = code.contains("fn get_element_index");
        assert!(has_index, "Bạn chưa định nghĩa hàm get_element_index!");
    }

    #[test]
    fn test_question_operator() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_question = code.contains("?");
        assert!(has_question, "Nên sử dụng ? operator để propagate lỗi!");
    }
}
