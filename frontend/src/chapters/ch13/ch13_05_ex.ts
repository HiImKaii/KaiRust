import { Lesson } from '../../courses';

export const ch13_05_ex: Lesson = {
    id: 'ch13-05-ex',
    title: 'Bài tập 13.5: Closure returning closure',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành closure trả về closure!</p>`,
    defaultCode: `fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

fn main() {
    let add_5 = make_adder(5);
    let add_10 = make_adder(10);
    let add_100 = make_adder(100);

    println!("5 + 3 = {}", add_5(3));
    println!("10 + 7 = {}", add_10(7));
    println!("100 + 50 = {}", add_100(50));
}
`,
    expectedOutput: '5 + 3 = 8\n10 + 7 = 17\n100 + 50 = 150',
    testCases: [{ input: 'add_5(3)', expectedOutput: '8', description: '5 + 3 = 8' }]
};
