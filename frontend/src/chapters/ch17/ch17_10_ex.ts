import { Lesson } from '../../courses';

export const ch17_10_ex: Lesson = {
    id: 'ch17-10-ex',
    title: 'Bài tập 17.10: Object Safe Traits',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về object safe traits!</p>`,
    defaultCode: `trait Pilot { fn fly(&self) -> String; }
struct Airplane;
impl Pilot for Airplane { fn fly(&self) -> String { String::from("Máy bay đang bay") } }
fn main() { let plane = Airplane; println!("{}", plane.fly()); }
`,
    expectedOutput: 'Máy bay đang bay',
    testCases: [{ input: 'fly()', expectedOutput: 'bay', description: 'Object safe trait works' }]
};
