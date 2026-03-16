import { Lesson } from '../../courses';

export const ch16_11_ex: Lesson = {
    id: 'ch16-11-ex',
    title: 'Bài tập 16.11: Atomic Types',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về atomic types!</p>`,
    defaultCode: `use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;

fn main() {
    let counter = AtomicUsize::new(0);

    let handles: Vec<_> = (0..5).map(|_| {
        thread::spawn(|| {
            for _ in 0..1000 {
                counter.fetch_add(1, Ordering::SeqCst);
            }
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Giá trị: {}", counter.load(Ordering::SeqCst));
}
`,
    expectedOutput: 'Giá trị: 5000',
    testCases: [{ input: 'counter.load', expectedOutput: '5000', description: 'Atomic works' }]
};
