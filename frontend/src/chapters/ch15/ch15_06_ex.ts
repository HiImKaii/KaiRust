import { Lesson } from '../../courses';

export const ch15_06_ex: Lesson = {
    id: 'ch15-06-ex',
    title: 'Bài tập 15.6: Rc trong List',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy sử dụng Rc<T> để tạo shared ownership trong một list!</p>`,
    defaultCode: `use std::rc::Rc;

enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
    println!("Tạo shared list thành công");
}
`,
    expectedOutput: 'Tạo shared list thành công',
    testCases: [{ input: 'Rc::clone', expectedOutput: 'Cons', description: 'Shared list created' }]
};
