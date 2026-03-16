import { Lesson } from '../../courses';

export const ch17_13_ex: Lesson = {
    id: 'ch17-13-ex',
    title: 'Bài tập 17.13: Returning dyn Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy trả về dyn trait!</p>`,
    defaultCode: `trait Stringifier { fn to_string(&self) -> String; }
struct Person { name: String }
struct Number(i32);
impl Stringifier for Person { fn to_string(&self) -> String { format!("Person: {}", self.name) } }
impl Stringifier for Number { fn to_string(&self) -> String { format!("Number: {}", self.0) } }
fn factory<T: Stringifier + 'static>(val: T) -> Box<dyn Stringifier> { Box::new(val) }
fn main() { let p = factory(Person { name: String::from("Alice") }); println!("{}", p.to_string()); }
`,
    expectedOutput: 'Person: Alice',
    testCases: [{ input: 'to_string()', expectedOutput: 'Alice', description: 'Returning dyn trait works' }]
};
