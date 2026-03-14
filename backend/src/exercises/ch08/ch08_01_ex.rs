#[cfg(test)]
mod tests {
    use std::fs;
    use std::process::Command;

    #[test]
    fn test_vector_creation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra tạo vector với các số từ 1 đến 5
        let has_vec_macro = code.contains("vec![");
        let has_vec_new = code.contains("Vec::new()");

        assert!(has_vec_macro || has_vec_new, "Phải tạo vector!");

        // Kiểm tra có các số từ 1 đến 5
        let has_numbers = code.contains("1") && code.contains("2") &&
                         code.contains("3") && code.contains("4") &&
                         code.contains("5");
        assert!(has_numbers, "Vector phải chứa các số từ 1 đến 5");
    }

    #[test]
    fn test_vector_sum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_sum = code.contains("sum()");
        assert!(has_sum, "Phải tính tổng các phần tử!");
    }

    #[test]
    fn test_vector_max() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra tìm giá trị lớn nhất
        let has_max = code.contains("max(") || code.contains("iter().max(") ||
                      code.contains("sort") || code.contains("first()");
        assert!(has_max, "Phải tìm giá trị lớn nhất!");
    }

    #[test]
    fn test_push_pop() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_push = code.contains("push(");
        let has_pop = code.contains("pop(");
        assert!(has_push && has_pop, "Phải có push và pop!");
    }

    #[test]
    fn test_compile_success() {
        // Kiểm tra code có biên dịch thành công không
        let result = Command::new("rustc")
            .args(["--edition", "2021", "main.rs", "-o", "test_binary"])
            .output();

        match result {
            Ok(output) => {
                assert!(output.status.success(), "Code phải biên dịch thành công!");

                // Dọn dẹp file binary nếu có
                let _ = std::fs::remove_file("test_binary");
            }
            Err(_) => {
                // Thử với cargo nếu rustc không hoạt động
                let cargo_result = Command::new("cargo")
                    .args(["build", "--quiet"])
                    .output();

                assert!(cargo_result.map_or(false, |o| o.status.success()),
                    "Code phải biên dịch thành công với cargo!");
            }
        }
    }

    #[test]
    fn test_vector_operations_complete() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra đầy đủ các operations
        let operations = [
            ("vec![] hoặc Vec::new()", code.contains("vec![") || code.contains("Vec::new()")),
            ("tính tổng (sum)", code.contains("sum()")),
            ("tìm max (max)", code.contains("max(") || code.contains("iter().max(")),
            ("thêm phần tử (push)", code.contains("push(")),
            ("xóa phần tử (pop)", code.contains("pop(")),
        ];

        let mut failed: Vec<&str> = Vec::new();

        for (name, check) in operations.iter() {
            if !*check {
                failed.push(name);
            }
        }

        assert!(failed.is_empty(),
            "Thiếu các operations: {:?}", failed);
    }

    #[test]
    fn test_semicolon_usage() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        // Kiểm tra có dấu chấm phẩy (thể hiện việc hoàn thành statements)
        let has_semicolons = code.matches(';').count() >= 3;
        assert!(has_semicolons, "Code nên có ít nhất 3 dấu chấm phẩy!");
    }
}
