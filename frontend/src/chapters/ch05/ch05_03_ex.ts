import { Lesson } from '../../courses';

export const ch05_03_ex: Lesson = {
    id: 'ch05-03-ex',
    title: 'Bài tập 5.3: Tính chu vi hình tròn',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tính chu vi hình tròn',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Cho trước bán kính của một hình tròn. Hãy tính chu vi của hình tròn đó. Sử dụng công thức: chu_vi = 2 * PI * bán_kính. Lấy PI = 3.14. In kết quả với 2 chữ số thập phân.`,
    inputFormat: 'Không có input từ người dùng (sử dụng bán kính cố định)',
    outputFormat: 'In chu vi hình tròn với 2 chữ số thập phân',
    constraints: [
        { field: 'bán_kính', condition: 'f64, giá trị từ 1 đến 1000' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '31.42',
            explanation: 'Chu vi = 2 * 3.14 * 5 = 31.4, in với 2 chữ số thập phân là 31.42'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Tính chu vi hình tròn</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa một Struct Circle với field radius</li>
    <li>Định nghĩa một method tính chu vi trong impl block</li>
    <li>Sử dụng let để khai báo hằng số PI</li>
    <li>In kết quả với định dạng chỉ định (format specifier)</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Công thức: circumference = 2 * PI * radius</li>
    <li>Sử dụng <code>{:.2}</code> để in với 2 chữ số thập phân</li>
    <li>Method trong Rust có tham số đầu tiên là <code>&self</code></li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Circle với field radius: f64
// Thêm #[derive(Debug)]

// TODO: Định nghĩa impl Circle với method circumference(&self) -> f64
// Công thức: 2 * PI * radius
// Lấy PI = 3.14

fn main() {
    let radius = 5.0;

    // TODO: Tạo instance Circle từ radius

    // TODO: Gọi method circumference và in kết quả với 2 chữ số thập phân
    // Sử dụng println!("{:.2}", circle.circumference());
}
`,
    expectedOutput: '31.42',
    testCases: [
        {
            input: '',
            expectedOutput: '31.42',
            description: 'Tính chu vi hình tròn bán kính 5'
        }
    ]
};
