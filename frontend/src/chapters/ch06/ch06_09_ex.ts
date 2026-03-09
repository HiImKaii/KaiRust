import { Lesson } from '../../courses';

export const ch06_09_ex: Lesson = {
    id: 'ch06-09-ex',
    title: 'Bài tập 6.9: Binary Tree với Enum',
    duration: '35 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Binary Tree với Enum',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Sử dụng Enum để xây dựng cấu trúc cây nhị phân và thực hành pattern matching nâng cao.

Yêu cầu:
1. Định nghĩa enum Tree:
   - Empty - cây rỗng
   - Node { value: i32, left: Box<Tree>, right: Box<Tree> }
2. Viết hàm insert(tree: Tree, value: i32) -> Tree chèn giá trị vào cây
3. Viết hàm contains(tree: &Tree, value: i32) -> bool kiểm tra giá trị có trong cây không
4. Viết hàm sum(tree: &Tree) -> i32 tính tổng tất cả giá trị`,

    inputFormat: 'Gọi hàm với Tree',
    outputFormat: 'In ra kết quả tương ứng',

    constraints: [
        { field: 'Enum Tree', condition: '2 variant: Empty, Node{value:i32,left:Box<Tree>,right:Box<Tree>}' },
        { field: 'insert', condition: 'Chèn giá trị vào cây, trả về Tree mới' },
        { field: 'contains', condition: 'Kiểm tra giá trị có trong cây không' },
        { field: 'sum', condition: 'Tính tổng tất cả giá trị trong cây' }
    ],

    examples: [
        {
            input: 'sum(&tree)',
            output: '29',
            explanation: 'Tổng các giá trị trong cây: 5 + 10 + 14 = 29'
        }
    ],

    content: `
<h3>Cấu trúc cây nhị phân</h3>
<pre><code>enum Tree {
    Empty,
    Node {
        value: i32,
        left: Box<Tree>,
        right: Box<Tree>,
    },
}</code></pre>
`,

    defaultCode: `// TODO: Định nghĩa enum Tree

// TODO: Viết hàm insert(tree: Tree, value: i32) -> Tree

// TODO: Viết hàm contains(tree: &Tree, value: i32) -> bool

// TODO: Viết hàm sum(tree: &Tree) -> i32

fn main() {
    // Tạo cây: 10
    //          /  \\
    //         5    14
    let tree = Tree::Node {
        value: 10,
        left: Box::new(Tree::Node {
            value: 5,
            left: Box::new(Tree::Empty),
            right: Box::new(Tree::Empty),
        }),
        right: Box::new(Tree::Node {
            value: 14,
            left: Box::new(Tree::Empty),
            right: Box::new(Tree::Empty),
        }),
    };

    println!("Sum: {}", sum(&tree));
    println!("Contains 10: {}", contains(&tree, 10));
    println!("Contains 99: {}", contains(&tree, 99));
}
`,

    testCases: [
        {
            input: 'sum(&tree)',
            expectedOutput: '29',
            description: 'Tổng các giá trị trong cây'
        },
        {
            input: 'contains(&tree, 10)',
            expectedOutput: 'true',
            description: 'Tìm thấy giá trị 10'
        },
        {
            input: 'contains(&tree, 99)',
            expectedOutput: 'false',
            description: 'Không tìm thấy giá trị 99'
        }
    ]
};
