import { Lesson } from '../../courses';

export const ch13_09_ex: Lesson = {
    id: 'ch13-09-ex',
    title: 'Bài tập 13.9: filter_map()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành sử dụng filter_map()!</p>`,
    defaultCode: `fn main() {
    let strings = vec!["1", "two", "3", "four", "5"];

    // Parse và lọc
    let numbers: Vec<i32> = strings
        .iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();

    println!("Parsed numbers: {:?}", numbers);
}
`,
    expectedOutput: 'Parsed numbers: [1, 3, 5]',
    testCases: [{ input: 'numbers', expectedOutput: '[1, 3, 5]', description: 'Parse strings to numbers' }]
};
