import { Lesson } from '../../courses';

export const ch05_02_ex: Lesson = {
    id: 'ch05-02-ex',
    title: 'Bài tập 5.2: Debug với Derive Macros',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Debug với Derive Macros',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sử dụng #[derive(Debug)] để in struct.',
    inputFormat: 'Không có input',
    outputFormat: 'In struct với Debug trait',
    constraints: [
        { field: 'Struct', condition: 'Product: name, price, quantity' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Product { name: "Laptop", price: 999.99, quantity: 5 }\nfalse'
        }
    ],

    content: `
<p>Sử dụng Debug traits và Derive macros!</p>
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

    println!("{:?}", product1);
    println!("{}", product1 == product2);
}
`,
    expectedOutput: 'Product { name: "Laptop", price: 999.99, quantity: 5 }\nfalse'
};
