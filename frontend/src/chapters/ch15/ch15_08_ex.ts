import { Lesson } from '../../courses';

export const ch15_08_ex: Lesson = {
    id: 'ch15-08-ex',
    title: 'Bài tập 15.8: Rc<RefCell<T>> Pattern',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy kết hợp Rc<T> và RefCell<T> để có mutable shared data!</p>`,
    defaultCode: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));
    let a = Rc::clone(&value);
    let b = Rc::clone(&value);

    *value.borrow_mut() += 10;
    println!("Giá trị: {}", value.borrow());
}
`,
    expectedOutput: 'Giá trị: 15',
    testCases: [{ input: 'value.borrow()', expectedOutput: '15', description: 'Value is 15' }]
};
