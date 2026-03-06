#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_array_indexing_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let has_first = code.contains("months[0]");
        assert!(has_first, "Bạn chưa truy cập phần tử đầu tiên bằng tháng 1: months[0]");

        let has_last = code.contains("months[11]");
        assert!(has_last, "Bạn chưa truy cập phần tử cuối cùng là tháng 12: months[11]");
    }
}
