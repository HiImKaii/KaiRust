import { Lesson } from '../../courses';

export const ch15_01_ex: Lesson = {
    id: 'ch15-01-ex',
    title: 'Bài tập 15.1: Box<T> cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành với Box<T> - smart pointer cơ bản nhất trong Rust!</p>`,
    defaultCode: `fn main() {
    let b = Box::new(5);
    println!("Giá trị trong Box: {}", b);
}
`,
    expectedOutput: 'Giá trị trong Box: 5',
    testCases: [{ input: 'Box::new(5)', expectedOutput: '5', description: 'Box contains value 5' }]
};
