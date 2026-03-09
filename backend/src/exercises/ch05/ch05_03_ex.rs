// Chapter 5: Defining and Instantiating Structs
// Bài tập 3: Field init shorthand và struct update syntax

#![allow(dead_code)]

struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

// TODO: Viết hàm build_user với field init shorthand
// Khi parameter name = field name, có thể viết gọn
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}

fn main() {
    // Test field init shorthand
    let user1 = build_user(
        String::from("someone@example.com"),
        String::from("someusername123"),
    );

    println!("User1 email: {}", user1.email);

    // TODO: Tạo user2 từ user1 sử dụng struct update syntax
    // Chỉ thay đổi email, các field khác giữ nguyên từ user1
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };

    println!("User2 email: {}", user2.email);
    println!("User2 username: {}", user2.username);
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_field_init_shorthand() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra field init shorthand (không có : username, : email)
        // Phải có username, thay vì username: username
        assert!(code_normalized.contains("username,") || code_normalized.contains("username,"),
            "Phải sử dụng field init shorthand cho username!");
        assert!(code_normalized.contains("email,") || code_normalized.contains("email,"),
            "Phải sử dụng field init shorthand cho email!");
    }

    #[test]
    fn test_struct_update_syntax() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra struct update syntax
        assert!(code_normalized.contains("..user1"), "Phải sử dụng struct update syntax (..user1)!");
        assert!(code_normalized.contains("email:String::from(\"another@example.com\")"),
            "user2 phải có email mới!");
    }
}
