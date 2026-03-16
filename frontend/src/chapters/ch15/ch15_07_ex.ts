import { Lesson } from '../../courses';

export const ch15_07_ex: Lesson = {
    id: 'ch15-07-ex',
    title: 'Bài tập 15.7: RefCell<T> cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về RefCell<T> - cho phép borrowing tại runtime!</p>`,
    defaultCode: `use std::cell::RefCell;

fn main() {
    let x = RefCell::new(5);
    let mut y = x.borrow_mut();
    *y = 10;
    println!("Giá trị: {}", x.borrow());
}
`,
    expectedOutput: 'Giá trị: 10',
    testCases: [{ input: 'x.borrow()', expectedOutput: '10', description: 'Value updated to 10' }]
};
