import { Lesson } from '../../courses';

export const ch16_04_ex: Lesson = {
    id: 'ch16-04-ex',
    title: 'Bài tập 16.4: Multiple Mutex Guards',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành với nhiều mutex guards!</p>`,
    defaultCode: `use std::sync::Mutex;

fn main() {
    let m1 = Mutex::new(5);
    let m2 = Mutex::new(10);

    {
        let mut n1 = m1.lock().unwrap();
        *n1 = 20;
    }

    {
        let mut n2 = m2.lock().unwrap();
        *n2 = 30;
    }

    println!("m1: {}, m2: {}", *m1.lock().unwrap(), *m2.lock().unwrap());
}
`,
    expectedOutput: 'm1: 20, m2: 30',
    testCases: [{ input: 'm1.lock()', expectedOutput: '20', description: 'Multiple mutex works' }]
};
