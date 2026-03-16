import { Lesson } from '../../courses';

export const ch14_02_ex: Lesson = {
    id: 'ch14-02-ex',
    title: 'Bài tập 14.2: into_iter()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành with into_iter()!</p>`,
    defaultCode: `fn main() {
    let v = vec![1, 2, 3];
    for val in v.into_iter() {
        println!("{}", val);
    }
}
`,
    expectedOutput: '1\n2\n3',
    testCases: [{ input: 'val', expectedOutput: '1', description: 'Value' }]
};

export const ch14_03_ex: Lesson = {
    id: 'ch14-03-ex',
    title: 'Bài tập 14.3: iter() vs iter_mut()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành iter() vs iter_mut()!</p>`,
    defaultCode: `fn main() {
    let mut v = vec![1, 2, 3];
    for val in v.iter_mut() {
        *val *= 2;
    }
    println!("{:?}", v);
}
`,
    expectedOutput: '[2, 4, 6]',
    testCases: [{ input: 'v', expectedOutput: '[2, 4, 6]', description: 'Doubled' }]
};

export const ch14_04_ex: Lesson = {
    id: 'ch14-04-ex',
    title: 'Bài tập 14.4: Iterator adapters',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành Iterator adapters!</p>`,
    defaultCode: `fn main() {
    let v: Vec<i32> = (1..=5).collect();
    println!("{:?}", v);
}
`,
    expectedOutput: '[1, 2, 3, 4, 5]',
    testCases: [{ input: 'v', expectedOutput: '[1, 2, 3, 4, 5]', description: 'Range to vec' }]
};

export const ch14_05_ex: Lesson = {
    id: 'ch14-05-ex',
    title: 'Bài tập 14.5: take() và skip()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành take() và skip()!</p>`,
    defaultCode: `fn main() {
    let v: Vec<i32> = (1..=10).take(5).collect();
    println!("Take 5: {:?}", v);
}
`,
    expectedOutput: 'Take 5: [1, 2, 3, 4, 5]',
    testCases: [{ input: 'v', expectedOutput: '[1, 2, 3, 4, 5]', description: 'Take 5' }]
};

export const ch14_06_ex: Lesson = {
    id: 'ch14-06-ex',
    title: 'Bài tập 14.6: enumerate()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành enumerate()!</p>`,
    defaultCode: `fn main() {
    let v = vec!["a", "b", "c"];
    for (i, val) in v.iter().enumerate() {
        println!("{}: {}", i, val);
    }
}
`,
    expectedOutput: '0: a\n1: b\n2: c',
    testCases: [{ input: 'i', expectedOutput: '0', description: 'Index' }]
};

export const ch14_07_ex: Lesson = {
    id: 'ch14-07-ex',
    title: 'Bài tập 14.7: cycle()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành cycle()!</p>`,
    defaultCode: `fn main() {
    let v: Vec<i32> = vec![1, 2].into_iter().cycle().take(6).collect();
    println!("{:?}", v);
}
`,
    expectedOutput: '[1, 2, 1, 2, 1, 2]',
    testCases: [{ input: 'v', expectedOutput: '[1, 2, 1, 2, 1, 2]', description: 'Cycle' }]
};

export const ch14_08_ex: Lesson = {
    id: 'ch14-08-ex',
    title: 'Bài tập 14.8: rev()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành rev()!</p>`,
    defaultCode: `fn main() {
    let v: Vec<i32> = (1..=5).rev().collect();
    println!("{:?}", v);
}
`,
    expectedOutput: '[5, 4, 3, 2, 1]',
    testCases: [{ input: 'v', expectedOutput: '[5, 4, 3, 2, 1]', description: 'Reversed' }]
};

export const ch14_09_ex: Lesson = {
    id: 'ch14-09-ex',
    title: 'Bài tập 14.9: sum() và product()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành sum() và product()!</p>`,
    defaultCode: `fn main() {
    let sum: i32 = (1..=5).sum();
    let product: i32 = (1..=5).product();
    println!("Sum: {}", sum);
    println!("Product: {}", product);
}
`,
    expectedOutput: 'Sum: 15\nProduct: 120',
    testCases: [{ input: 'sum', expectedOutput: '15', description: 'Sum' }]
};

export const ch14_10_ex: Lesson = {
    id: 'ch14-10-ex',
    title: 'Bài tập 14.10: inspect()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành inspect()!</p>`,
    defaultCode: `fn main() {
    let v: Vec<i32> = (1..=3).inspect(|x| println!("Before: {}", x)).map(|x| x * 2).collect();
    println!("{:?}", v);
}
`,
    expectedOutput: 'Before: 1\nBefore: 2\nBefore: 3\n[2, 4, 6]',
    testCases: [{ input: 'v', expectedOutput: '[2, 4, 6]', description: 'Doubled' }]
};

export const ch14_11_ex: Lesson = {
    id: 'ch14-11-ex',
    title: 'Bài tập 14.11: partition()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành partition()!</p>`,
    defaultCode: `fn main() {
    let (evens, odds): (Vec<i32>, Vec<i32>) = (1..=10).partition(|&x| x % 2 == 0);
    println!("Evens: {:?}", evens);
    println!("Odds: {:?}", odds);
}
`,
    expectedOutput: 'Evens: [2, 4, 6, 8, 10]\nOdds: [1, 3, 5, 7, 9]',
    testCases: [{ input: 'evens', expectedOutput: '[2, 4, 6, 8, 10]', description: 'Evens' }]
};

export const ch14_12_ex: Lesson = {
    id: 'ch14-12-ex',
    title: 'Bài tập 14.12: peekable()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành peekable()!</p>`,
    defaultCode: `fn main() {
    let mut iter = vec![1, 2, 3].into_iter().peekable();
    println!("{:?}", iter.peek());
    println!("{:?}", iter.peek());
    println!("{:?}", iter.next());
}
`,
    expectedOutput: 'Some(1)\nSome(1)\nSome(1)',
    testCases: [{ input: 'peek', expectedOutput: 'Some(1)', description: 'Peek' }]
};

export const ch14_13_ex: Lesson = {
    id: 'ch14-13-ex',
    title: 'Bài tập 14.13: Chain',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành chain()!</p>`,
    defaultCode: `fn main() {
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];
    let c: Vec<i32> = a.into_iter().chain(b.into_iter()).collect();
    println!("{:?}", c);
}
`,
    expectedOutput: '[1, 2, 3, 4, 5, 6]',
    testCases: [{ input: 'c', expectedOutput: '[1, 2, 3, 4, 5, 6]', description: 'Chained' }]
};

export const ch14_14_ex: Lesson = {
    id: 'ch14-14-ex',
    title: 'Bài tập 14.14: cloned()',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành clonned()!</p>`,
    defaultCode: `fn main() {
    let v = vec![&1, &2, &3];
    let c: Vec<i32> = v.into_iter().cloned().collect();
    println!("{:?}", c);
}
`,
    expectedOutput: '[1, 2, 3]',
    testCases: [{ input: 'c', expectedOutput: '[1, 2, 3]', description: 'Cloned' }]
};

export const ch14_15_ex: Lesson = {
    id: 'ch14-15-ex',
    title: 'Bài tập 14.15: Tổng hợp Iterator',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tổng hợp Iterator!</p>`,
    defaultCode: `fn main() {
    let result: i32 = (1..=100).filter(|&x| x % 3 == 0).sum();
    println!("Sum of multiples of 3: {}", result);
}
`,
    expectedOutput: 'Sum of multiples of 3: 1683',
    testCases: [{ input: 'result', expectedOutput: '1683', description: 'Sum' }]
};
