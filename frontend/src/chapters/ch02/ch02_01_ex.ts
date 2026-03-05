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
`,
      defaultCode: `fn main() {
    // TODO: Tạo một biến \`guess\` khả biến (mutable) và gán cho nó một String mới
    // let mut guess = ...
    
}
`
    };
