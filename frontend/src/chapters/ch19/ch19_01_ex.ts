import { Lesson } from '../../courses';

export const ch19_01_ex: Lesson = {
    id: 'ch19-01-ex',
    title: 'Bài tập 19.1: Pattern Matching Basics',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành pattern matching!</p>`,
    defaultCode: `fn main() {
    let x = 5;
    match x {
        1 => println!("One"),
        2 => println!("Two"),
        _ => println!("Other"),
    }
}
`,
    expectedOutput: 'Other',
    testCases: [{ input: 'x', expectedOutput: 'Other', description: 'Match works' }]
};
