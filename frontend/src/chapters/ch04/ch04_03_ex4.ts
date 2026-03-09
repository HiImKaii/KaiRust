import { Lesson } from '../../courses';

export const ch04_03_ex4: Lesson = {
    id: 'ch04_03_ex4',
    title: 'Bài tập: Tokenizer - Đếm Từ',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Tokenizer - Đếm Từ',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Đếm số tokens trong chuỗi code.',
    inputFormat: 'Cho sẵn "   let  x =    100   ;  "',
    outputFormat: 'In số tokens: 5',
    constraints: [
        { field: 'Input', condition: 'Chuỗi có thể có nhiều khoảng trắng' }
    ],
    examples: [
        {
            input: 'let x = 100 ;',
            output: '5'
        }
    ],

    content: `
<p>Đếm số tokens trong chuỗi code.</p>
`,
    defaultCode: `fn main() {
    let source_code = "   let  x =    100   ;  ";
    let token_count = count_tokens(source_code);
    println!("{}", token_count);
}

fn count_tokens(s: &str) -> usize {
    let bytes = s.as_bytes();
    let mut count = 0;
    let mut in_word = false;

    for &item in bytes.iter() {
        if item == b' ' {
            in_word = false;
        } else if !in_word {
            count += 1;
            in_word = true;
        }
    }

    count
}
`,
    expectedOutput: '5'
};
