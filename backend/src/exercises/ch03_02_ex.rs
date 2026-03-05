#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_types_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code = code.replace(" ", ""); // Xóa khoảng trắng để dễ so sánh
        
        let has_tuple = code.contains("my_tuple=(500,6.4,'Z');") || code.contains("my_tuple:(i32,f64,char)=(500,6.4,'Z');");
        assert!(has_tuple, "Tuple my_tuple chưa chính xác!");

        let has_destructure = code.contains("let(x,y,z)=my_tuple;");
        assert!(has_destructure, "Bạn chưa giải nén tuple thành (x, y, z)!");

        let has_array = code.contains("my_array=[1,2,3,4,5];") || code.contains("my_array:[i32;5]=[1,2,3,4,5];");
        assert!(has_array, "Array my_array chưa chính xác!");
    }
}
