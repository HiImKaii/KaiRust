import { Lesson } from '../../courses';

export const ch05_09_ex: Lesson = {
    id: 'ch05-09-ex',
    title: 'Bài tập 5.9: Associated Functions (Constructor)',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Associated Function square()',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa associated function square() để tạo hình vuông, sử dụng Self keyword.',
    inputFormat: 'Không có input',
    outputFormat: 'In thông tin hình vuông',
    constraints: [
        { field: 'square', condition: 'Nhận size: u32, trả về Self' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Square: Rectangle { width: 3, height: 3 }\nSquare area: 9'
        }
    ],

    content: `
<p>Associated Functions là các hàm trong impl block không có self, thường dùng làm constructors. Sử dụng Self để tham chiếu đến type hiện tại.</p>
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

    // TODO: Định nghĩa associated function square
    // Nhận vào một tham số size: u32
    // Trả về một Rectangle với width = height = size
    // Sử dụng Self keyword
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    // Gọi associated function square bằng :: syntax
    let sq = Rectangle::square(3);

    println!("Square: {:?}", sq);
    println!("Square area: {}", sq.area());
}
`,
    expectedOutput: 'Square: Rectangle { width: 3, height: 3 }\nSquare area: 9'
};
