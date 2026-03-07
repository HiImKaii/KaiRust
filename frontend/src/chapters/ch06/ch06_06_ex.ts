import { Lesson } from '../../courses';

export const ch06_06_ex: Lesson = {
    id: 'ch06-06-ex',
    title: 'Bài tập 6.6: Option<T> nâng cao',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành xử lý Option<T> trong các tình huống thực tế!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo hàm <code>safe_divide(a: f64, b: f64) -> Option&lt;f64&gt;</code> chia hai số, trả về None nếu b = 0</li>
  <li>Tạo hàm <code>find_user(id: u32) -> Option&lt;String&gt;</code> tìm user theo id (giả lập)</li>
  <li>Tạo hàm <code>chain_options(opt1: Option&lt;i32&gt;, opt2: Option&lt;i32&gt;) -> Option&lt;i32&gt;</code> cộng nếu cả hai đều có giá trị</li>
</ol>
`,
    defaultCode: `// Hàm chia an toàn - trả về None nếu chia cho 0

// Hàm tìm user theo id (giả lập database)

// Hàm cộng hai Option nếu đều có giá trị

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'safe_divide(10.0, 2.0)',
            expectedOutput: 'Some(5.0)',
            description: 'Chia an toàn thành công'
        },
        {
            input: 'safe_divide(10.0, 0.0)',
            expectedOutput: 'None',
            description: 'Chia cho 0 trả về None'
        }
    ]
};
