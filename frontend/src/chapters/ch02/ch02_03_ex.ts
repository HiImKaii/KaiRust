import { Lesson } from '../../courses';

export const ch02_03_ex: Lesson = {
    id: 'ch02-03-ex',
    title: 'Bài tập 2.3: Sinh số ngẫu nhiên',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Sinh số ngẫu nhiên',
    memoryLimit: '256MB',
    timeLimit: '500ms',
    problemDescription: `Viết chương trình sinh một số ngẫu nhiên từ 1 đến 100 và in ra màn hình.`,
    inputFormat: 'Không có input',
    outputFormat: 'In ra số ngẫu nhiên (1-100)',
    constraints: [],
    examples: [
        {
            input: '',
            output: '42',
            explanation: 'Sinh số ngẫu nhiên từ 1-100'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Để sinh số ngẫu nhiên trong Rust, ta sử dụng crate \`rand\%. Import \`Rng\` trait, tạo random number generator với \`rand::thread_rng()\`, dùng \`gen_range()\` để sinh số trong phạm vi.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Import \`rand::Rng\`</li>
    <li>Tạo random number generator</li>
    <li>Sinh số ngẫu nhiên từ 1 đến 100</li>
    <li>In ra màn hình</li>
</ul>
`,
    defaultCode: `// Import random number generator
// use rand::Rng;

fn main() {
    // Tạo random number generator
    // let mut rng = rand::thread_rng();

    // Sinh số ngẫu nhiên từ 1 đến 100
    // let secret_number = rng.gen_range(1..=100);

    // In ra màn hình
    // println!("{}", secret_number);
}
`,
    expectedOutput: '42',
    testCases: [
        {
            input: '',
            expectedOutput: '42',
            description: 'Sinh số ngẫu nhiên 1-100'
        }
    ]
};
