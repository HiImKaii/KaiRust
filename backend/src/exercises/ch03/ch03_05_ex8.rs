#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_game_of_life_exercise() {
        let code = fs::read_to_string("main.rs").unwrap_or_default();
        
        let uses_next_cells = code.contains("next_cells");
        assert!(uses_next_cells, "Bạn chưa sử dụng mảng phụ `next_cells` để lưu trạng thái mới!");

        let updates_cells = code.contains("cells = next_cells");
        assert!(updates_cells, "Cuối thế hệ, bạn phải cập nhật `cells = next_cells;`");

        let has_gen_loop = code.contains("gen_count +=");
        assert!(has_gen_loop, "Vòng lặp chưa tăng bộ đếm `gen_count`!");
    }
}
