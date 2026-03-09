// Chapter 5: Defining and Instantiating Structs
// Bài tập 1: Định nghĩa và khởi tạo Struct

// TODO: Định nghĩa một struct User với các fields:
// - active: bool
// - username: String
// - email: String
// - sign_in_count: u64

// TODO: Trong hàm main, tạo một instance của User với:
// - active: true
// - username: "someusername123"
// - email: "someone@example.com"
// - sign_in_count: 1

// TODO: In ra email của user1 bằng dot notation

fn main() {
    // Định nghĩa struct User
    struct User {
        active: bool,
        username: String,
        email: String,
        sign_in_count: u64,
    }

    // Tạo instance của User
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    // In ra email bằng dot notation
    println!("Email: {}", user1.email);
}

#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_struct_definition() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra định nghĩa struct User với các fields
        assert!(code_normalized.contains("structUser{"), "Chưa định nghĩa struct User!");
        assert!(code_normalized.contains("active:bool"), "Thiếu field active: bool!");
        assert!(code_normalized.contains("username:String"), "Thiếu field username: String!");
        assert!(code_normalized.contains("email:String"), "Thiếu field email: String!");
        assert!(code_normalized.contains("sign_in_count:u64"), "Thiếu field sign_in_count: u64!");
    }

    #[test]
    fn test_struct_instantiation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra tạo instance user1
        assert!(code_normalized.contains("letuser1=User{"), "Chưa tạo instance user1!");
        assert!(code_normalized.contains("active:true"), "Field active phải là true!");
        assert!(code_normalized.contains("username:String::from"), "Username phải là String::from!");
        assert!(code_normalized.contains("email:String::from"), "Email phải là String::from!");
        assert!(code_normalized.contains("sign_in_count:1"), "sign_in_count phải là 1!");
    }

    #[test]
    fn test_dot_notation() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let user_code = code.split("#[cfg(test)]").next().unwrap_or(&code);
        let code_normalized: String = user_code.chars().filter(|c| !c.is_whitespace()).collect();

        // Kiểm tra sử dụng dot notation để truy cập email
        assert!(code_normalized.contains("user1.email"), "Chưa sử dụng dot notation để truy cập email!");
    }
}
