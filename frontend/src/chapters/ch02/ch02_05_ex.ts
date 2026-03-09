import { Lesson } from '../../courses';

export const ch02_05_ex: Lesson = {
    id: 'ch02-05-ex',
    title: 'Bài tập 2.5: So sánh hai số',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'So sánh hai số',
    timeLimit: '500ms',
    memoryLimit: '256MB',
    problemDescription: `Cho trước hai số \`guess = 50\` và \`secret_number = 77\`. Hãy so sánh và in kết quả:
- Nếu guess < secret_number: in "Too small!"
- Nếu guess > secret_number: in "Too big!"
- Nếu guess == secret_number: in "You win!"`,
    inputFormat: 'Không có input',
    outputFormat: 'In ra một trong: "Too small!", "Too big!", "You win!"',
    constraints: [],
    examples: [
        {
            input: '',
            output: 'Too small!',
            explanation: '50 < 77 nên in "Too small!"'
        }
    ],

    content: `
<h3>Lý thuyết</h3>
<p>Để so sánh hai giá trị, ta dùng phương thức \`.cmp()\` trả về \`Ordering\` enum. Dùng \`match\` để xử lý các trường hợp: \`Less\`, \`Greater\`, \`Equal\`.</p>

<h3>Yêu cầu</h3>
<ul>
    <li>Import \`std::cmp::Ordering\`</li>
    <li>Dùng \`guess.cmp(&secret_number)\` để so sánh</li>
    <li>Dùng \`match\` để in kết quả</li>
</ul>
`,
    defaultCode: `use std::cmp::Ordering;

fn main() {
    let guess = 50;
    let secret_number = 77;

    // So sánh và in kết quả
    // match guess.cmp(&secret_number) {
    //     Ordering::Less => println!("Too small!"),
    //     Ordering::Greater => println!("Too big!"),
    //     Ordering::Equal => println!("You win!"),
    // }
}
`,
    expectedOutput: 'Too small!',
    testCases: [
        {
            input: '',
            expectedOutput: 'Too small!',
            description: '50 < 77'
        }
    ]
};
