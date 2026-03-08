import { Lesson } from '../../courses';

export const ch03_05_ex7: Lesson = {
    id: 'ch03-05-ex7',
    title: 'Bài tập 3.5.7: Mã hóa Caesar',
    duration: '35 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Mã hóa Caesar Cipher',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Mã hóa Caesar với shift = 3 cho các chữ cái thường a-z.',
    inputFormat: 'Cho sẵn: "hello world!", shift = 3',
    outputFormat: 'In ra chuỗi đã mã hóa',
    constraints: [
        { field: 'text', condition: 'Chỉ chứa a-z, space, dấu câu' },
        { field: 'shift', condition: '3' }
    ],
    examples: [
        {
            input: 'hello world! 3',
            output: 'khoor zruog!'
        }
    ],

    content: `
<div class="cyber-alert warning">
  <strong>Ép kiểu:</strong> Để phép tính <code>u8</code> không gặp lỗi tràn số khi cộng shift, bạn có thể cân nhắc ép sang một kiểu lớn hơn như <code>i32</code> trước khi xử lý hoặc tính toán thật cẩn thận.
</div>
`,
    defaultCode: `fn main() {
    let message = "hello world!";
    let shift_amount = 3;

    print!("Encrypted: ");
    caesar_cipher(message, shift_amount);
    println!("");
}

fn caesar_cipher(text: &str, shift: u8) {
    let bytes = text.as_bytes();
    let len = text.len();
    let mut i = 0;

    while i < len {
        let c = bytes[i];
        if c >= b'a' && c <= b'z' {
            let shifted = ((c - b'a' + shift) % 26) + b'a';
            print!("{}", shifted as char);
        } else {
            print!("{}", c as char);
        }
        i += 1;
    }
}
`
};
