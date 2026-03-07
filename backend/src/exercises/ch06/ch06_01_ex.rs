#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_enum_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra định nghĩa enum Day
        let has_day_enum = code.contains("enum Day");
        assert!(has_day_enum, "Bạn chưa định nghĩa enum Day!");

        // Kiểm tra các variant của Day
        let has_monday = code.contains("Monday");
        let has_saturday = code.contains("Saturday");
        let has_sunday = code.contains("Sunday");
        assert!(has_monday && has_saturday && has_sunday,
            "Day enum phải có Monday, Saturday, Sunday!");

        // Kiểm tra định nghĩa enum Status
        let has_status_enum = code.contains("enum Status");
        assert!(has_status_enum, "Bạn chưa định nghĩa enum Status!");

        // Kiểm tra Status có variant với dữ liệu
        let has_pending = code.contains("Pending(");
        assert!(has_pending, "Status phải có Pending(String) variant!");

        // Kiểm tra hàm is_weekend
        let has_is_weekend = code.contains("fn is_weekend");
        assert!(has_is_weekend, "Bạn chưa định nghĩa hàm is_weekend!");

        // Kiểm tra sử dụng match
        let has_match = code.contains("match day");
        assert!(has_match, "Hàm is_weekend phải sử dụng match!");
    }

    #[test]
    fn test_is_weekend_logic() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra Saturday và Sunday trả về true
        let has_saturday_true = code.contains("Day::Saturday") && code.contains("true");
        let has_sunday_true = code.contains("Day::Sunday") && code.contains("true");
        assert!(has_saturday_true && has_sunday_true,
            "is_weekend phải trả về true cho Saturday và Sunday!");
    }
}
