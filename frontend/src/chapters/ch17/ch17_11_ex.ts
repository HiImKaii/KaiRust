import { Lesson } from '../../courses';

export const ch17_11_ex: Lesson = {
    id: 'ch17-11-ex',
    title: 'Bài tập 17.11: dyn Trait Syntax',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về dyn trait syntax!</p>`,
    defaultCode: `use std::collections::HashMap;
trait Serializable { fn serialize(&self) -> String; }
struct Point { x: i32, y: i32 }
impl Serializable for Point { fn serialize(&self) -> String { format!("({}, {})", self.x, self.y) } }
fn main() {
    let mut map: HashMap<String, Box<dyn Serializable>> = HashMap::new();
    map.insert("point".to_string(), Box::new(Point { x: 10, y: 20 }));
    println!("{}", map.get("point").unwrap().serialize());
}
`,
    expectedOutput: '(10, 20)',
    testCases: [{ input: 'serialize()', expectedOutput: '(10, 20)', description: 'dyn trait works' }]
};
