import { Lesson } from '../../courses';
export const ch19_11_ex: Lesson = { id: 'ch19-11-ex', title: 'Bài tập 19.11', duration: '15 phút', type: 'practice', isExercise: true, content: '<p>Tuple</p>', defaultCode: `fn main() { let t = (1,2,3); match t { (a,b,c) => println!("{} {} {}", a,b,c) } }`, expectedOutput: '1 2 3', testCases: [{ input: 't', expectedOutput: '1 2 3' }] };
