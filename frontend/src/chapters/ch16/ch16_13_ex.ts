import { Lesson } from '../../courses';

export const ch16_13_ex: Lesson = {
    id: 'ch16-13-ex',
    title: 'Bài tập 16.13: Barrier for Synchronization',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Barrier để đồng bộ hóa!</p>`,
    defaultCode: `use std::sync::{Arc, Barrier};
use std::thread;

fn main() {
    let barrier = Arc::new(Barrier::new(3));
    let mut handles = vec![];

    for i in 0..3 {
        let b = barrier.clone();
        let handle = thread::spawn(move || {
            println!("Thread {} bắt đầu", i);
            b.wait();
            println!("Thread {} tiếp tục", i);
        });
        handles.push(handle);
    }

    for h in handles {
        h.join().unwrap();
    }
}
`,
    expectedOutput: 'Thread 0 bắt đầu',
    testCases: [{ input: 'Barrier::new', expectedOutput: 'bắt đầu', description: 'Barrier works' }]
};
