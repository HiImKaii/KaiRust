import { Lesson } from '../../courses';

export const ch16_09_ex: Lesson = {
    id: 'ch16-09-ex',
    title: 'Bài tập 16.9: Send Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Send trait!</p>`,
    defaultCode: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("Thread hoạt động");
    });
    handle.join().unwrap();
}
`,
    expectedOutput: 'Thread hoạt động',
    testCases: [{ input: 'thread::spawn', expectedOutput: 'Thread hoạt động', description: 'Send trait works' }]
};
