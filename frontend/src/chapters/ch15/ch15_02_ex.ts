import { Lesson } from '../../courses';

export const ch15_02_ex: Lesson = {
    id: 'ch15-02-ex',
    title: 'Bài tập 15.2: Box trong List',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tạo một Linked List sử dụng Box<T>!</p>`,
    defaultCode: `enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    println!("Đã tạo Linked List");
}
`,
    expectedOutput: 'Đã tạo Linked List',
    testCases: [{ input: 'Cons(1, Box::new(Cons(2, Box::new(Nil))))', expectedOutput: 'Cons', description: 'Linked List created' }]
};
