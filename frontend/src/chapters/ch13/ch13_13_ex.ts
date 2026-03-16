import { Lesson } from '../../courses';

export const ch13_13_ex: Lesson = {
    id: 'ch13-13-ex',
    title: 'Bài tập 13.13: flatten()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành flatten()!</p>`,
    defaultCode: `fn main() {
    let nested = vec![vec![1, 2], vec![3, 4], vec![5]];

    let flat: Vec<i32> = nested.iter().flatten().copied().collect();
    println!("Flattened: {:?}", flat);
}
`,
    expectedOutput: 'Flattened: [1, 2, 3, 4, 5]',
    testCases: [{ input: 'flat', expectedOutput: '[1, 2, 3, 4, 5]', description: 'Flattened' }]
};
