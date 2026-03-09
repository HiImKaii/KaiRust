import { Lesson } from '../../courses';

export const ch04_01_ex3: Lesson = {
    id: 'ch04-01-ex3',
    title: 'Bài tập 4.1.3: Trả lại Ownership',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Trả lại Ownership',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Trong Rust, khi truyền biến vào hàm, quyền sở hữu (ownership) sẽ được chuyển sang hàm đó. Nếu muốn sử dụng biến đó sau khi gọi hàm, ta cần hàm trả về ownership.

Cho đoạn code:
<pre><code>fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_returns(s1);
    println!("{}", s2);  // Cần s2 vì s1 đã bị move vào hàm
}

fn takes_and_returns(a_string: String) -> String {
    // TODO: Trả về a_string để giữ ownership
}</code></pre>

Hãy viết hàm takes_and_returns để trả về ownership của chuỗi.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng: hello',

    // Các ràng buộc
    constraints: [
        { field: 'Yêu cầu', condition: 'Hàm phải trả về kiểu String' },
        { field: 'Kết quả', condition: 'Giá trị trả về phải là tham số đầu vào' }
    ],

    // Ví dụ
    examples: [
        {
            input: '',
            output: 'hello',
            explanation: 'Hàm trả về ownership, s2 nhận giá trị từ hàm'
        }
    ],

    // Nội dung lý thuyết
    content: `
<h3>Tìm hiểu về Ownership trong Rust</h3>

<p>Mỗi giá trị trong Rust có một biến sở hữu (owner). Khi owner đi ra khỏi phạm vi, giá trị sẽ bị drop.</p>

<h4>Quy tắc Ownership:</h4>
<ul>
    <li>Mỗi giá trị có một biến sở hữu (owner)</li>
    <li>Chỉ có một owner tại một thời điểm</li>
    <li>Khi owner ra khỏi phạm vi, giá trị bị xóa</li>
</ul>

<h4>Trả về Ownership:</h4>
<pre><code>fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_returns(s1);
    // s1 đã bị move, chỉ dùng được s2
    println!("{}", s2);
}

fn takes_and_returns(s: String) -> String {
    // Trả về s, ownership chuyển về caller
    s
}</code></pre>
`,

    // Code mẫu
    defaultCode: `fn main() {
    let s1 = String::from("hello");
    let s2 = takes_and_returns(s1);

    // TODO: In giá trị của s2
    // println!("{}", s2);
}

// TODO: Viết hàm takes_and_returns nhận vào String và trả về String
fn takes_and_returns(a_string: String) -> String {
    // TODO: Trả về a_string để giữ ownership
}
`,

    // Test case
    testCases: [
        {
            input: '',
            expectedOutput: 'hello',
            description: 'Kiểm tra hàm trả về ownership'
        }
    ]
};
