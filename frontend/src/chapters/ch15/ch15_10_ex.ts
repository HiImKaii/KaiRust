import { Lesson } from '../../courses';

export const ch15_10_ex: Lesson = {
    id: 'ch15-10-ex',
    title: 'Bài tập 15.10: Interior Mutability - Monitor',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tạo một cấu trúc với interior mutability!</p>`,
    defaultCode: `use std::cell::RefCell;

struct Monitor {
    value: RefCell<i32>,
}

impl Monitor {
    fn new() -> Self {
        Monitor { value: RefCell::new(0) }
    }
    fn update(&self, v: i32) {
        *self.value.borrow_mut() = v;
    }
    fn get(&self) -> i32 {
        *self.value.borrow()
    }
}

fn main() {
    let m = Monitor::new();
    m.update(100);
    println!("Giá trị: {}", m.get());
}
`,
    expectedOutput: 'Giá trị: 100',
    testCases: [{ input: 'm.get()', expectedOutput: '100', description: 'Monitor value is 100' }]
};
