import { Lesson } from '../../courses';

export const ch15_05_ex: Lesson = {
    id: 'ch15-05-ex',
    title: 'Bài tập 15.5: Rc<T> - Reference Counting',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Rc<T> để cho phép nhiều owners!</p>`,
    defaultCode: `use std::rc::Rc;

fn main() {
    let data = Rc::new(5);
    let a = Rc::clone(&data);
    let b = Rc::clone(&data);
    println!("Giá trị: {}, Số lượng references: {}", data, Rc::strong_count(&data));
}
`,
    expectedOutput: 'Giá trị: 5, Số lượng references: 3',
    testCases: [{ input: 'Rc::strong_count', expectedOutput: '3', description: 'Reference count is 3' }]
};
