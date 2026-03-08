import { Lesson } from '../../courses';

export const ch03_05_ex4: Lesson = {
    id: 'ch03-05-ex4',
    title: 'Bài tập 3.5.4: Vòng lặp While',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Đếm ngược với While',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Đếm ngược từ 5 về 1, sau đó in "Khai hỏa!"',
    inputFormat: 'Không có input',
    outputFormat: 'In các số từ 5 đến 1, sau đó in "Khai hỏa!"',
    constraints: [
        { field: 'Bắt đầu', condition: '5' },
        { field: 'Kết thúc', condition: '1, sau đó in "Khai hỏa!"' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '5\n4\n3\n2\n1\nKhai hỏa!'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Hãy nhớ thay đổi biến number bên trong, nếu không bạn sẽ có một vòng lặp mãi mãi!
</div>
`,
    defaultCode: `fn main() {
    let mut number = 5;

    while number != 0 {
        println!("{}", number);
        number -= 1;
    }

    println!("Khai hỏa!");
}
`
};
