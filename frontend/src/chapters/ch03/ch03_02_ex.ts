import { Lesson } from '../../courses';

export const ch03_02_ex: Lesson = {
    id: 'ch03-02-ex',
    title: 'Bài tập 3.2: Tuple và Array',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tuple và Array',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Viết chương trình tạo một Tuple chứa ba giá trị: i32 = 500, f64 = 6.4, char = 'Z'. Sau đó destructure tuple để lấy các giá trị. Tiếp theo, tạo một Array chứa các số [1, 2, 3, 4, 5]. In các giá trị theo định dạng.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: "500 6.4 Z"\nDòng 2: "[1, 2, 3, 4, 5]"',
    constraints: [
        { field: 'Tuple', condition: '(i32, f64, char) = (500, 6.4, Z)' },
        { field: 'Array', condition: '[i32; 5] = [1, 2, 3, 4, 5]' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '500 6.4 Z\n[1, 2, 3, 4, 5]',
            explanation: 'Destructure tuple và in array'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Tuple và Array</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Tạo Tuple với nhiều kiểu dữ liệu khác nhau</li>
    <li>Destructure Tuple thành các biến riêng biệt</li>
    <li>Tạo Array với nhiều phần tử</li>
    <li>In các giá trị ra màn hình</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Tuple: <code>let my_tuple = (500, 6.4, 'Z');</code></li>
    <li>Destructure: <code>let (x, y, z) = my_tuple;</code></li>
    <li>Array: <code>let my_array = [1, 2, 3, 4, 5];</code></li>
    <li>In tuple: <code>println!("{} {} {}", x, y, z);</code></li>
    <li>In array: <code>println!("{:?}", my_array);</code></li>
</ul>
`,
    defaultCode: `fn main() {
    // TODO: Tạo tuple (i32, f64, char) = (500, 6.4, 'Z')

    // TODO: Destructure tuple thành các biến x, y, z

    // TODO: Tạo array [1, 2, 3, 4, 5]

    // TODO: In các giá trị của x, y, z
    // Format: "{} {} {}"

    // TODO: In array
    // Format: "{:?}"
}
`,
    expectedOutput: '500 6.4 Z\n[1, 2, 3, 4, 5]',
    testCases: [
        {
            input: '',
            expectedOutput: '500 6.4 Z\n[1, 2, 3, 4, 5]',
            description: 'Tạo và in Tuple và Array'
        }
    ]
};
