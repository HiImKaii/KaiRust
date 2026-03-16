import { Lesson } from '../../courses';

export const ch18_02_ex: Lesson = {
    id: 'ch18-02-ex',
    title: 'Bài tập 18.2: Unsafe Functions',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về unsafe functions!</p>`,
    defaultCode: `unsafe fn dangerous() { println!("Đây là hàm unsafe!"); }
fn main() { unsafe { dangerous(); } }
`,
    expectedOutput: 'Đây là hàm unsafe!',
    testCases: [{ input: 'dangerous()', expectedOutput: 'unsafe', description: 'Unsafe function works' }]
};
