#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_prime_factors_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_is_prime = code.contains("fn is_prime(");
        assert!(has_is_prime, "Bạn chưa định nghĩa hàm is_prime");

        let has_print_factors = code.contains("fn print_prime_factors(");
        assert!(has_print_factors, "Bạn chưa định nghĩa hàm print_prime_factors");

        let uses_print = code.contains("print!");
        assert!(uses_print, "Bạn chưa dùng lệnh `print!` để in thừa số trên cùng 1 hàng!");

        let uses_modulo = code.contains("%");
        assert!(uses_modulo, "Bạn chưa dùng phép chia lấy dư (%) trong thuật toán!");
    }
}
