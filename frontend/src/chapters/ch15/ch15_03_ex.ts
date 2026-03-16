import { Lesson } from '../../courses';

export const ch15_03_ex: Lesson = {
    id: 'ch15-03-ex',
    title: 'Bài tập 15.3: Deref Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Deref trait để tạo smart pointer!</p>`,
    defaultCode: `use std::ops::Deref;

struct MyBox<T>(T);

impl<T> Deref for MyBox<T> {
    type Target = T;
    fn deref(&self) -> &T {
        &self.0
    }
}

fn main() {
    let x = 5;
    let y = MyBox(x);
    assert_eq!(5, *y);
    println!("Dereference thành công: {}", *y);
}
`,
    expectedOutput: 'Dereference thành công: 5',
    testCases: [{ input: '*y', expectedOutput: '5', description: 'Dereference works' }]
};
