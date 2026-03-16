import { Lesson } from '../../courses';
export const ch19_02_ex: Lesson = { id: 'ch19-02-ex', title: 'Bài tập 19.2', duration: '15 phút', type: 'practice', isExercise: true, content: '<p>Pattern</p>', defaultCode: `fn main() { let x = 5; match x { 1..=5 => println!("1-5"), _ => println!("Other") } }`, expectedOutput: '1-5', testCases: [{ input: 'x', expectedOutput: '1-5' }] };
