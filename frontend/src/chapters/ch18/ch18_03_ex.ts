import { Lesson } from '../../courses';

export const ch18_03_ex: Lesson = {
    id: 'ch18-03-ex',
    title: 'Bài tập 18.3: Unsafe Trait Implementations',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về unsafe trait!</p>`,
    defaultCode: `unsafe trait UnsafeTrait { fn unsafe_method(&self); }
struct MyStruct;
unsafe impl UnsafeTrait for MyStruct { fn unsafe_method(&self) { println!("Unsafe method called"); } }
fn main() { let s = MyStruct; unsafe { s.unsafe_method(); } }
`,
    expectedOutput: 'Unsafe method called',
    testCases: [{ input: 'unsafe_method()', expectedOutput: 'Unsafe', description: 'Unsafe trait works' }]
};
