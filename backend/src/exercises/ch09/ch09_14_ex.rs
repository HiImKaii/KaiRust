// Exercise - ch09_14_ex: Error Handling với HashMap

use std::collections::HashMap;

#[derive(Debug)]
struct User {
    name: String,
    age: i32,
}

fn get_user_age(users: &HashMap<String, i32>, name: &str) -> Result<i32, String> {
    users
        .get(name)
        .copied()
        .ok_or_else(|| format!("User not found: {}", name))
}

fn create_user(name: String, age_str: &str) -> Result<User, String> {
    let age: i32 = age_str.parse().map_err(|_| "Invalid age")?;
    Ok(User { name, age })
}

fn main() {
    let mut users = HashMap::new();
    users.insert("Alice".to_string(), 25);
    users.insert("Bob".to_string(), 30);
    users.insert("Charlie".to_string(), 35);

    match get_user_age(&users, "Alice") {
        Ok(age) => println!("Alice {} tuổi", age),
        Err(e) => println!("Lỗi: {}", e),
    }

    match get_user_age(&users, "David") {
        Ok(age) => println!("David {} tuổi", age),
        Err(e) => println!("Lỗi: {}", e),
    }

    match create_user("David".to_string(), "28") {
        Ok(user) => println!("Created: {} - {} tuổi", user.name, user.age),
        Err(e) => println!("Lỗi: {}", e),
    }
}
