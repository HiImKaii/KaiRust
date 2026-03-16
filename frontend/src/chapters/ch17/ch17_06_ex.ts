import { Lesson } from '../../courses';

export const ch17_06_ex: Lesson = {
    id: 'ch17-06-ex',
    title: 'Bài tập 17.6: Methods with Lifetimes',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về methods với lifetimes!</p>`,
    defaultCode: `struct Holder<'a> {
    data: &'a str,
}

impl<'a> Holder<'a> {
    fn announce_and_return(&self, announcement: &str) -> &str {
        println!("{}", announcement);
        self.data
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let holder = Holder { data: &novel };
    let result = holder.announce_and_return("Hello");
    println!("Result: {}", result);
}
`,
    expectedOutput: 'Hello',
    testCases: [{ input: 'holder.announce_and_return', expectedOutput: 'Hello', description: 'Method with lifetime works' }]
};
