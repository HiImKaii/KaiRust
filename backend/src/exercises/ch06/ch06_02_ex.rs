#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_message_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra định nghĩa enum Message
        let has_message_enum = code.contains("enum Message");
        assert!(has_message_enum, "Bạn chưa định nghĩa enum Message!");

        // Kiểm tra các variant
        let has_quit = code.contains("Quit");
        let has_move = code.contains("Move");
        let has_write = code.contains("Write");
        let has_change_color = code.contains("ChangeColor");
        assert!(has_quit && has_move && has_write && has_change_color,
            "Message enum phải có đủ 4 variant: Quit, Move, Write, ChangeColor!");
    }

    #[test]
    fn test_move_with_struct_data() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra Move có dữ liệu kiểu struct
        let has_move_struct = code.contains("Move { x: i32, y: i32 }") ||
                              code.contains("Move{x:i32,y:i32}") ||
                              code.contains("Move { x, y }");
        assert!(has_move_struct, "Move phải có dữ liệu x, y!");
    }

    #[test]
    fn test_write_with_string() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra Write có dữ liệu String
        let has_write_string = code.contains("Write(String)");
        assert!(has_write_string, "Write phải có dữ liệu String!");
    }

    #[test]
    fn test_change_color_with_tuple() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra ChangeColor có dữ liệu tuple
        let has_change_color_tuple = code.contains("ChangeColor(i32, i32, i32)");
        assert!(has_change_color_tuple, "ChangeColor phải có 3 tham số i32!");
    }

    #[test]
    fn test_process_message_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra hàm process_message
        let has_process_message = code.contains("fn process_message");
        assert!(has_process_message, "Bạn chưa định nghĩa hàm process_message!");

        // Kiểm tra sử dụng match
        let has_match = code.contains("match msg");
        assert!(has_match, "process_message phải sử dụng match!");
    }

    #[test]
    fn test_match_extracts_data() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra trích xuất dữ liệu từ các variant
        let extracts_move = code.contains("{ x") || code.contains("x,");
        let extracts_write = code.contains("text") || code.contains("String");
        let extracts_color = code.contains("r,") || code.contains("r:");

        assert!(extracts_move || extracts_write || extracts_color,
            "Match phải trích xuất dữ liệu từ các variant!");
    }
}
