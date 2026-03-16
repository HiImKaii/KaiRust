import { Lesson } from '../../courses';

export const ch17_04_ex: Lesson = {
    id: 'ch17-04-ex',
    title: 'Bài tập 17.4: Static Lifetime',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về static lifetime!</p>`,
    defaultCode: `fn main() {
    let s: &'static str = "Tôi có static lifetime";
    println!("{}", s);
}
`,
    expectedOutput: 'Tôi có static lifetime',
    testCases: [{ input: 'static', expectedOutput: 'static lifetime', description: 'Static lifetime works' }]
};
