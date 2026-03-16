import { Lesson } from '../../courses';

export const ch16_02_ex: Lesson = {
    id: 'ch16-02-ex',
    title: 'Bài tập 16.2: Moving Data to Threads',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về move semantics trong threads!</p>`,
    defaultCode: `use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Vector: {:?}", v);
    });

    handle.join().unwrap();
}
`,
    expectedOutput: 'Vector: [1, 2, 3]',
    testCases: [{ input: 'move', expectedOutput: 'Vector', description: 'Move works' }]
};
