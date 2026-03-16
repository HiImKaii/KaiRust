import { Lesson } from '../../courses';

export const ch11_01_ex: Lesson = {
    id: 'ch11-01-ex',
    title: 'Bài tập 11.1: #[test] cơ bản',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết unit tests cơ bản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết function add(a: i32, b: i32) -> i32</li>
  <li>Viết tests cho function này</li>
  <li>Sử dụng #[test] attribute</li>
</ol>
`,
    defaultCode: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn subtract(a: i32, b: i32) -> i32 {
    a - b
}

fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn divide(a: i32, b: i32) -> i32 {
    a / b
}

fn main() {
    // Test add
    assert_eq!(add(2, 3), 5);
    assert_eq!(add(-1, 1), 0);
    assert_eq!(add(0, 0), 0);

    // Test subtract
    assert_eq!(subtract(5, 3), 2);
    assert_eq!(subtract(3, 5), -2);

    // Test multiply
    assert_eq!(multiply(3, 4), 12);
    assert_eq!(multiply(-2, 3), -6);

    // Test divide
    assert_eq!(divide(10, 2), 5);
    assert_eq!(divide(9, 3), 3);

    println!("Tất cả tests passed!");
}
`,
    expectedOutput: 'Tất cả tests passed!',
    testCases: [
        {
            input: 'add(2, 3)',
            expectedOutput: '5',
            description: '2 + 3 = 5'
        },
        {
            input: 'add(10, 20)',
            expectedOutput: '30',
            description: '10 + 20 = 30'
        }
    ]
};
