import { Lesson } from '../../courses';

export const ch06_07_ex: Lesson = {
    id: 'ch06-07-ex',
    title: 'Bài tập 6.7: Result<T, E> - Xử lý lỗi',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Result&lt;T, E&gt; là enum dùng để xử lý lỗi trong Rust. Hãy thực hành sử dụng nó!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo hàm <code>parse_age(s: &str) -> Result&lt;i32, &str&gt;</code> chuyển string thành tuổi, lỗi nếu không hợp lệ</li>
  <li>Tạo hàm <code>divide(a: i32, b: i32) -> Result&lt;i32, String&gt;</code> chia hai số với thông báo lỗi</li>
  <li>Sử dụng <code>?</code> operator để propagate lỗi</li>
</ol>
`,
    defaultCode: `// Hàm parse string thành tuổi

// Hàm chia hai số với thông báo lỗi

// Hàm sử dụng ? operator để chain các operation

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'parse_age("25")',
            expectedOutput: 'Ok(25)',
            description: 'Parse tuổi hợp lệ'
        },
        {
            input: 'parse_age("abc")',
            expectedOutput: 'Err',
            description: 'Parse thất bại'
        }
    ]
};
