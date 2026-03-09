import { Lesson } from '../../courses';

export const ch05_04_ex: Lesson = {
    id: 'ch05-04-ex',
    title: 'Bài tập 5.4: Tuple Structs',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Tuple Structs - Color và Point',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa Tuple Structs Color và Point, truy cập và destructure các phần tử.',
    inputFormat: 'Không có input',
    outputFormat: 'In thông tin color và point',
    constraints: [
        { field: 'Color', condition: '3 tham số i32' },
        { field: 'Point', condition: '3 tham số i32' }
    ],
    examples: [
        {
            input: '(không có)',
            output: 'Black color: R=0, G=0, B=0\nOrigin point: x=0, y=0, z=0\nDestructured point: x=0, y=0, z=0'
        }
    ],

    content: `
<p>Tuple Structs cho phép đặt tên cho tuple nhưng không đặt tên cho từng field.</p>
`,
    defaultCode: `// TODO: Định nghĩa Tuple Struct Color với 3 tham số i32
struct Color(i32, i32, i32);

// TODO: Định nghĩa Tuple Struct Point với 3 tham số i32
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    // Truy cập các field bằng index
    println!("Black color: R={}, G={}, B={}", black.0, black.1, black.2);
    println!("Origin point: x={}, y={}, z={}", origin.0, origin.1, origin.2);

    // TODO: Destructure tuple struct
    let Point(x, y, z) = origin;
    println!("Destructured point: x={}, y={}, z={}", x, y, z);
}
`,
    expectedOutput: 'Black color: R=0, G=0, B=0\nOrigin point: x=0, y=0, z=0\nDestructured point: x=0, y=0, z=0'
};
