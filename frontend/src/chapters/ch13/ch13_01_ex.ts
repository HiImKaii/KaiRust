import { Lesson } from '../../courses';

export const ch13_01_ex: Lesson = {
    id: 'ch13-01-ex',
    title: 'Bài tập 13.1: Closure cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với Closures cơ bản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo closure cộng hai số</li>
  <li>Tạo closure nhân hai số</li>
  <li>Gọi closure</li>
</ol>
`,
    defaultCode: `fn main() {
    // Tạo closure cộng hai số
    let add = |a: i32, b: i32| -> i32 { a + b };

    // Tạo closure nhân hai số
    let multiply = |a: i32, b: i32| -> i32 { a * b };

    // Gọi closure
    let result1 = add(5, 3);
    let result2 = multiply(4, 7);

    println!("5 + 3 = {}", result1);
    println!("4 * 7 = {}", result2);
}
`,
    expectedOutput: '5 + 3 = 8\n4 * 7 = 28',
    testCases: [
        {
            input: 'add(5, 3)',
            expectedOutput: '8',
            description: '5 + 3 = 8'
        }
    ]
};
