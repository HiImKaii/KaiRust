import { Lesson } from '../../courses';

export const ch15_09_ex: Lesson = {
    id: 'ch15-09-ex',
    title: 'Bài tập 15.9: Cell<T> vs RefCell<T>',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy so sánh Cell<T> và RefCell<T>!</p>`,
    defaultCode: `use std::cell::{Cell, RefCell};

fn main() {
    let c = Cell::new(5);
    c.set(10);
    println!("Cell value: {}", c.get());

    let r = RefCell::new(5);
    *r.borrow_mut() = 10;
    println!("RefCell value: {}", r.borrow());
}
`,
    expectedOutput: 'Cell value: 10\nRefCell value: 10',
    testCases: [{ input: 'Cell::new(5)', expectedOutput: '10', description: 'Cell and RefCell comparison' }]
};
