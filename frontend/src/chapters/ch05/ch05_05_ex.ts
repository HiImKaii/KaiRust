import { Lesson } from '../../courses';

export const ch05_05_ex: Lesson = {
    id: 'ch05-05-ex',
    title: 'Bài tập 5.5: Unit-Like Structs',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Unit-Like Structs',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa Unit-Like Struct không có fields.',
    inputFormat: 'Không có input',
    outputFormat: 'In thông báo',
    constraints: [
        { field: 'AlwaysEqual', condition: 'Không có fields' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'AlwaysEqual instance created successfully!'
        }
    ],

    content: `
<p>Unit-Like Structs hữu ích khi cần implement trait mà không cần data.</p>
`,
    defaultCode: `// TODO: Định nghĩa một Unit-Like Struct AlwaysEqual
struct AlwaysEqual;

fn main() {
    // TODO: Tạo một instance của AlwaysEqual
    let subject = AlwaysEqual;

    println!("AlwaysEqual instance created successfully!");
}
`,
    expectedOutput: 'AlwaysEqual instance created successfully!'
};
