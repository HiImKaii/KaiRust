#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_caesar_cipher_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let uses_as_bytes = code.contains(".as_bytes()");
        assert!(uses_as_bytes, "Bạn chưa dùng `as_bytes()` để chuyển chuỗi thành mảng byte!");

        let uses_as_char = code.contains("as char");
        assert!(uses_as_char, "Bạn chưa ép kiểu byte `as char` để in ra mã ASCII!");

        let has_modulo_26 = code.contains("% 26");
        assert!(has_modulo_26, "Cần lấy phép modulo 26 (% 26) để dịch vòng!");
    }
}
