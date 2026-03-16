import { Lesson } from '../../courses';

export const ch13_14_ex: Lesson = {
    id: 'ch13-14-ex',
    title: 'Bài tập 13.14: zip()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành zip()!</p>`,
    defaultCode: `fn main() {
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];

    let zipped: Vec<(i32, i32)> = a.iter().zip(b.iter()).map(|(&x, &y)| (x, y)).collect();
    println!("Zipped: {:?}", zipped);
}
`,
    expectedOutput: 'Zipped: [(1, 4), (2, 5), (3, 6)]',
    testCases: [{ input: 'zipped', expectedOutput: '[(1, 4), (2, 5), (3, 6)]', description: 'Zipped' }]
};
