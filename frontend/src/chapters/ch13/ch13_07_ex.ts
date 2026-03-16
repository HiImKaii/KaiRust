import { Lesson } from '../../courses';

export const ch13_07_ex: Lesson = {
    id: 'ch13-07-ex',
    title: 'Bài tập 13.7: filter() với closure',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành sử dụng filter() với closure!</p>`,
    defaultCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Lọc số chẵn
    let evens: Vec<&i32> = numbers.iter().filter(|x| *x % 2 == 0).collect();
    println!("Evens: {:?}", evens);

    // Lọc số lẻ
    let odds: Vec<&i32> = numbers.iter().filter(|x| *x % 2 != 0).collect();
    println!("Odds: {:?}", odds);

    // Lọc số lớn hơn 5
    let greater_than_5: Vec<&i32> = numbers.iter().filter(|x| **x > 5).collect();
    println!("Greater than 5: {:?}", greater_than_5);
}
`,
    expectedOutput: 'Evens: [2, 4, 6, 8, 10]\nOdds: [1, 3, 5, 7, 9]\nGreater than 5: [6, 7, 8, 9, 10]',
    testCases: [{ input: 'evens', expectedOutput: '[2, 4, 6, 8, 10]', description: 'Số chẵn' }]
};
