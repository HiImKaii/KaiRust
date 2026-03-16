import { Lesson } from '../../courses';

export const ch13_08_ex: Lesson = {
    id: 'ch13-08-ex',
    title: 'Bài tập 13.8: fold() với closure',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành sử dụng fold() với closure!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Tính tổng
    let sum = numbers.iter().fold(0, |acc, x| acc + x);
    println!("Sum: {}", sum);

    // Tính tích
    let product = numbers.iter().fold(1, |acc, x| acc * x);
    println!("Product: {}", product);

    // Tìm max
    let max = numbers.iter().fold(i32::MIN, |acc, &x| acc.max(x));
    println!("Max: {}", max);
}
`,
    expectedOutput: 'Sum: 15\nProduct: 120\nMax: 5',
    testCases: [{ input: 'sum', expectedOutput: '15', description: 'Tổng 1+2+3+4+5 = 15' }]
};
