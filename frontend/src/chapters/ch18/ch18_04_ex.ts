import { Lesson } from '../../courses';

export const ch18_04_ex: Lesson = {
    id: 'ch18-04-ex',
    title: 'Bài tập 18.4: Calling C Functions',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về FFI!</p>`,
    defaultCode: `extern "C" { fn abs(input: i32) -> i32; }
fn main() { unsafe { println!("{}", abs(-5)); } }
`,
    expectedOutput: '5',
    testCases: [{ input: 'abs(-5)', expectedOutput: '5', description: 'FFI works' }]
};
