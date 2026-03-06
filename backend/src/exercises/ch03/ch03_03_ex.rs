#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_calculate_volume_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_function = code.contains("fn calculate_volume");
        assert!(has_function, "Bạn chưa định nghĩa hàm calculate_volume!");

        let has_params = code.contains("length") && code.contains("width") && code.contains("height");
        assert!(has_params, "Tham số của hàm chưa đúng yêu cầu!");
        
        let has_multiplication = code.contains("*");
        assert!(has_multiplication, "Hàm tính toán cần dùng phép nhân *");
    }
}
