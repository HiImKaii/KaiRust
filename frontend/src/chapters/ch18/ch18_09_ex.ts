import { Lesson } from '../../courses';

export const ch18_09_ex: Lesson = {
    id: 'ch18-09-ex',
    title: 'Bài tập 18.9: Unsafe Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về unsafe trait!</p>`,
    defaultCode: `unsafe trait Danger { fn danger(&self); }
struct DangerStruct;
unsafe impl Danger for DangerStruct { fn danger(&self) { println!("Danger!"); } }
fn main() { let ds = DangerStruct; unsafe { ds.danger(); } }
`,
    expectedOutput: 'Danger!',
    testCases: [{ input: 'danger()', expectedOutput: 'Danger', description: 'Unsafe trait works' }]
};
