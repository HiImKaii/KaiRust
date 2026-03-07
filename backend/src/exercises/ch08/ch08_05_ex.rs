#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_iterator_chain() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_filter = code.contains("filter(");
        let has_map = code.contains("map(");
        assert!(has_filter && has_map, "Phải chain filter và map!");
    }

    #[test]
    fn test_collect() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_collect = code.contains("collect()");
        assert!(has_collect, "Phải sử dụng collect!");
    }

    #[test]
    fn test_enumerate() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_enumerate = code.contains("enumerate()");
        assert!(has_enumerate, "Phải sử dụng enumerate!");
    }
}
