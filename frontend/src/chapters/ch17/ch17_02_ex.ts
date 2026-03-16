import { Lesson } from '../../courses';

export const ch17_02_ex: Lesson = {
    id: 'ch17-02-ex',
    title: 'Bài tập 17.2: Lifetime in Structs',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về lifetime trong structs!</p>`,
    defaultCode: `struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = ImportantExcerpt { part: first_sentence };
    println!("Excerpt: {}", excerpt.part);
}
`,
    expectedOutput: 'Excerpt: Call me Ishmael',
    testCases: [{ input: 'excerpt.part', expectedOutput: 'Call me Ishmael', description: 'Struct lifetime works' }]
};
