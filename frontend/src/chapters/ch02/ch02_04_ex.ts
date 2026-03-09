import { Lesson } from '../../courses';

export const ch02_04_ex: Lesson = {
    id: 'ch02-04-ex',
    title: 'Bài tập 2.4: Chuyển đổi kiểu dữ liệu',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Chuyển đổi kiểu dữ liệu',
    timeLimit: '500ms',
    memoryLimit: '256MB',
    problemDescription: `Cho trước chuỗi số "  42  " (có khoảng trắng ở đầu và cuối). Hãy chuyển đổi chuỗi này thành số nguyên \`u32\` và in ra màn hình.`,
    inputFormat: 'Không có input',
    outputFormat: 'In ra số: 42',
    constraints: [],
    examples: [
        {
            input: '',
            output: '42',
            explanation: 'Chuỗi "  42  " sau khi trim và parse thành 42'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Để chuyển đổi \`String\` sang số, ta dùng \`.trim()\` để loại bỏ khoảng trắng, rồi \`.parse()\` để chuyển đổi. Dùng \`.expect()\` để xử lý lỗi.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Dùng \`.trim()\` để loại bỏ khoảng trắng</li>
    <li>Dùng \`.parse::<u32>()\` để chuyển sang số nguyên</li>
    <li>Dùng \`.expect()\` để xử lý lỗi</li>
    <li>In ra màn hình</li>
</ul>
`,
    defaultCode: `fn main() {
    let guess = "  42  ";

    // Chuyển đổi String sang u32
    // Bước 1: trim() để bỏ khoảng trắng
    // Bước 2: parse() để chuyển sang số
    // let number: u32 = guess.trim().parse().expect("Failed to parse");

    // In ra màn hình
    // println!("{}", number);
}
`,
    expectedOutput: '42',
    testCases: [
        {
            input: '',
            expectedOutput: '42',
            description: 'Parse chuỗi thành số'
        }
    ]
};
