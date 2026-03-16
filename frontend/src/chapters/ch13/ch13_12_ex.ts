import { Lesson } from '../../courses';

export const ch13_12_ex: Lesson = {
    id: 'ch13-12-ex',
    title: 'Bài tập 13.12: any(), all(), none()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành any(), all(), none()!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Kiểm tra any
    let has_even = numbers.iter().any(|&&x| x % 2 == 0);
    println!("Has even: {}", has_even);

    // Kiểm tra all
    let all_positive = numbers.iter().all(|&&x| x > 0);
    println!("All positive: {}", all_positive);

    // Kiểm tra none
    let none_zero = numbers.iter().none(|&&x| x == 0);
    println!("None zero: {}", none_zero);
}
`,
    expectedOutput: 'Has even: true\nAll positive: true\nNone zero: true',
    testCases: [{ input: 'has_even', expectedOutput: 'true', description: 'Has even number' }]
};
