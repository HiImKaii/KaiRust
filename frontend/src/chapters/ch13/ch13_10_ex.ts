import { Lesson } from '../../courses';

export const ch13_10_ex: Lesson = {
    id: 'ch13-10-ex',
    title: 'Bài tập 13.10: Method chaining',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành method chaining!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Chain: lọc chẵn, nhân đôi, tính tổng
    let result: i32 = numbers
        .iter()
        .filter(|&&x| x % 2 == 0)
        .map(|x| x * 2)
        .sum();

    println!("Sum of doubled evens: {}", result);
}
`,
    expectedOutput: 'Sum of doubled evens: 60',
    testCases: [{ input: 'result', expectedOutput: '60', description: '(2+4+6+8+10)*2 = 60' }]
};
