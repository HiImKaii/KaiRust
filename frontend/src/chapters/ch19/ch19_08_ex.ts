import { Lesson } from '../../courses';

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

export const ch19_14_ex: Lesson = {
    id: 'ch19-14-ex',
    title: 'Bài tập 19.14',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Struct binding</p>',
    defaultCode: `struct Point { x: i32, y: i32 }\nfn main() { let p = Point { x: 5, y: 10 }; match p { Point { x, y: 10 } => println!("{}", x), _ => println!("Other") } }`,
    expectedOutput: '5',
    testCases: [{ input: 'x', expectedOutput: '5' }]
};

export const ch19_15_ex: Lesson = {
    id: 'ch19-15-ex',
    title: 'Bài tập 19.15',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Match returns</p>',
    defaultCode: `fn main() { let x = 5; let r = match x { 1 => "One", _ => "Other" }; println!("{}", r); }`,
    expectedOutput: 'Other',
    testCases: [{ input: 'r', expectedOutput: 'Other' }]
};
