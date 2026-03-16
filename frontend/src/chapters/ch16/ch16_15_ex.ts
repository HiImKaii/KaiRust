import { Lesson } from '../../courses';

export const ch16_15_ex: Lesson = {
    id: 'ch16-15-ex',
    title: 'Bài tập 16.15: OnceLock for Initialization',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về OnceLock!</p>`,
    defaultCode: `use std::sync::OnceLock;
use std::thread;

static INIT: OnceLock<i32> = OnceLock::new();

fn get_value() -> &'static i32 {
    INIT.get_or_init(|| {
        println!("Khởi tạo một lần");
        42
    })
}

fn main() {
    let h1 = thread::spawn(|| {
        println!("Thread 1: {}", get_value());
    });

    let h2 = thread::spawn(|| {
        println!("Thread 2: {}", get_value());
    });

    h1.join().unwrap();
    h2.join().unwrap();
}
`,
    expectedOutput: 'Khởi tạo một lần',
    testCases: [{ input: 'get_value()', expectedOutput: '42', description: 'OnceLock works' }]
};
