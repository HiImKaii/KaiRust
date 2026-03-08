import { Lesson } from '../../courses';

export const ch05_01_ex: Lesson = {
    id: 'ch05-01-ex',
    title: 'Bài tập 5.1: Định nghĩa và Khởi tạo Structs',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Struct - User',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa struct User và sử dụng Struct Update Syntax.',
    inputFormat: 'Không có input',
    outputFormat: 'In thông tin user',
    constraints: [
        { field: 'User', condition: 'username, email (String), age (u32), active (bool)' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com'
        }
    ],

    content: `
<p>Hãy thực hành định nghĩa và sử dụng Struct!</p>
`,
    defaultCode: `struct User {
    username: String,
    email: String,
    age: u32,
    active: bool,
}

fn main() {
    let user1 = User {
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        age: 25,
        active: true,
    };

    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
    println!("Age: {}", user1.age);
    println!("Active: {}", user1.active);

    let user2 = User {
        email: String::from("new@example.com"),
        ..user1
    };

    println!("User2 email: {}", user2.email);
}
`,
    expectedOutput: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com'
};
