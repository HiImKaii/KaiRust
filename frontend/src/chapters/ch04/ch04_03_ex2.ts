import { Lesson } from '../../courses';

export const ch04_03_ex2: Lesson = {
    id: 'ch04_03_ex2',
    title: 'Bài tập: Sử dụng Array Slice',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Array Slice',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Tính tổng 5 phần tử giữa mảng [1..10] (từ index 2 đến 6).',
    inputFormat: 'Cho sẵn mảng [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
    outputFormat: 'In tổng: 25',
    constraints: [
        { field: 'Slice', condition: 'Từ index 2 đến 6' }
    ],
    examples: [
        {
            input: '[1,2,3,4,5,6,7,8,9,10]',
            output: '25'
        }
    ],

    content: `
<p>Array slice trỏ đến một đoạn của mảng.</p>
`,
    defaultCode: `fn main() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let middle_slice = &numbers[2..7];
    sum_array(middle_slice);
}

fn sum_array(slice: &[i32]) {
    let mut sum = 0;
    for &num in slice {
        sum += num;
    }
    println!("{}", sum);
}
`,
    expectedOutput: '25'
};
