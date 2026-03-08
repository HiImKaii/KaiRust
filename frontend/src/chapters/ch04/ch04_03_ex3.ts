import { Lesson } from '../../courses';

export const ch04_03_ex3: Lesson = {
    id: 'ch04_03_ex3',
    title: 'Bài tập: Longest Substring Without Repeating',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Longest Substring Without Repeating',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Tìm độ dài longest substring không có ký tự lặp lại.',
    inputFormat: 'Cho sẵn chuỗi "abcabcbb" và "pwwkew"',
    outputFormat: 'In độ dài max',
    constraints: [
        { field: 's', condition: '&str' }
    ],
    examples: [
        {
            input: 'abcabcbb',
            output: '3'
        }
    ],

    content: `
<p>Tìm độ dài longest substring không có ký tự lặp lại.</p>
`,
    defaultCode: `fn main() {
    println!("{}", length_of_longest_substring("abcabcbb"));
    println!("{}", length_of_longest_substring("pwwkew"));
}

fn length_of_longest_substring(s: &str) -> usize {
    let bytes = s.as_bytes();
    let mut max_len = 0;

    for i in 0..bytes.len() {
        let mut curr_window_chars = [0; 256];
        let mut current_len = 0;

        for j in i..bytes.len() {
            let char_idx = bytes[j] as usize;
            if curr_window_chars[char_idx] == 1 {
                break;
            }
            curr_window_chars[char_idx] = 1;
            current_len += 1;
        }

        if current_len > max_len {
            max_len = current_len;
        }
    }

    max_len
}
`,
    expectedOutput: '3\n3'
};
