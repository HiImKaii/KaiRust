import { Lesson } from '../../courses';

export const ch15_11_ex: Lesson = {
    id: 'ch15-11-ex',
    title: 'Bài tập 15.11: Derivable traits',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về các deriveable traits!</p>`,
    defaultCode: `#[derive(Debug, Clone, Copy, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1;
    println!("{:?}", p2);
}
`,
    expectedOutput: 'Point { x: 1, y: 2 }',
    testCases: [{ input: 'p2', expectedOutput: 'Point { x: 1, y: 2 }', description: 'Derive Debug works' }]
};
