import { Lesson } from '../../courses';

export const ch16_10_ex: Lesson = {
    id: 'ch16-10-ex',
    title: 'Bài tập 16.10: Sync Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Sync trait!</p>`,
    defaultCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..3).map(|_| {
        let data = Arc::clone(&data);
        thread::spawn(move || {
            let mut d = data.lock().unwrap();
            *d += 1;
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Kết quả: {}", *data.lock().unwrap());
}
`,
    expectedOutput: 'Kết quả: 3',
    testCases: [{ input: 'Arc::clone', expectedOutput: '3', description: 'Sync trait works' }]
};
