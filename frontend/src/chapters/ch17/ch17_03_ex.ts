import { Lesson } from '../../courses';

export const ch17_03_ex: Lesson = {
    id: 'ch17-03-ex',
    title: 'Bài tập 17.3: Multiple Lifetimes',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về nhiều lifetimes!</p>`,
    defaultCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("Hello World");
    let result;
    {
        let string2 = String::from("Hi");
        result = longest(&string1, &string2);
    }
    println!("{}", result);
}
`,
    expectedOutput: 'Hello World',
    testCases: [{ input: 'longest', expectedOutput: 'Hello World', description: 'Multiple lifetimes work' }]
};
