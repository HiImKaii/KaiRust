import { Lesson } from '../../courses';

export const ch05_10_ex: Lesson = {
    id: 'ch05-10-ex',
    title: 'Bài tập 5.10: Multiple impl Blocks',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Multiple impl Blocks',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sử dụng nhiều impl blocks cho cùng một struct.',
    inputFormat: 'Không có input',
    outputFormat: 'In kết quả',
    constraints: [
        { field: 'impl blocks', condition: 'Có ít nhất 2 impl blocks' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Area of rect1: 1500\nCan rect1 hold rect2? true'
        }
    ],

    content: `
<p>Một struct có thể có nhiều impl blocks, thường dùng để nhóm các methods liên quan hoặc tách logic.</p>
`,
    defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Định nghĩa impl block đầu tiên với method area
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// TODO: Định nghĩa impl block thứ hai với method can_hold
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    println!("Area of rect1: {}", rect1.area());
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}
`,
    expectedOutput: 'Area of rect1: 1500\nCan rect1 hold rect2? true'
};
