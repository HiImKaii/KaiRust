import { Lesson } from '../../courses';

export const ch18_07_ex: Lesson = {
    id: 'ch18-07-ex',
    title: 'Bài tập 18.7: External Functions',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về external functions!</p>`,
    defaultCode: `extern "C" { fn puts(s: *const i8) -> i32; }
fn main() { unsafe { puts(b"Hello\0".as_ptr() as *const i8); } }
`,
    expectedOutput: 'Hello',
    testCases: [{ input: 'puts', expectedOutput: 'Hello', description: 'External function works' }]
};
