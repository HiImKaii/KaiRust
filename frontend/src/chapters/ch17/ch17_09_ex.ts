import { Lesson } from '../../courses';

export const ch17_09_ex: Lesson = {
    id: 'ch17-09-ex',
    title: 'Bài tập 17.9: Trait Object with Return Type',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy trả về trait object từ function!</p>`,
    defaultCode: `trait Animal { fn speak(&self) -> String; }
struct Dog;
struct Cat;
impl Animal for Dog { fn speak(&self) -> String { String::from("Woof!") } }
impl Animal for Cat { fn speak(&self) -> String { String::from("Meow!") } }
fn create_animal(s: &str) -> Box<dyn Animal> {
    if s == "dog" { Box::new(Dog) } else { Box::new(Cat) }
}
fn main() {
    let dog = create_animal("dog");
    println!("{}", dog.speak());
}
`,
    expectedOutput: 'Woof!',
    testCases: [{ input: 'speak()', expectedOutput: 'Woof!', description: 'Return trait object works' }]
};
