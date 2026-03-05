#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_match_ordering() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "").replace("\n", "");
        
        assert!(code_clean.contains("Ordering::Less=>println!(\"Toosmall!\")"), "Thiếu trường hợp Less");
        assert!(code_clean.contains("Ordering::Greater=>println!(\"Toobig!\")"), "Thiếu trường hợp Greater");
        assert!(code_clean.contains("Ordering::Equal=>println!(\"Youwin!\")"), "Thiếu trường hợp Equal");
    }
}
