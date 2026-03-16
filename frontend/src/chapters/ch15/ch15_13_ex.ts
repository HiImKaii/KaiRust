import { Lesson } from '../../courses';

export const ch15_13_ex: Lesson = {
    id: 'ch15-13-ex',
    title: 'Bài tập 15.13: Trait Objects and Dyn Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về trait objects với dyn trait!</p>`,
    defaultCode: `trait Draw {
    fn draw(&self);
}

struct Circle {
    radius: i32,
}

struct Square {
    side: i32,
}

impl Draw for Circle {
    fn draw(&self) {
        println!("Vẽ hình tròn với bán kính {}", self.radius);
    }
}

impl Draw for Square {
    fn draw(&self) {
        println!("Vẽ hình vuông với cạnh {}", self.side);
    }
}

fn draw_all(items: Vec<&dyn Draw>) {
    for item in items {
        item.draw();
    }
}

fn main() {
    let circle = Circle { radius: 5 };
    let square = Square { side: 10 };
    let shapes: Vec<&dyn Draw> = vec![&circle, &square];
    draw_all(shapes);
}
`,
    expectedOutput: 'Vẽ hình tròn với bán kính 5\nVẽ hình vuông với cạnh 10',
    testCases: [{ input: 'draw()', expectedOutput: 'Vẽ', description: 'Draw trait works' }]
};
