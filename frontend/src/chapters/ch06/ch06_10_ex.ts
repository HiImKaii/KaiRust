import { Lesson } from '../../courses';

export const ch06_10_ex: Lesson = {
    id: 'ch06-10-ex',
    title: 'Bài tập 6.10: Linked List với Enum (Dự án tổng hợp)',
    duration: '45 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Dự án tổng hợp: Xây dựng Linked List sử dụng Enum và áp dụng tất cả kiến thức đã học!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>LinkedList</code>:
    <ul>
      <li><code>Nil</code> - danh sách rỗng</li>
      <li><code>Cons(i32, Box&lt;LinkedList&gt;)</code> - phần tử tiếp theo</li>
    </ul>
  </li>
  <li>Implement các method:
    <ul>
      <li><code>new()</code> - tạo danh sách rỗng</li>
      <li><code>push_back(&amp;mut Self, value: i32)</code> - thêm vào cuối</li>
      <li><code>len(&self) -> usize</code> - độ dài</li>
      <li><code>search(&self, value: i32) -> bool</code> - tìm kiếm</li>
      <li><code>to_vec(&self) -> Vec&lt;i32&gt;</code> - chuyển sang vector</li>
    </ul>
  </li>
</ol>
`,
    defaultCode: `// Định nghĩa LinkedList

// Implement các methods

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Tạo list, push 1,2,3',
            expectedOutput: '[1, 2, 3]',
            description: 'Tạo và thêm phần tử'
        },
        {
            input: 'list.len()',
            expectedOutput: '4',
            description: 'Độ dài danh sách'
        }
    ]
};
