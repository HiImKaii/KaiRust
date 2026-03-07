#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_struct_with_private_field() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_account = code.contains("struct Account");
        let has_balance = code.contains("balance:");
        assert!(has_account && has_balance, "Phải có struct Account với field balance!");
    }

    #[test]
    fn test_pub_methods() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_deposit = code.contains("pub fn deposit");
        let has_balance = code.contains("pub fn balance");
        assert!(has_deposit && has_balance, "Methods phải là pub!");
    }

    #[test]
    fn test_module_bank() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_bank = code.contains("mod bank");
        assert!(has_bank, "Phải có mod bank!");
    }
}
