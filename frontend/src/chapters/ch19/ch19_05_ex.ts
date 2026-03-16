import { Lesson } from '../../courses';
export const ch19_05_ex: Lesson = { id: 'ch19-05-ex', title: 'Bài tập 19.5', duration: '15 phút', type: 'practice', isExercise: true, content: '<p>if let</p>', defaultCode: `fn main() { if let Some(x) = Some(5) { println!("{}", x); } }`, expectedOutput: '5', testCases: [{ input: 'x', expectedOutput: '5' }] };
