import { Lesson } from '../../courses';

export const ch18_01_ex: Lesson = {
    id: 'ch18-01-ex',
    title: 'Bài tập 18.1: Dereferencing Raw Pointers',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về raw pointers!</p>`,
    defaultCode: `fn main() {
    let num = 5;
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    unsafe {
        println!("r1: {}", *r1);
        println!("r2: {}", *r2);
    }
}
`,
    expectedOutput: 'r1: 5',
    testCases: [{ input: '*r1', expectedOutput: '5', description: 'Raw pointer works' }]
};
