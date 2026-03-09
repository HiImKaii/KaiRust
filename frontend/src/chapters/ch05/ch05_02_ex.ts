import { Lesson } from '../../courses';

export const ch05_02_ex: Lesson = {
    id: 'ch05-02-ex',
    title: 'Bài tập 5.2: Debug với Derive Macros',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Debug với Derive Macros',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: `Cho trước thông tin sản phẩm bao gồm tên, giá và số lượng. Hãy định nghĩa một Struct Product với các field tương ứng. Sử dụng #[derive(Debug, Clone, PartialEq)] để struct có thể in ra màn hình (debug), clone và so sánh bằng nhau. Tạo hai sản phẩm, so sánh chúng bằng toán tử == và in kết quả.`,
    inputFormat: 'Không có input từ người dùng',
    outputFormat: 'Dòng 1: In product1 với định dạng Debug {:?}\nDòng 2: Kết quả so sánh product1 == product2 (true/false)',
    constraints: [
        { field: 'name', condition: 'String, tên sản phẩm' },
        { field: 'price', condition: 'f64, giá sản phẩm' },
        { field: 'quantity', condition: 'u32, số lượng' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Product { name: "Laptop", price: 999.99, quantity: 5 }\nfalse',
            explanation: 'product1 có name là "Laptop", sau khi clone và sửa name thành "Phone", hai sản phẩm khác nhau nên so sánh bằng false'
        }
    ],

    content: `
<h3 class="task-heading">Bài tập: Sử dụng Debug Traits và Derive Macros</h3>

<p>Trong bài tập này, bạn sẽ thực hành:</p>
<ol>
    <li>Định nghĩa Struct với nhiều kiểu dữ liệu khác nhau</li>
    <li>Sử dụng #[derive(Debug)] để in struct ra màn hình</li>
    <li>Sử dụng #[derive(Clone)] để nhân bản struct</li>
    <li>Sử dụng #[derive(PartialEq)] để so sánh bằng nhau</li>
    <li>Sử dụng toán tử == để so sánh hai instance</li>
</ol>

<h4 class="task-heading">Hướng dẫn:</h4>
<ul>
    <li>Thêm <code>#[derive(Debug, Clone, PartialEq)]</code> trước định nghĩa struct</li>
    <li>Sử dụng <code>{:?}</code> trong println! để in theo định dạng Debug</li>
    <li>Sử dụng <code>.clone()</code> để tạo bản sao của struct</li>
    <li>Sử dụng <code>==</code> để so sánh hai struct (so sánh tất cả các field)</li>
</ul>
`,
    defaultCode: `// TODO: Định nghĩa struct Product với:
// - name: String
// - price: f64
// - quantity: u32
// Thêm #[derive(Debug, Clone, PartialEq)] phía trên

fn main() {
    // Tạo product1 với:
    // name: "Laptop"
    // price: 999.99
    // quantity: 5
    // TODO: Tạo instance product1

    // Clone product1 thành product2
    // TODO: let mut product2 = product1.clone();

    // Sửa tên product2 thành "Phone"
    // TODO: product2.name = String::from("Phone");

    // In product1 theo định dạng Debug
    // TODO: println!("{:?}", product1);

    // So sánh product1 == product2 và in kết quả
    // TODO: println!("{}", product1 == product2);
}
`,
    expectedOutput: 'Product { name: "Laptop", price: 999.99, quantity: 5 }\nfalse',
    testCases: [
        {
            input: '',
            expectedOutput: 'Product { name: "Laptop", price: 999.99, quantity: 5 }\nfalse',
            description: 'Tạo struct Product, in debug và so sánh hai instance'
        }
    ]
};
