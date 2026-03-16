import { Lesson } from '../../courses';

export const ch13_15_ex: Lesson = {
    id: 'ch13-15-ex',
    title: 'Bài tập 13.15: Tổng hợp Closure',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tổng hợp kiến thức về Closures!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Chain: lọc > 3, bình phương, lấy tổng
    let result: i32 = numbers
        .iter()
        .filter(|&&x| x > 3)
        .map(|x| x * x)
        .sum();

    println!("Sum of squares > 3: {}", result);
}
`,
    expectedOutput: 'Sum of squares > 3: 266',
    testCases: [{ input: 'result', expectedOutput: '266', description: '4²+5²+6²+7²+8²+9²+10²=266' }]
};
