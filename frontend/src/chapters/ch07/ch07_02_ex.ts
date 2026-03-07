import { Lesson } from '../../courses';

export const ch07_02_ex: Lesson = {
    id: 'ch07-02-ex',
    title: 'Bài tập 7.2: pub và Visibility',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng pub để kiểm soát visibility!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo module <code>bank</code> với:
    <ul>
      <li>Struct <code>Account</code> với field <code>balance</code> (private)</li>
      <li>Hàm <code>create_account(initial: i32) -> Account</code> (public)</li>
      <li>Method <code>deposit(&amp;mut self, amount: i32)</code> (public)</li>
      <li>Method <code>balance(&self) -> i32</code> (public)</li>
    </ul>
  </li>
  <li>Balance phải là private - không truy cập trực tiếp từ bên ngoài</li>
</ol>
`,
    defaultCode: `// Tạo module bank với struct Account

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'bank::create_account(1000)',
            expectedOutput: '1000',
            description: 'Tạo tài khoản với số dư ban đầu'
        }
    ]
};
