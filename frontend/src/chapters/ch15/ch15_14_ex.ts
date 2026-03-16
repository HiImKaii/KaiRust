import { Lesson } from '../../courses';

export const ch15_14_ex: Lesson = {
    id: 'ch15-14-ex',
    title: 'Bài tập 15.14: Trait Bounds with Generics',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy sử dụng trait bounds với generics!</p>`,
    defaultCode: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("Số lớn nhất: {}", result);
}
`,
    expectedOutput: 'Số lớn nhất: 100',
    testCases: [{ input: 'largest(&numbers)', expectedOutput: '100', description: 'Largest is 100' }]
};
