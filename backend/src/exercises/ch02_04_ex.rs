#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shadowing_parse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_shadowing = code_clean.contains("letguess:u32=guess.trim().parse().expect(");
        assert!(has_shadowing, "Bạn chưa thực hiện shadowing đúng cách: 'let guess: u32 = guess.trim().parse().expect(...);'");
    }
}
