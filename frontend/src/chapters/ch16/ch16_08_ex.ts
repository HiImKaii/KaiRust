import { Lesson } from '../../courses';

export const ch16_08_ex: Lesson = {
    id: 'ch16-08-ex',
    title: 'Bài tập 16.8: Iterating over Messages',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy iterate qua các messages từ channel!</p>`,
    defaultCode: `use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        for i in 1..=5 {
            tx.send(i).unwrap();
            thread::sleep(Duration::from_millis(100));
        }
    });

    for msg in rx {
        println!("Nhận: {}", msg);
    }
}
`,
    expectedOutput: 'Nhận: 1',
    testCases: [{ input: 'rx', expectedOutput: 'Nhận', description: 'Message iteration works' }]
};
