import { Lesson } from '../../courses';

export const ch05_08_ex: Lesson = {
    id: 'ch05-08-ex',
    title: 'Bài tập 5.8: Methods với nhiều Parameters',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Method can_hold() cho Rectangle',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa method can_hold() để kiểm tra xem một hình chữ nhật có thể chứa hình chữ nhật khác không.',
    inputFormat: 'Không có input',
    outputFormat: 'In kết quả kiểm tra',
    constraints: [
        { field: 'can_hold', condition: 'Nhận &Rectangle, trả về bool' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Can rect1 hold rect2? true'
        }
    ],

    content: `
<p>Methods có thể nhận nhiều tham số, ví dụ như &self và &Rectangle khác.</p>
`,
    defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // TODO: Định nghĩa method can_hold nhận vào tham chiếu Rectangle khác
    // Trả về true nếu self có thể chứa được other (width và height đều lớn hơn)
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    // Kiểm tra rect1 có thể chứa rect2 không
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}
`,
    expectedOutput: 'Can rect1 hold rect2? true'
};
