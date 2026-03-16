import { Lesson } from '../../courses';

export const ch11_04_ex: Lesson = {
    id: 'ch11-04-ex',
    title: 'Bài tập 11.4: #[ignore]',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng #[ignore] attribute!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết tests với #[ignore] cho các test case tốn thời gian</li>
  <li>Chạy tests với --ignored để chạy các test bị bỏ qua</li>
</ol>
`,
    defaultCode: `fn fibonacci(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0u64;
            let mut b = 1u64;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn factorial(n: u64) -> u64 {
    if n <= 1 {
        1
    } else {
        n * factorial(n - 1)
    }
}

fn main() {
    // Test fibonacci
    assert_eq!(fibonacci(0), 0);
    assert_eq!(fibonacci(1), 1);
    assert_eq!(fibonacci(5), 5);
    assert_eq!(fibonacci(10), 55);

    // Test factorial
    assert_eq!(factorial(0), 1);
    assert_eq!(factorial(1), 1);
    assert_eq!(factorial(5), 120);
    assert_eq!(factorial(10), 3628800);

    println!("Tests passed!");
}
`,
    expectedOutput: 'Tests passed!',
    testCases: [
        {
            input: 'fibonacci(10)',
            expectedOutput: '55',
            description: 'Fibonacci(10) = 55'
        }
    ]
};
