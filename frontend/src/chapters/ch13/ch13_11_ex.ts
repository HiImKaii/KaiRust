import { Lesson } from '../../courses';

export const ch13_11_ex: Lesson = {
    id: 'ch13-11-ex',
    title: 'Bài tập 13.11: find() và position()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành find() và position()!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Tìm phần tử đầu tiên > 3
    let found = numbers.iter().find(|&&x| x > 3);
    println!("First > 3: {:?}", found);

    // Tìm vị trí
    let pos = numbers.iter().position(|&&x| x == 3);
    println!("Position of 3: {:?}", pos);
}
`,
    expectedOutput: 'First > 3: Some(4)\nPosition of 3: Some(2)',
    testCases: [{ input: 'found', expectedOutput: 'Some(4)', description: 'First > 3' }]
};
