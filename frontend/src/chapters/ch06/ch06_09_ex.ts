import { Lesson } from '../../courses';

export const ch06_09_ex: Lesson = {
    id: 'ch06-09-ex',
    title: 'Bài tập 6.9: Binary Tree với Enum',
    duration: '35 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy sử dụng Enum để xây dựng cấu trúc cây nhị phân và thực hành pattern matching nâng cao!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>Tree</code>:
    <ul>
      <li><code>Empty</code> - cây rỗng</li>
      <li><code>Node { value: i32, left: Box&lt;Tree&gt;, right: Box&lt;Tree&gt; }</code></li>
    </ul>
  </li>
  <li>Tạo hàm <code>insert(tree: Tree, value: i32) -> Tree</code> chèn giá trị vào cây</li>
  <li>Tạo hàm <code>contains(tree: &Tree, value: i32) -> bool</code> kiểm tra giá trị có trong cây không</li>
  <li>Tạo hàm <code>sum(tree: &Tree) -> i32</code> tính tổng tất cả giá trị</li>
</ol>
`,
    defaultCode: `// Định nghĩa cấu trúc cây nhị phân

// Hàm chèn giá trị vào cây

// Hàm kiểm tra giá trị có trong cây không

// Hàm tính tổng tất cả giá trị

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'insert(Tree::Empty, 5)',
            expectedOutput: 'Node',
            description: 'Chèn vào cây rỗng'
        },
        {
            input: 'sum(&tree)',
            expectedOutput: '29',
            description: 'Tổng các giá trị trong cây'
        }
    ]
};
