import { Lesson } from '../../courses';

export const ch05_01_ex: Lesson = {
    id: 'ch05-01-ex',
    title: 'Bài tập 5.1: Định nghĩa và Khởi tạo Structs',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành định nghĩa và sử dụng Struct!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa một struct <code>User</code> với các fields: <code>username</code> (String), <code>email</code> (String), <code>age</code> (u32), <code>active</code> (bool)</li>
  <li>Tạo một instance của User với thông tin của bạn</li>
  <li>Truy cập và in ra các field</li>
  <li>Tạo một user mới bằng Struct Update Syntax từ user ban đầu</li>
</ol>
<h3 class="task-heading">Ví dụ Test Cases (LeetCode/HackerRank Style)</h3>
<div class="test-case">
  <h4>Test Case 1: Tạo và truy cập Struct</h4>
  <pre><code>Input: Tạo User với username="alice", email="alice@example.com", age=25, active=true
Expected Output:
Username: alice
Email: alice@example.com
Age: 25
Active: true</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: Struct Update</h4>
  <pre><code>Input: Tạo user2 từ user1 với email mới
Expected Output:
user2 email: newemail@example.com
(user2 giữ nguyên các field khác từ user1)</code></pre>
</div>
`,
    defaultCode: `// TODO: Định nghĩa struct User ở đây
// struct User {
//     username: String,
//     email: String,
//     age: u32,
//     active: bool,
// }

fn main() {
    // TODO: Tạo một instance User
    let user1 = User {
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        age: 25,
        active: true,
    };

    // TODO: Truy cập và in các field
    println!("Username: {}", user1.username);
    println!("Email: {}", user1.email);
    println!("Age: {}", user1.age);
    println!("Active: {}", user1.active);

    // TODO: Tạo user2 bằng Struct Update Syntax với email mới
    let user2 = User {
        email: String::from("new@example.com"),
        ..user1
    };

    println!("User2 email: {}", user2.email);
}
`,
    expectedOutput: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com',
    testCases: [
        {
            input: 'username="alice", email="alice@example.com", age=25, active=true',
            expectedOutput: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true',
            description: 'Tạo và truy cập struct User'
        }
    ]
};
