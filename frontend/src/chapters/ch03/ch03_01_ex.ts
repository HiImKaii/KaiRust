import { Lesson } from '../../courses';

export const ch03_01_ex: Lesson = {
    id: 'ch03-01-ex',
    title: 'Bài tập 3.1: Biến bất biến và khả biến',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Biến bất biến và khả biến',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Viết chương trình tạo hai biến:
- Biến bất biến (immutable) tên x có giá trị là 5
- Biến khả biến (mutable) tên y có giá trị ban đầu là 10, sau đó thay đổi thành 20

In ra màn hình giá trị của x và y, cách nhau bằng dấu phẩy và khoảng trắng.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng duy nhất: 5, 20',

    // Các ràng buộc
    constraints: [
        { field: 'x', condition: 'Biến bất biến (immutable), dùng let, giá trị = 5' },
        { field: 'y', condition: 'Biến khả biến (mutable), dùng let mut, giá trị = 10 rồi đổi thành 20' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: '',
            output: '5, 20',
            explanation: 'Biến x = 5 (không thay đổi), y = 20 (đã thay đổi từ 10). In ra theo format "x, y"'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Tìm hiểu về Biến trong Rust</h3>

<p>Trong Rust, biến mặc định là <strong>bất biến</strong> (immutable), có nghĩa là một khi gán giá trị thì không thể thay đổi được.</p>

<h4>Để tạo biến bất biến:</h4>
<pre><code>let x = 5;</code></pre>

<h4>Để tạo biến khả biến:</h4>
<pre><code>let mut y = 10;</code></pre>
<pre><code>y = 20;  // Thay đổi giá trị</code></pre>

<h4>In ra màn hình:</h4>
<pre><code>println!("{}, {}", x, y);</code></pre>
`,

    // Code mẫu có sẵn
    defaultCode: `fn main() {
    // TODO: Tạo biến bất biến x = 5

    // TODO: Tạo biến khả biến y = 10

    // TODO: Thay đổi giá trị y thành 20

    // TODO: In ra màn hình theo định dạng "x, y"
    // Ví dụ: println!("{}, {}", x, y);
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: '',
            expectedOutput: '5, 20',
            description: 'Kiểm tra biến bất biến và khả biến'
        }
    ]
};
