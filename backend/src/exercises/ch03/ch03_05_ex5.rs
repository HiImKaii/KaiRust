#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_calculator_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_signature = code.contains("fn calculate(a: f64, b: f64, op: char) -> (bool, f64)") || 
                            code.contains("fn calculate(a:f64, b:f64, op:char)->(bool,f64)");
        assert!(has_signature, "Bạn chưa định nghĩa hàm `fn calculate(a: f64, b: f64, op: char) -> (bool, f64)`");

        let has_div_zero_check = code.contains("b == 0.0") || code.contains("0.0 == b");
        assert!(has_div_zero_check, "Bạn chưa xử lý lỗi chia cho 0 (`b == 0.0`)");

        let has_if_else = code.contains("if") && code.contains("else");
        assert!(has_if_else, "Bạn chưa dùng if-else để duyệt các loại phép tính!");
    }
}
