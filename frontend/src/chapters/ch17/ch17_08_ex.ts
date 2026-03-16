import { Lesson } from '../../courses';

export const ch17_08_ex: Lesson = {
    id: 'ch17-08-ex',
    title: 'Bài tập 17.8: Trait Objects Basics',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về trait objects!</p>`,
    defaultCode: `trait Draw {
    fn draw(&self);
}

struct Circle { radius: f64 }
struct Square { side: f64 }

impl Draw for Circle {
    fn draw(&self) { println!("Vẽ hình tròn"); }
}

impl Draw for Square {
    fn draw(&self) { println!("Vẽ hình vuông"); }
}

fn main() {
    let shapes: Vec<Box<dyn Draw>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Square { side: 10.0 }),
    ];
    for shape in shapes { shape.draw(); }
}
`,
    expectedOutput: 'Vẽ hình tròn',
    testCases: [{ input: 'Box::new', expectedOutput: 'Vẽ', description: 'Trait object works' }]
};
