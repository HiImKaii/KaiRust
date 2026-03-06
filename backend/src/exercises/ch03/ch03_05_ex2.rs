#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_if_let_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        // Remove whitespace for easier checking
        let compressed: String = code.chars().filter(|c| !c.is_whitespace()).collect();
        
        let uses_if_let = compressed.contains("letnumber=ifcondition{5}else{6};");
        let uses_if_let_alt = compressed.contains("letmutnumber=ifcondition{5}else{6};");
        assert!(uses_if_let || uses_if_let_alt, "Bạn chưa gán biến number bằng cấu trúc `let number = if condition {{ 5 }} else {{ 6 }};`");
    }
}
