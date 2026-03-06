#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_is_even_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_modulo = code.contains("% 2 == 0") || code.contains("n % 2");
        assert!(has_modulo, "Hãy dùng phép modulo % 2 để kiểm tra số dư chẵn/lẻ!");
    }
}
