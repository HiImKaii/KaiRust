import { Lesson } from '../../courses';

export const ch17_01_ex: Lesson = {
    id: 'ch17-01-ex',
    title: 'Bài tập 17.1: Basic Lifetime Annotation',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về lifetime annotations!</p>`,
    defaultCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("Hello");
    let result;
    {
        let string2 = String::from("World!");
        result = longest(&string1, &string2);
    }
    println!("Chuỗi dài nhất: {}", result);
}
`,
    expectedOutput: 'Chuỗi dài nhất: World!',
    testCases: [{ input: 'longest', expectedOutput: 'World!', description: 'Lifetime works' }]
};
