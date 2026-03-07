#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_payment_method_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_payment = code.contains("enum PaymentMethod");
        assert!(has_payment, "Bạn chưa định nghĩa enum PaymentMethod!");

        let has_cash = code.contains("Cash");
        let has_credit = code.contains("CreditCard");
        let has_debit = code.contains("DebitCard");
        let has_wallet = code.contains("Wallet");
        assert!(has_cash && has_credit && has_debit && has_wallet,
            "PaymentMethod phải có Cash, CreditCard, DebitCard, Wallet!");
    }

    #[test]
    fn test_payment_status_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_status = code.contains("enum PaymentStatus");
        assert!(has_status, "Bạn chưa định nghĩa enum PaymentStatus!");
    }

    #[test]
    fn test_process_payment() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_process = code.contains("fn process_payment");
        assert!(has_process, "Bạn chưa định nghĩa hàm process_payment!");
    }

    #[test]
    fn test_calculate_fee() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_fee = code.contains("fn calculate_fee");
        assert!(has_fee, "Bạn chưa định nghĩa hàm calculate_fee!");
    }
}
