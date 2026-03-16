import { Lesson } from '../../courses';

export const ch16_12_ex: Lesson = {
    id: 'ch16-12-ex',
    title: 'Bài tập 16.12: Thread Local Storage',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về thread local storage!</p>`,
    defaultCode: `use std::cell::Cell;
use std::thread;

thread_local!(static COUNTER: Cell<i32> = Cell::new(0));

fn main() {
    let handle = thread::spawn(|| {
        COUNTER.with(|c| {
            c.set(10);
            println!("Thread local: {}", c.get());
        });
    });

    handle.join().unwrap();
    COUNTER.with(|c| {
        println!("Main thread local: {}", c.get());
    });
}
`,
    expectedOutput: 'Thread local: 10',
    testCases: [{ input: 'COUNTER.with', expectedOutput: '10', description: 'Thread local works' }]
};
