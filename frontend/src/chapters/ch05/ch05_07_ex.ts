import { Lesson } from '../../courses';

export const ch05_07_ex: Lesson = {
    id: 'ch05-07-ex',
    title: 'Bài tập 5.7: Method Syntax - Định nghĩa Methods',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Method area() cho Rectangle',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa method area() trong impl block cho Rectangle.',
    inputFormat: 'Không có input',
    outputFormat: 'In diện tích',
    constraints: [
        { field: 'impl Rectangle', condition: 'Có method area(&self)' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'The area of the rectangle is 1500 square pixels.'
        }
    ],

    content: `
<p>Methods được định nghĩa trong impl block với tham số đầu tiên là &self.</p>
`,
    defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Định nghĩa một impl block cho Rectangle
impl Rectangle {
    // TODO: Định nghĩa method area (không có tham số khác ngoài &self)
    // Trả về diện tích = width * height
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    // Gọi method area bằng dot notation
    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
`,
    expectedOutput: 'The area of the rectangle is 1500 square pixels.'
};
