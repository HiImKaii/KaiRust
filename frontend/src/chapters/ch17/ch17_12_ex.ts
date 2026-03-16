import { Lesson } from '../../courses';

export const ch17_12_ex: Lesson = {
    id: 'ch17-12-ex',
    title: 'Bài tập 17.12: Function with dyn Trait Parameter',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy truyền dyn trait vào function!</p>`,
    defaultCode: `trait Describable { fn describe(&self) -> String; }
struct Book { title: String, pages: u32 }
impl Describable for Book { fn describe(&self) -> String { format!("{} - {} trang", self.title, self.pages) } }
fn print_description(item: &dyn Describable) { println!("{}", item.describe()); }
fn main() { let book = Book { title: String::from("Rust Programming"), pages: 350 }; print_description(&book); }
`,
    expectedOutput: 'Rust Programming',
    testCases: [{ input: 'describe()', expectedOutput: 'Rust Programming', description: 'dyn trait parameter works' }]
};
