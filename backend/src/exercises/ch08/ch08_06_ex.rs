#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_struct_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_todo_item = code.contains("struct TodoItem");
        let has_todo_list = code.contains("struct TodoList");
        assert!(has_todo_item && has_todo_list, "Phải định nghĩa TodoItem và TodoList!");
    }

    #[test]
    fn test_impl_methods() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_add = code.contains("fn add(");
        let has_complete = code.contains("fn complete(");
        let has_remove = code.contains("fn remove(");
        assert!(has_add && has_complete && has_remove, "Phải có các methods!");
    }

    #[test]
    fn test_vec_usage() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_vec = code.contains("Vec::new()") || code.contains("vec!");
        assert!(has_vec, "Phải sử dụng Vec!");
    }
}
