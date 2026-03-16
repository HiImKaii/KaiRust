import { Lesson } from '../../courses';

export const ch13_03_ex: Lesson = {
    id: 'ch13-03-ex',
    title: 'Bài tập 13.3: Closure capturing environment',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành closure captures variables!</p>`,
    defaultCode: `fn main() {
    let x = 10;
    let y = 5;

    // Capture x và y
    let sum = || x + y;
    let product = || x * y;

    println!("Sum: {}", sum());
    println!("Product: {}", product());

    // Thay đổi giá trị (mutable closure)
    let mut count = 0;
    let mut increment = || {
        count += 1;
        count
    };

    println!("Count: {}", increment());
    println!("Count: {}", increment());
    println!("Count: {}", increment());
}
`,
    expectedOutput: 'Sum: 15\nProduct: 50\nCount: 1\nCount: 2\nCount: 3',
    testCases: [{ input: 'sum()', expectedOutput: '15', description: '10 + 5 = 15' }]
};
