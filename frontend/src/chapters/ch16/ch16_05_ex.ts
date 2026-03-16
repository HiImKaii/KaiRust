import { Lesson } from '../../courses';

export const ch16_05_ex: Lesson = {
    id: 'ch16-05-ex',
    title: 'Bài tập 16.5: Arc for Multiple Ownership',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy sử dụng Arc để cho phép nhiều threads sở hữu dữ liệu!</p>`,
    defaultCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Giá trị cuối cùng: {}", *counter.lock().unwrap());
}
`,
    expectedOutput: 'Giá trị cuối cùng: 10',
    testCases: [{ input: 'Arc::clone', expectedOutput: '10', description: 'Arc works' }]
};
