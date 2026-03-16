import { Lesson } from '../../courses';

export const ch19_07_ex: Lesson = {
    id: 'ch19-07-ex',
    title: 'Bài tập 19.7',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>for let</p>',
    defaultCode: `fn main() { for (i, v) in vec![1,2,3].iter().enumerate() { println!("{} {}", i, v); } }`,
    expectedOutput: '0 1',
    testCases: [{ input: 'i', expectedOutput: '0' }]
};

export const ch19_08_ex: Lesson = {
    id: 'ch19-08-ex',
    title: 'Bài tập 19.8',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Multiple</p>',
    defaultCode: `fn main() { let x = 2; match x { 1|2|3 => println!("1-3"), _ => println!("Other") } }`,
    expectedOutput: '1-3',
    testCases: [{ input: 'x', expectedOutput: '1-3' }]
};

export const ch19_09_ex: Lesson = {
    id: 'ch19-09-ex',
    title: 'Bài tập 19.9',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Destructuring</p>',
    defaultCode: `struct Point { x: i32, y: i32 }\nfn main() { let p = Point { x: 10, y: 20 }; let Point { x, y } = p; println!("{} {}", x, y); }`,
    expectedOutput: '10 20',
    testCases: [{ input: 'x', expectedOutput: '10' }]
};
