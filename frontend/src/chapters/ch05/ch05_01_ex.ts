import { Lesson } from '../../courses';

export const ch05_01_ex: Lesson = {
    id: 'ch05-01-ex',
    title: 'Bài tập 5.1: Định nghĩa Struct User',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tạo Struct User',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Cho trước thông tin của một người dùng. Hãy định nghĩa một Struct User trong Rust với các thông tin: username, email, age, và active. Sau đó tạo hai user: user1 với thông tin đầy đủ, và user2 được tạo từ user1 nhưng có email mới sử dụng Struct Update Syntax.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'In ra thông tin của user1 và user2 theo format: Username: {username}\\nEmail: {email}\\nAge: {age}\\nActive: {active}\\nUser2 email: {email}',
    constraints: [
        { field: 'username', condition: 'String, tên đăng nhập của user' },
        { field: 'email', condition: 'String, địa chỉ email' },
        { field: 'age', condition: 'u32, tuổi' },
        { field: 'active', condition: 'bool, trạng thái hoạt động' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com',
            explanation: 'user1 có email là alice@example.com, user2 được tạo từ user1 với email mới là new@example.com'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Định nghĩa và sử dụng Struct</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa một Struct với nhiều field có kiểu dữ liệu khác nhau</li>
    <li>Tạo instance từ Struct</li>
    <li>Sử dụng Struct Update Syntax để tạo instance mới từ instance có sẵn</li>
    <li>Truy cập các field của Struct</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Sử dụng từ khóa <code>struct</code> để định nghĩa Struct</li>
    <li>Đặt tên Struct theo convention: viết hoa chữ cái đầu</li>
    <li>Mỗi field có cú pháp: <code>tên_field: kiểu_dữ_liệu</code></li>
    <li>Để tạo instance mới từ instance cũ với một số thay đổi, sử dụng <code>..instance_cũ</code></li>
</ul>
`,
    defaultCode: `// Định nghĩa Struct User
// TODO: Khai báo struct User với các field:
// - username: String
// - email: String
// - age: u32
// - active: bool

fn main() {
    // Tạo user1 với thông tin:
    // username: "alice"
    // email: "alice@example.com"
    // age: 25
    // active: true
    // TODO: Tạo instance user1

    // In thông tin user1
    // TODO: Sử dụng println! để in username, email, age, active

    // Tạo user2 từ user1 với email mới là "new@example.com"
    // TODO: Sử dụng Struct Update Syntax: User { email: String::from("new@example.com"), ..user1 }

    // In email của user2
    // TODO: println!("User2 email: {}", user2.email);
}
`,
    expectedOutput: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com',
    testCases: [
        {
            input: '',
            expectedOutput: 'Username: alice\nEmail: alice@example.com\nAge: 25\nActive: true\nUser2 email: new@example.com',
            description: 'Tạo và in thông tin User sử dụng Struct Update Syntax'
        }
    ]
};
