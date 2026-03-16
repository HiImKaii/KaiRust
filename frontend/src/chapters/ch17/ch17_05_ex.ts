import { Lesson } from '../../courses';

export const ch17_05_ex: Lesson = {
    id: 'ch17-05-ex',
    title: 'Bài tập 17.5: Lifetime Elision',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về lifetime elision!</p>`,
    defaultCode: `fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap()
}

fn main() {
    let s = String::from("Hello World");
    let word = first_word(&s);
    println!("Từ đầu tiên: {}", word);
}
`,
    expectedOutput: 'Từ đầu tiên: Hello',
    testCases: [{ input: 'first_word', expectedOutput: 'Hello', description: 'Lifetime elision works' }]
};
