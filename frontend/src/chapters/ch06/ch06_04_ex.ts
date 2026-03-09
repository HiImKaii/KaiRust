import { Lesson } from '../../courses';

export const ch06_04_ex: Lesson = {
    id: 'ch06-04-ex',
    title: 'Bài tập 6.4: Enum cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Enum cơ bản - TrafficLight',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Thực hành định nghĩa và sử dụng Enum cơ bản.

Yêu cầu:
1. Định nghĩa enum TrafficLight với các variant: Red, Yellow, Green
2. Viết hàm get_action(light: &TrafficLight) -> &str trả về hành động tương ứng:
   - Red → "Dừng lại"
   - Yellow → "Chuẩn bị dừng"
   - Green → "Đi tiếp"`,

    inputFormat: 'Gọi hàm get_action với các TrafficLight khác nhau',
    outputFormat: 'In ra hành động tương ứng',

    constraints: [
        { field: 'Enum TrafficLight', condition: '3 variant: Red, Yellow, Green' },
        { field: 'Hàm get_action', condition: 'Trả về &str tương ứng với từng variant' }
    ],

    examples: [
        {
            input: 'TrafficLight::Red',
            output: 'Dừng lại',
            explanation: 'Đèn đỏ phải dừng lại'
        },
        {
            input: 'TrafficLight::Green',
            output: 'Đi tiếp',
            explanation: 'Đèn xanh được đi tiếp'
        }
    ],

    content: `
<h3>Hướng dẫn</h3>
<pre><code>enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn get_action(light: &TrafficLight) -> &str {
    match light {
        TrafficLight::Red => "Dừng lại",
        TrafficLight::Yellow => "Chuẩn bị dừng",
        TrafficLight::Green => "Đi tiếp",
    }
}</code></pre>
`,

    defaultCode: `// TODO: Định nghĩa enum TrafficLight

// TODO: Viết hàm get_action trả về &str

fn main() {
    println!("{}", get_action(&TrafficLight::Red));
    println!("{}", get_action(&TrafficLight::Green));
}
`,

    testCases: [
        {
            input: 'TrafficLight::Red',
            expectedOutput: 'Dừng lại',
            description: 'Đèn đỏ phải dừng lại'
        },
        {
            input: 'TrafficLight::Yellow',
            expectedOutput: 'Chuẩn bị dừng',
            description: 'Đèn vàng chuẩn bị dừng'
        },
        {
            input: 'TrafficLight::Green',
            expectedOutput: 'Đi tiếp',
            description: 'Đèn xanh được đi tiếp'
        }
    ]
};
