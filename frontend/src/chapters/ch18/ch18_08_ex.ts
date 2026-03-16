import { Lesson } from '../../courses';

export const ch18_08_ex: Lesson = {
    id: 'ch18-08-ex',
    title: 'Bài tập 18.8: Unsafe Block',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về unsafe blocks!</p>`,
    defaultCode: `fn main() {
    let text = String::from("Hello");
    let chars: Vec<char> = text.chars().collect();
    println!("{:?}", chars);
}
`,
    expectedOutput: '["H", "e", "l", "l", "o"]',
    testCases: [{ input: 'chars', expectedOutput: 'Hello', description: 'Chars works' }]
};
