import { Lesson } from '../../courses';

export const ch16_01_ex: Lesson = {
    id: 'ch16-01-ex',
    title: 'Bài tập 16.1: Spawning Threads',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành với spawning threads trong Rust!</p>`,
    defaultCode: `use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread: {}", i);
            thread::sleep(Duration::from_millis(100));
        }
    });

    for i in 1..=3 {
        println!("Main: {}", i);
        thread::sleep(Duration::from_millis(100));
    }

    handle.join().unwrap();
}
`,
    expectedOutput: 'Main: 1',
    testCases: [{ input: 'thread::spawn', expectedOutput: 'Thread', description: 'Thread spawned' }]
};
