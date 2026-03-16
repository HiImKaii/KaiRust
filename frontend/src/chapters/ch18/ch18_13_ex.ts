import { Lesson } from '../../courses';

export const ch18_13_ex: Lesson = {
    id: 'ch18-13-ex',
    title: 'Bài tập 18.13: FFI String Conversion',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về FFI string conversion!</p>`,
    defaultCode: `use std::ffi::CString;
fn main() { let s = CString::new("Hello").unwrap(); println!("{:?}", s); }
`,
    expectedOutput: '"Hello"',
    testCases: [{ input: 'CString', expectedOutput: 'Hello', description: 'CString works' }]
};
