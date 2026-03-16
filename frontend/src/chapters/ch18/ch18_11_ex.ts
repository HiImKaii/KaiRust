import { Lesson } from '../../courses';

export const ch18_11_ex: Lesson = {
    id: 'ch18-11-ex',
    title: 'Bài tập 18.11: Manual Memory Layout',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về memory layout!</p>`,
    defaultCode: `use std::mem::size_of;
#[repr(C)] struct MyStruct { a: i32, b: i64, c: i32 }
fn main() { println!("Size: {}", size_of::<MyStruct>()); }
`,
    expectedOutput: 'Size: 24',
    testCases: [{ input: 'size_of', expectedOutput: '24', description: 'Memory layout works' }]
};
