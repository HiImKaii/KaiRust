#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_guess_variable() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_mut_guess = code_clean.contains("letmutguess=String::new();") || code_clean.contains("letmutguess:String=String::new();");
        assert!(has_mut_guess, "Bạn cần khai báo 'let mut guess = String::new();'");
    }
}
