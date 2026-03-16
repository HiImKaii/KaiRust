import { Lesson } from '../../courses';

export const ch16_03_ex: Lesson = {
    id: 'ch16-03-ex',
    title: 'Bài tập 16.3: Using Mutex for Shared Data',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy sử dụng Mutex để chia sẻ dữ liệu giữa các threads!</p>`,
    defaultCode: `use std::sync::Mutex;
use std::thread;

fn main() {
    let counter = Mutex::new(0);

    let mut handles = vec![];
    for _ in 0..10 {
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
    testCases: [{ input: 'counter.lock()', expectedOutput: '10', description: 'Mutex works' }]
};
