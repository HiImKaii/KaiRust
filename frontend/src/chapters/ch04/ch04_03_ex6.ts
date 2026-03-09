import { Lesson } from '../../courses';

export const ch04_03_ex6: Lesson = {
    id: 'ch04_03_ex6',
    title: 'Bài tập: CSV Parser Mini',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'CSV Parser Mini',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Parse CSV row và in ra định dạng: ID: ... | Tên: ... | Tuổi: ...',
    inputFormat: 'Cho sẵn "101,Nguyen Van A,25"',
    outputFormat: 'In: ID: 101 | Tên: Nguyen Van A | Tuổi: 25',
    constraints: [
        { field: 'Input', condition: 'CSV row có 3 trường' }
    ],
    examples: [
        {
            input: '101,Nguyen Van A,25',
            output: 'ID: 101 | Tên: Nguyen Van A | Tuổi: 25'
        }
    ],

    content: `
<p>Parse CSV row bằng slice.</p>
`,
    defaultCode: `fn main() {
    let csv_row = "101,Nguyen Van A,25";
    parse_csv(csv_row);
}

fn parse_csv(s: &str) {
    let bytes = s.as_bytes();

    let mut first_comma = 0;
    let mut second_comma = 0;

    for (i, &item) in bytes.iter().enumerate() {
        if item == b',' {
            if first_comma == 0 {
                first_comma = i;
            } else {
                second_comma = i;
            }
        }
    }

    let id_slice = &s[0..first_comma];
    let name_slice = &s[first_comma + 1..second_comma];
    let age_slice = &s[second_comma + 1..];

    println!("ID: {} | Tên: {} | Tuổi: {}", id_slice, name_slice, age_slice);
}
`,
    expectedOutput: 'ID: 101 | Tên: Nguyen Van A | Tuổi: 25'
};
