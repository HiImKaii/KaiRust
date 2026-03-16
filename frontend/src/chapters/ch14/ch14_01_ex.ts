import { Lesson } from '../../courses';

export const ch14_01_ex: Lesson = {
    id: 'ch14-01-ex',
    title: 'Bài tập 14.1: Iterator cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành với Iterators!</p>`,
    defaultCode: `fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let mut iter = v.iter();

    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
}
`,
    expectedOutput: 'Some(1)\nSome(2)\nSome(3)',
    testCases: [{ input: 'next()', expectedOutput: 'Some(1)', description: 'First element' }]
};
