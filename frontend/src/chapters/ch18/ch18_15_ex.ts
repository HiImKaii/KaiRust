import { Lesson } from '../../courses';

export const ch18_15_ex: Lesson = {
    id: 'ch18-15-ex',
    title: 'Bài tập 18.15: Volatile Memory Access',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về volatile memory!</p>`,
    defaultCode: `fn main() {
    let data = vec![1i32, 2, 3, 4, 5];
    let ptr = data.as_ptr();
    unsafe { println!("{}", *ptr); }
}
`,
    expectedOutput: '1',
    testCases: [{ input: '*ptr', expectedOutput: '1', description: 'Volatile works' }]
};
