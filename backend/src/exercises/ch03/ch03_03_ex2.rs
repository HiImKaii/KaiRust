#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_tuple_return_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_function = code.contains("fn calculate_length(");
        assert!(has_function, "Bạn chưa định nghĩa hàm calculate_length!");

        let uses_tuple_return = code.contains("-> (String, usize)") || code.contains("->(String, usize)");
        assert!(uses_tuple_return, "Hàm chưa trả về tuple kiểu (String, usize) đúng định dạng!");
        
        let uses_len = code.contains(".len()");
        assert!(uses_len, "Bạn chưa sử dụng phương thức .len() của chuỗi!");
    }
}
