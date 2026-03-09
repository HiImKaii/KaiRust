// Chapter 5: Defining and Instantiating Structs
// Bài tập 2: Mutable Struct

#![allow(dead_code)]

// TODO: Tạo một mutable struct User và thay đổi email

// Định nghĩa struct User
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    // TODO: Tạo một mutable instance user1
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    // TODO: Thay đổi email thành "anotheremail@example.com"
    user1.email = String::from("anotheremail@example.com");

    println!("Updated email: {}", user1.email);
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_mutable_struct() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra mutable instance
        assert!(code_normalized.contains("letmutuser1=User{"), "user1 phải là mutable (let mut)!");
    }

    #[test]
    fn test_update_email() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra thay đổi email
        assert!(code_normalized.contains("user1.email=String::from"), "Phải thay đổi email bằng dot notation!");
        assert!(code_normalized.contains("anotheremail@example.com"), "Email phải là anotheremail@example.com!");
    }
}
