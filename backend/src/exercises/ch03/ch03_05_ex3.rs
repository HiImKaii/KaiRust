#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_loop_return_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let compressed: String = code.chars().filter(|c| !c.is_whitespace()).collect();
        
        let has_loop_assign = compressed.contains("letresult=loop{");
        let has_loop_assign_alt = compressed.contains("letmutresult=loop{");
        assert!(has_loop_assign || has_loop_assign_alt, "Bạn chưa dùng `let result = loop {{` để gán giá trị trả về!");

        let has_break_return = compressed.contains("breakcounter*2;") || compressed.contains("break(counter*2);");
        assert!(has_break_return, "Bạn chưa trả về kết quả bằng lệnh `break counter * 2;`");
    }
}
