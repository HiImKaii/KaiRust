import { Lesson } from '../../courses';

export const ch19_10_ex: Lesson = {
    id: 'ch19-10-ex',
    title: 'Bài tập 19.10',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Nested</p>',
    defaultCode: `struct Inner { v: i32 }
struct Outer { inner: Inner }
fn main() { let o = Outer { inner: Inner { v: 5 } }; if let Outer { inner: Inner { v } } = o { println!("{}", v); } }`,
    expectedOutput: '5',
    testCases: [{ input: 'v', expectedOutput: '5' }]
};
