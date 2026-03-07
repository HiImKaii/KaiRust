import { Lesson } from '../../courses';

export const ch08_06_ex: Lesson = {
    id: 'ch08-06-ex',
    title: 'Bài tập 8.6: Todo List App',
    duration: '30 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Xây dựng ứng dụng Todo List đơn giản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo struct <code>TodoItem</code> với: title, completed</li>
  <li>Tạo struct <code>TodoList</code> với các methods:
    <ul>
      <li><code>new()</code> - tạo list mới</li>
      <li><code>add(title: &str)</code> - thêm task</li>
      <li><code>complete(index: usize)</code> - đánh dấu hoàn thành</li>
      <li><code>remove(index: usize)</code> - xóa task</li>
      <li><code>list()</code> - hiển thị tất cả</li>
    </ul>
  </li>
</ol>
`,
    defaultCode: `use std::collections::HashMap;

// Định nghĩa TodoItem

// Định nghĩa TodoList

// Implement các methods

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'add("Học Rust")',
            expectedOutput: '[ ] Học Rust',
            description: 'Thêm task mới'
        }
    ]
};
