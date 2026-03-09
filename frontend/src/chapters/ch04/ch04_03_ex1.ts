import { Lesson } from '../../courses';

export const ch04_03_ex1: Lesson = {
    id: 'ch04_03_ex1',
    title: 'Bài tập: Sử dụng String Slice',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'String Slice - Từ thứ hai',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Viết hàm second_word trả về slice của từ thứ hai.',
    inputFormat: 'Cho sẵn "Rust Tutorial on Slices"',
    outputFormat: 'In: Tutorial',
    constraints: [
        { field: 'Input', condition: 'Luôn có ít nhất 2 từ' }
    ],
    examples: [
        {
            input: 'Rust Tutorial on Slices',
            output: 'Tutorial'
        }
    ],

    content: `
<p>Tìm từ thứ hai trong chuỗi bằng slice.</p>
`,
    defaultCode: `fn main() {
    let my_string = String::from("Rust Tutorial on Slices");
    let word2 = second_word(&my_string);
    println!("{}", word2);
}

fn second_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    let mut first_space = 0;
    let mut second_space = 0;

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            if first_space == 0 {
                first_space = i;
            } else {
                second_space = i;
                break;
            }
        }
    }

    &s[first_space + 1..second_space]
}
`,
    expectedOutput: 'Tutorial'
};
