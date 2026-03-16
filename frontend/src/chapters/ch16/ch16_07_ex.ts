import { Lesson } from '../../courses';

export const ch16_07_ex: Lesson = {
    id: 'ch16-07-ex',
    title: 'Bài tập 16.7: Multiple Producers',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tạo nhiều producers với channels!</p>`,
    defaultCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        tx1.send("Từ thread 1".to_string()).unwrap();
    });

    thread::spawn(move || {
        tx.send("Từ thread 2".to_string()).unwrap();
    });

    for msg in rx {
        println!("Nhận: {}", msg);
    }
}
`,
    expectedOutput: 'Nhận: Từ thread 1',
    testCases: [{ input: 'tx.clone()', expectedOutput: 'Nhận', description: 'Multiple producers work' }]
};
