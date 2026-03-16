import { Lesson } from '../../courses';

export const ch18_06_ex: Lesson = {
    id: 'ch18-06-ex',
    title: 'Bài tập 18.6: Union Types',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về union types!</p>`,
    defaultCode: `union MyUnion { i: i32, f: f32 }
fn main() { let u = MyUnion { i: 42 }; unsafe { println!("{}", u.i); } }
`,
    expectedOutput: '42',
    testCases: [{ input: 'u.i', expectedOutput: '42', description: 'Union works' }]
};
