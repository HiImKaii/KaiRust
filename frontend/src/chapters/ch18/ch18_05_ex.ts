import { Lesson } from '../../courses';

export const ch18_05_ex: Lesson = {
    id: 'ch18-05-ex',
    title: 'Bài tập 18.5: Mutable Static Variables',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về mutable static!</p>`,
    defaultCode: `static mut COUNTER: i32 = 0;
fn main() { unsafe { COUNTER = 10; println!("Counter: {}", COUNTER); } }
`,
    expectedOutput: 'Counter: 10',
    testCases: [{ input: 'COUNTER', expectedOutput: '10', description: 'Static works' }]
};
