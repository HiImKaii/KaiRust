import { Lesson } from '../../courses';

export const ch02_01_ex: Lesson = {
      id: 'ch02-01-ex',
      title: 'Bài tập 2.1: Khởi tạo biến String',
      duration: '5 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy khởi tạo một biến có thể thay đổi để chứa dữ liệu nhập vào!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến <strong>khả biến (mutable)</strong> tên là <code>guess</code>.</li>
  <li>Gán cho nó một đối tượng <code>String</code> mới và rỗng bằng cách gọi <code>String::new()</code>.</li>
</ol>
<h3 class="task-heading">Ví dụ Test Cases</h3>
<div class="test-case">
  <h4>Test Case 1</h4>
  <p><strong>Mô tả:</strong> Kiểm tra biến guess có kiểu String và khả biến</p>
  <pre><code>// Code đúng
let mut guess = String::new();</code></pre>
</div>
`,
      defaultCode: `fn main() {
    // TODO: Tạo một biến \`guess\` khả biến (mutable) và gán cho nó một String mới
    // let mut guess = ...

    // Kiểm tra: thử gán giá trị vào guess
    guess = String::from("test");
    println!("Biến guess: {}", guess);
}
`,
      expectedOutput: 'Biến guess: test',
      testCases: [
        {
          input: '',
          expectedOutput: 'Biến guess: test',
          description: 'Biến guess phải khả biến và có kiểu String'
        }
      ]
    };
