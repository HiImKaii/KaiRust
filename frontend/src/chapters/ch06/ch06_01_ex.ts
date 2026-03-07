import { Lesson } from '../../courses';

export const ch06_01_ex: Lesson = {
    id: 'ch06-01-ex',
    title: 'Bài tập 6.1: Định nghĩa Enum',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành định nghĩa và sử dụng Enum!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>Day</code> với các variant: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday</li>
  <li>Định nghĩa enum <code>Status</code> với các variant: Active, Inactive, Pending(String)</li>
  <li>Tạo hàm <code>is_weekend(day: &Day) -> bool</code> kiểm tra cuối tuần (Saturday, Sunday)</li>
</ol>
<h3 class="task-heading">Gợi ý</h3>
<ul>
  <li>Dùng <code>match</code> để kiểm tra ngày</li>
  <li>Thứ 7 và Chủ nhật là cuối tuần</li>
</ul>
<h3 class="task-heading">Ví dụ Test Cases</h3>
<div class="test-case">
  <h4>Test Case 1: Thứ 7</h4>
  <pre><code>Input: is_weekend(&Day::Saturday)
Expected Output: true</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: Thứ 2</h4>
  <pre><code>Input: is_weekend(&Day::Monday)
Expected Output: false</code></pre>
</div>
`,
    defaultCode: `// Định nghĩa enum Day

// Định nghĩa enum Status với dữ liệu

// Hàm kiểm tra cuối tuần

fn main() {
    // Test
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Day::Saturday',
            expectedOutput: 'true',
            description: 'Thứ 7 là cuối tuần'
        },
        {
            input: 'Day::Monday',
            expectedOutput: 'false',
            description: 'Thứ 2 không phải cuối tuần'
        }
    ]
};
