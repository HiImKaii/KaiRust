import { Lesson } from '../../courses';

export const ch13_02_ex: Lesson = {
    id: 'ch13-02-ex',
    title: 'Bài tập 13.2: Closure với type inference',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành closure với type inference!</p>
`,
    defaultCode: `fn main() {
    // Closure không cần chỉ định kiểu
    let add = |a, b| a + b;
    let multiply = |a, b| a * b;

    println!("5 + 3 = {}", add(5, 3));
    println!("4 * 7 = {}", multiply(4, 7));

    // Closure đơn giản
    let x = 5;
    let double = |n| n * 2;
    println!("Double of {} = {}", x, double(x));
}
`,
    expectedOutput: '5 + 3 = 8\n4 * 7 = 28\nDouble of 5 = 10',
    testCases: [{ input: 'add(5, 3)', expectedOutput: '8', description: '5 + 3 = 8' }]
};
