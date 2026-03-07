#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shape_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_shape = code.contains("enum Shape");
        assert!(has_shape, "Bạn chưa định nghĩa enum Shape!");

        let has_circle = code.contains("Circle(");
        let has_rectangle = code.contains("Rectangle {");
        let has_triangle = code.contains("Triangle {");
        assert!(has_circle && has_rectangle && has_triangle,
            "Shape phải có Circle, Rectangle, Triangle!");
    }

    #[test]
    fn test_area_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_area = code.contains("fn area");
        assert!(has_area, "Bạn chưa định nghĩa hàm area!");

        let has_match = code.contains("match shape");
        assert!(has_match, "Phải sử dụng match!");
    }

    #[test]
    fn test_describe_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_describe = code.contains("fn describe");
        assert!(has_describe, "Bạn chưa định nghĩa hàm describe!");
    }
}
