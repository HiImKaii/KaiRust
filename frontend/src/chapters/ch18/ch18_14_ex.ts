import { Lesson } from '../../courses';

export const ch18_14_ex: Lesson = {
    id: 'ch18-14-ex',
    title: 'Bài tập 18.14: Send and Sync with Unsafe',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Send và Sync!</p>`,
    defaultCode: `use std::rc::Rc;
fn main() { let rc = Rc::new(5); println!("{}", rc); }
`,
    expectedOutput: '5',
    testCases: [{ input: 'Rc::new', expectedOutput: '5', description: 'Rc works' }]
};
