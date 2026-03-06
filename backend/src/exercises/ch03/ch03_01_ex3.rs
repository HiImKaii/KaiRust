#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_constants_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        // Remove whitespace for easier checking
        let compressed: String = code.chars().filter(|c| !c.is_whitespace()).collect();
        
        let has_const = compressed.contains("constSPEED_OF_LIGHT:u32=299792458");
        assert!(has_const, "Bạn chưa khai báo đúng hằng số SPEED_OF_LIGHT: u32 = 299792458!");
    }
}
