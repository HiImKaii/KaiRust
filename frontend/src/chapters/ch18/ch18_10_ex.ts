import { Lesson } from '../../courses';

export const ch18_10_ex: Lesson = {
    id: 'ch18-10-ex',
    title: 'Bài tập 18.10: Raw Pointer from Reference',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về raw pointer từ reference!</p>`,
    defaultCode: `fn main() {
    let mut value = 10;
    let ptr = &mut value as *mut i32;
    unsafe { *ptr = 20; }
    println!("Value: {}", value);
}
`,
    expectedOutput: 'Value: 20',
    testCases: [{ input: '*ptr', expectedOutput: '20', description: 'Raw pointer works' }]
};
