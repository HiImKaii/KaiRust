import { Lesson } from '../../courses';

export const ch09_14_ex: Lesson = {
    id: 'ch09-14-ex',
    title: 'Bài tập 9.14: Error Handling với HashMap',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành kết hợp HashMap với Error Handling!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function get_user_age(users: &HashMap&lt;String, i32&gt;, name: &str) -> Result&lt;i32, String&gt;</li>
  <li>Trả về tuổi nếu user tồn tại</li>
  <li>Trả về lỗi nếu user không tồn tại</li>
</ol>
`,
    defaultCode: `use std::collections::HashMap;

#[derive(Debug)]
struct User {
    name: String,
    age: i32,
}

fn get_user_age(users: &HashMap<String, i32>, name: &str) -> Result<i32, String> {
    // Tìm user và trả về tuổi
    // Nếu không tìm thấy, trả về lỗi
    unimplemented!()
}

fn create_user(name: String, age_str: &str) -> Result<User, String> {
    // Parse age từ string, tạo User
    unimplemented!()
}

fn main() {
    let mut users = HashMap::new();
    users.insert("Alice".to_string(), 25);
    users.insert("Bob".to_string(), 30);
    users.insert("Charlie".to_string(), 35);

    // Test tìm user tồn tại
    match get_user_age(&users, "Alice") {
        Ok(age) => println!("Alice {} tuổi", age),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test user không tồn tại
    match get_user_age(&users, "David") {
        Ok(age) => println!("David {} tuổi", age),
        Err(e) => println!("Lỗi: {}", e),
    }

    // Test tạo user
    match create_user("David".to_string(), "28") {
        Ok(user) => println!("Created: {} - {} tuổi", user.name, user.age),
        Err(e) => println!("Lỗi: {}", e),
    }
}
`,
    expectedOutput: 'Alice 25 tuổi\nLỗi: User not found: David\nCreated: David - 28 tuổi',
    testCases: [
        {
            input: 'get_user_age(&users, "Alice")',
            expectedOutput: '25',
            description: 'Alice 25 tuổi'
        }
    ]
};
