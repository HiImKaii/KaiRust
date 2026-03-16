import { Lesson } from '../../courses';

export const ch18_12_ex: Lesson = {
    id: 'ch18-12-ex',
    title: 'Bài tập 18.12: Unsafe Superpowers',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về unsafe superpowers!</p>`,
    defaultCode: `fn main() {
    let mut v = vec![1, 2, 3, 4, 5];
    let (left, right) = v.split_at_mut(2);
    println!("Left: {:?}", left);
}
`,
    expectedOutput: 'Left: [1, 2]',
    testCases: [{ input: 'split_at_mut', expectedOutput: '[1, 2]', description: 'Split works' }]
};
