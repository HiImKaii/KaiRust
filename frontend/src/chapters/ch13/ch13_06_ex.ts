import { Lesson } from '../../courses';

export const ch13_06_ex: Lesson = {
    id: 'ch13-06-ex',
    title: 'Bài tập 13.6: map() với closure',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành sử dụng map() với closure!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Nhân đôi các số
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    println!("Doubled: {:?}", doubled);

    // Bình phương các số
    let squared: Vec<i32> = numbers.iter().map(|x| x * x).collect();
    println!("Squared: {:?}", squared);

    // Chuyển đổi sang string
    let strings: Vec<String> = numbers.iter().map(|x| x.to_string()).collect();
    println!("Strings: {:?}", strings);
}
`,
    expectedOutput: 'Doubled: [2, 4, 6, 8, 10]\nSquared: [1, 4, 9, 16, 25]\nStrings: ["1", "2", "3", "4", "5"]',
    testCases: [{ input: 'doubled', expectedOutput: '[2, 4, 6, 8, 10]', description: 'Nhân đôi' }]
};
