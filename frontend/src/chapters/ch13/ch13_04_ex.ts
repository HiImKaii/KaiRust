import { Lesson } from '../../courses';

export const ch13_04_ex: Lesson = {
    id: 'ch13-04-ex',
    title: 'Bài tập 13.4: Closure as parameter',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành truyền closure như parameter!</p>`,
    defaultCode: `fn apply<F>(x: i32, f: F) -> i32
where F: Fn(i32) -> i32 {
    f(x)
}

fn main() {
    let double = |n: i32| n * 2;
    let square = |n: i32| n * n;

    println!("Double of 5: {}", apply(5, double));
    println!("Square of 5: {}", apply(5, square));

    let add_10 = |n: i32| n + 10;
    println!("Add 10 to 5: {}", apply(5, add_10));
}
`,
    expectedOutput: 'Double of 5: 10\nSquare of 5: 25\nAdd 10 to 5: 15',
    testCases: [{ input: 'apply(5, double)', expectedOutput: '10', description: '5 * 2 = 10' }]
};
