#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_extract_and_double_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra hàm extract_and_double
        let has_extract_and_double = code.contains("fn extract_and_double");
        assert!(has_extract_and_double, "Bạn chưa định nghĩa hàm extract_and_double!");

        // Kiểm tra tham số là Option<i32>
        let has_option_param = code.contains("Option<i32>") || code.contains("Option < i32 >");
        assert!(has_option_param, "Hàm phải nhận Option<i32>!");

        // Kiểm tra trả về Option<i32>
        let returns_option = code.contains("-> Option<i32>") || code.contains("-> Option < i32 >");
        assert!(returns_option, "Hàm phải trả về Option<i32>!");
    }

    #[test]
    fn test_if_let_syntax() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra sử dụng if let
        let has_if_let = code.contains("if let");
        assert!(has_if_let, "Bạn phải sử dụng if let để xử lý Option!");

        // Kiểm tra pattern Some
        let has_some_pattern = code.contains("Some(");
        assert!(has_some_pattern, "if let phải khớp với Some!");
    }

    #[test]
    fn test_describe_age_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra hàm describe_age
        let has_describe_age = code.contains("fn describe_age");
        assert!(has_describe_age, "Bạn chưa định nghĩa hàm describe_age!");

        // Kiểm tra tham số Option<u8>
        let has_option_u8 = code.contains("Option<u8>") || code.contains("Option < u8 >");
        assert!(has_option_u8, "Hàm phải nhận Option<u8>!");
    }

    #[test]
    fn test_if_let_else() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra sử dụng else block
        let has_else = code.contains("else {") || code.contains("else{");
        assert!(has_else, "if let nên có else để xử lý trường hợp None!");
    }

    #[test]
    fn test_multiplication_logic() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra có phép nhân
        let has_multiplication = code.contains("* 2") || code.contains("*2");
        assert!(has_multiplication, "Hàm phải nhân đôi giá trị!");
    }

    #[test]
    fn test_find_first_zero_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra hàm find_first_zero
        let has_find_first_zero = code.contains("fn find_first_zero");
        assert!(has_find_first_zero, "Bạn chưa định nghĩa hàm find_first_zero!");

        // Kiểm tra tham số là slice
        let has_slice = code.contains("&[i32]") || code.contains("& [ i32 ]");
        assert!(has_slice, "Hàm phải nhận &[i32]!");

        // Kiểm tra trả về Option<usize>
        let returns_usize = code.contains("Option<usize>") || code.contains("Option < usize >");
        assert!(returns_usize, "Hàm phải trả về Option<usize>!");
    }
}
