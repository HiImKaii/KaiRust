import { Lesson } from '../../courses';

export const ch06_10_ex: Lesson = {
    id: 'ch06-10-ex',
    title: 'Bài tập 6.10: Linked List với Enum (Dự án tổng hợp)',
    duration: '45 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Linked List với Enum',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Dự án tổng hợp: Xây dựng Linked List sử dụng Enum và áp dụng tất cả kiến thức đã học.

Yêu cầu:
1. Định nghĩa enum LinkedList:
   - Nil - danh sách rỗng
   - Cons(i32, Box<LinkedList>) - phần tử tiếp theo
2. Implement các method:
   - new() - tạo danh sách rỗng
   - push_back(&mut Self, value: i32) - thêm vào cuối
   - len(&self) -> usize - độ dài
   - search(&self, value: i32) -> bool - tìm kiếm
   - to_vec(&self) -> Vec<i32> - chuyển sang vector`,

    inputFormat: 'Tạo LinkedList và gọi các method',
    outputFormat: 'In ra kết quả tương ứng',

    constraints: [
        { field: 'Enum LinkedList', condition: '2 variant: Nil, Cons(i32, Box<LinkedList>)' },
        { field: 'new()', condition: 'Tạo danh sách rỗng' },
        { field: 'push_back', condition: 'Thêm phần tử vào cuối danh sách' },
        { field: 'len', condition: 'Trả về độ dài danh sách' },
        { field: 'search', condition: 'Tìm kiếm phần tử' }
    ],

    examples: [
        {
            input: 'Tạo list, push 1,2,3',
            output: '[1, 2, 3]',
            explanation: 'Tạo và thêm phần tử vào LinkedList'
        }
    ],

    content: `
<h3>Cấu trúc LinkedList</h3>
<pre><code>enum LinkedList {
    Nil,
    Cons(i32, Box<LinkedList>),
}</code></pre>
`,

    defaultCode: `// TODO: Định nghĩa enum LinkedList

// TODO: Implement các methods

fn main() {
    // Test
    let mut list = LinkedList::new();
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);
    println!("{:?}", list.to_vec());
    println!("Len: {}", list.len());
    println!("Search 2: {}", list.search(2));
}
`,

    testCases: [
        {
            input: 'Tạo list, push 1,2,3',
            expectedOutput: '[1, 2, 3]',
            description: 'Tạo và thêm phần tử'
        },
        {
            input: 'list.len()',
            expectedOutput: '3',
            description: 'Độ dài danh sách'
        }
    ]
};
