import { Lesson } from '../../courses';

export const ch04_03_ex5: Lesson = {
    id: 'ch04_03_ex5',
    title: 'Bài tập: Text Alignment & Trimming Mini',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Đếm từ dài',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Đếm số từ có độ dài >= n trong câu.',
    inputFormat: 'Cho sẵn "Rust is blazingly fast and memory efficient", n=4',
    outputFormat: 'In số từ: 5',
    constraints: [
        { field: 'n', condition: 'usize' }
    ],
    examples: [
        {
            input: 'Rust is blazingly fast and memory efficient 4',
            output: '5'
        }
    ],

    content: `
<p>Đếm số từ có độ dài >= n.</p>
`,
    defaultCode: `fn main() {
    let essay = "Rust is blazingly fast and memory efficient";
    let n = 4;
    let count = count_long_words(essay, n);
    println!("{}", count);
}

fn count_long_words(text: &str, n: usize) -> usize {
    let bytes = text.as_bytes();
    let mut word_count = 0;
    let mut current_word_len = 0;

    for &b in bytes.iter() {
        if b == b' ' {
            if current_word_len >= n {
                word_count += 1;
            }
            current_word_len = 0;
        } else {
            current_word_len += 1;
        }
    }

    if current_word_len >= n {
        word_count += 1;
    }

    word_count
}
`,
    expectedOutput: '5'
};
