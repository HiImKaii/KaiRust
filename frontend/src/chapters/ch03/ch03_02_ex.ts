import { Lesson } from '../../courses';

export const ch03_02_ex: Lesson = {
    id: 'ch03-02-ex',
    title: 'Bài tập 3.2: Tuple và Array',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tuple và Array',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: `Viết chương trình thực hiện các yêu cầu sau:
1. Tạo một Tuple chứa ba giá trị: số nguyên 500, số thực 6.4, ký tự 'Z'
2. Destructure (phân rã) Tuple để lấy ra các giá trị riêng biệt
3. Tạo một Array chứa 5 số nguyên: [1, 2, 3, 4, 5]

In ra:
- Dòng 1: Giá trị của 3 phần tử từ Tuple, cách nhau bằng khoảng trắng
- Dòng 2: Toàn bộ Array dưới dạng Debug format`,
    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: `Dòng 1: 500 6.4 Z
Dòng 2: [1, 2, 3, 4, 5]`,

    // Các ràng buộc
    constraints: [
        { field: 'Tuple', condition: 'Chứa (i32, f64, char) = (500, 6.4, Z)' },
        { field: 'Array', condition: 'Mảng số nguyên [i32; 5] = [1, 2, 3, 4, 5]' },
        { field: 'Output dòng 1', condition: 'In 3 giá trị từ Tuple, cách nhau bằng khoảng trắng' },
        { field: 'Output dòng 2', condition: 'In Array dưới dạng Debug format {:?}' }
    ],

    examples: [
        {
            input: '',
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
