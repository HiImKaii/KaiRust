import { Lesson } from '../../courses';

export const ch03_05_ex3: Lesson = {
    id: 'ch03-05-ex3',
    title: 'Bài tập 3.5.3: Trả về giá trị từ Vòng lặp Loop',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Loop trả về giá trị',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Dùng vòng lặp loop để đếm từ 0 đến 10, sau đó trả về counter * 2.',
    inputFormat: 'Không có input',
    outputFormat: 'In ra kết quả',
    constraints: [
        { field: 'Counter', condition: 'Bắt đầu từ 0, tăng 1 mỗi vòng' },
        { field: 'Break', condition: 'Khi counter == 10, trả về counter * 2' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '20'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Break trả về giá trị:</strong> Dùng cú pháp <code>break giá_trị;</code> (ví dụ: <code>break 15;</code>).
</div>
`,
    defaultCode: `fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };

    println!("{}", result);
}
`
};
