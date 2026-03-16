import { Lesson } from '../../courses';

export const ch17_07_ex: Lesson = {
    id: 'ch17-07-ex',
    title: 'Bài tập 17.7: Generic Types, Bounds, and Lifetimes',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy kết hợp generics, bounds và lifetimes!</p>`,
    defaultCode: `use std::fmt::Display;

fn longest_with_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: Display,
{
    println!("Announcement: {}", ann);
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let result = longest_with_announcement("Hello", "World", "So sánh");
    println!("Kết quả: {}", result);
}
`,
    expectedOutput: 'Announcement: So sánh',
    testCases: [{ input: 'longest_with_announcement', expectedOutput: 'Kết quả', description: 'Generic with lifetime works' }]
};
