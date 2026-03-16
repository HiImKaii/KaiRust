import { Lesson } from '../../courses';

export const ch16_06_ex: Lesson = {
    id: 'ch16-06-ex',
    title: 'Bài tập 16.6: Message Passing with Channels',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về message passing với channels!</p>`,
    defaultCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Hello from thread".to_string()).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Nhận được: {}", received);
}
`,
    expectedOutput: 'Nhận được: Hello from thread',
    testCases: [{ input: 'rx.recv()', expectedOutput: 'Hello', description: 'Channel works' }]
};
