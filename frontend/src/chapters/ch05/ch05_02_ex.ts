import { Lesson } from '../../courses';

export const ch05_02_ex: Lesson = {
    id: 'ch05-02-ex',
    title: 'Bài tập 5.2: Debug với Derive Macros',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng Debug traits và Derive macros!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa struct <code>Product</code> với các fields: <code>name</code> (String), <code>price</code> (f64), <code>quantity</code> (u32)</li>
  <li>Thêm <code>#[derive(Debug, Clone, PartialEq)]</code></li>
  <li>Tạo 2 sản phẩm và so sánh chúng</li>
  <li>Sử dụng cả <code>{:?}</code> và <code>{:#?}</code> để in</li>
</ol>
<h3 class="task-heading">Ví dụ Test Cases</h3>
<div class="test-case">
  <h4>Test Case 1: Debug Output</h4>
  <pre><code>Input: Product { name: "Laptop", price: 999.99, quantity: 5 }
Expected Output: Product { name: "Laptop", price: 999.99, quantity: 5 }</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: So sánh bằng</h4>
  <pre><code>Input: So sánh 2 sản phẩm giống nhau
Expected Output: true</code></pre>
</div>
`,
    defaultCode: `#[derive(Debug, Clone, PartialEq)]
struct Product {
    name: String,
    price: f64,
    quantity: u32,
}

fn main() {
    let product1 = Product {
        name: String::from("Laptop"),
        price: 999.99,
        quantity: 5,
    };

    let mut product2 = product1.clone();
    product2.name = String::from("Phone");

    // In product1 bằng {:?} và {:#?}
    println!("Debug: {:?}", product1);
    println!("Pretty: {:#?}", product2);

    // So sánh 2 sản phẩm
    println!("product1 == product2: {}", product1 == product2);
}
`,
    expectedOutput: 'Debug: Product { name: "Laptop", price: 999.99, quantity: 5 }\nproduct1 == product2: false',
    testCases: [
        {
            input: 'Product { name: "Laptop", price: 999.99, quantity: 5 }',
            expectedOutput: 'Product { name: "Laptop", price: 999.99, quantity: 5 }',
            description: 'Debug output của struct'
        }
    ]
};
