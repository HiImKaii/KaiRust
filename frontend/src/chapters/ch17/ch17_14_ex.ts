import { Lesson } from '../../courses';

export const ch17_14_ex: Lesson = {
    id: 'ch17-14-ex',
    title: 'Bài tập 17.14: Sized vs dyn Sized',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Sized và dyn Sized!</p>`,
    defaultCode: `trait Calculator { fn calculate(&self, a: i32, b: i32) -> i32; }
struct Add;
impl Calculator for Add { fn calculate(&self, a: i32, b: i32) -> i32 { a + b } }
fn compute<T: Calculator>(calc: &T, a: i32, b: i32) -> i32 { calc.calculate(a, b) }
fn main() { let add = Add {}; println!("{}", compute(&add, 5, 3)); }
`,
    expectedOutput: '8',
    testCases: [{ input: 'calculate', expectedOutput: '8', description: 'Sized works' }]
};
