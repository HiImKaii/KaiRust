import { Lesson } from '../../courses';

export const ch03_01_ex: Lesson = {
    id: 'ch03-01-ex',
    title: 'Bài tập 3.1: Biến và Tính bất biến',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Biến và Tính bất biến',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Viết chương trình tạo hai biến: biến bất biến x có giá trị 5, và biến khả biến y có giá trị ban đầu là 10, sau đó thay đổi y thành 20. In ra x và y theo định dạng "x, y".`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'In ra: "5, 20"',
    constraints: [
        { field: 'x', condition: 'Biến bất biến (immutable), giá trị = 5' },
        { field: 'y', condition: 'Biến khả biến (mutable), giá trị ban đầu = 10, sau đó = 20' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '5, 20',
            explanation: 'x = 5 (không đổi), y = 20 (đã thay đổi từ 10)'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Biến và Tính bất biến</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Tạo biến bất biến (immutable) với let</li>
    <li>Tạo biến khả biến (mutable) với let mut</li>
    <li>Thay đổi giá trị biến mutable</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Biến bất biến: <code>let x = 5;</code></li>
    <li>Biến khả biến: <code>let mut y = 10;</code></li>
    <li>Thay đổi giá trị: <code>y = 20;</code></li>
    <li>In: <code>println!("{}, {}", x, y);</code></li>
</ul>
`,
    defaultCode: `fn main() {
    // TODO: Tạo biến bất biến x = 5

    // TODO: Tạo biến khả biến y = 10

    // TODO: Thay đổi y = 20

    // TODO: In ra màn hình theo định dạng "x, y"
    // Ví dụ: println!("{}, {}", x, y);
}
`,
    expectedOutput: '5, 20',
    testCases: [
        {
            input: '',
            expectedOutput: '5, 20',
            description: 'Tạo và in biến bất biến và khả biến'
        }
    ]
};
