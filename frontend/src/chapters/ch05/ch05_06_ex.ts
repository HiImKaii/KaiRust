import { Lesson } from '../../courses';

export const ch05_06_ex: Lesson = {
    id: 'ch05-06-ex',
    title: 'Bài tập 5.6: Ví dụ Rectangle với Struct',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tính diện tích hình chữ nhật',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Sử dụng struct Rectangle để tính diện tích hình chữ nhật. Sử dụng #[derive(Debug)] để có thể in struct.',
    inputFormat: 'Không có input',
    outputFormat: 'In diện tích và debug info',
    constraints: [
        { field: 'Rectangle', condition: 'width: u32, height: u32' },
        { field: 'area function', condition: 'Nhận &Rectangle, trả về u32' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'The area of the rectangle is 1500 square pixels.\nrect1 is Rectangle { width: 30, height: 50 }'
        }
    ],

    content: `
<p>Ví dụ thực tế sử dụng struct để giải quyết bài toán tính diện tích hình chữ nhật.</p>
`,
    defaultCode: `// TODO: Định nghĩa struct Rectangle với width và height là u32
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// TODO: Viết hàm area nhận vào tham chiếu Rectangle và trả về diện tích
fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    // Tính và in diện tích
    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );

    // In struct ra màn hình (sử dụng Debug trait)
    println!("rect1 is {:?}", rect1);
}
`,
    expectedOutput: 'The area of the rectangle is 1500 square pixels.\nrect1 is Rectangle { width: 30, height: 50 }'
};
