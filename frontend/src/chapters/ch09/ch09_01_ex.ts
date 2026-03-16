import { Lesson } from '../../courses';

export const ch09_01_ex: Lesson = {
    id: 'ch09-01-ex',
    title: 'Bài tập 9.1: panic! cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành với panic! macro trong Rust!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo một function divide() nhận hai số i32 và trả về kết quả chia</li>
  <li>Nếu chia cho 0, gọi panic! với thông báo lỗi "Cannot divide by zero"</li>
  <li>Gọi function trong main với các giá trị khác nhau để test</li>
</ol>
<h3 class="task-heading">Ví dụ</h3>
<pre><code>divide(10, 2) // => 5
divide(10, 0) // => panic!</code></pre>
`,
    defaultCode: `fn divide(a: i32, b: i32) -> i32 {
    // Kiểm tra nếu b = 0 thì panic
    // Ngược lại trả về a / b
    unimplemented!()
}

fn main() {
    // Test với chia cho số khác 0
    let result = divide(10, 2);
    println!("10 / 2 = {}", result);

    // Test với chia cho 0 (sẽ panic)
    // divide(10, 0);
    println!("Kết thúc chương trình!");
}
`,
    expectedOutput: '10 / 2 = 5\nKết thúc chương trình!',
    testCases: [
        {
            input: 'divide(10, 2)',
            expectedOutput: '5',
            description: 'Chia 10 cho 2 phải bằng 5'
        },
        {
            input: 'divide(20, 4)',
            expectedOutput: '5',
            description: 'Chia 20 cho 4 phải bằng 5'
        },
        {
            input: 'divide(7, 3)',
            expectedOutput: '2',
            description: 'Chia 7 cho 3 phải bằng 2 (integer division)'
        }
    ]
};
