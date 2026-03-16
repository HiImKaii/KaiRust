import { Lesson } from '../../courses';

export const ch11_13_ex: Lesson = {
    id: 'ch11-13-ex',
    title: 'Bài tập 11.13: Test Benchmarks',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết benchmark tests!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết function với nhiều cách implementation</li>
  <li>So sánh hiệu năng</li>
</ol>
`,
    defaultCode: `fn fibonacci_iterative(n: u32) -> u64 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }
    let mut a = 0u64;
    let mut b = 1u64;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}

fn fibonacci_recursive(n: u32) -> u64 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2),
    }
}

fn factorial_iterative(n: u64) -> u64 {
    (1..=n).product()
}

fn factorial_recursive(n: u64) -> u64 {
    if n <= 1 { 1 } else { n * factorial_recursive(n - 1) }
}

fn main() {
    // Test fibonacci iterative
    assert_eq!(fibonacci_iterative(0), 0);
    assert_eq!(fibonacci_iterative(1), 1);
    assert_eq!(fibonacci_iterative(10), 55);
    assert_eq!(fibonacci_iterative(20), 6765);

    // Test fibonacci recursive (small numbers only)
    assert_eq!(fibonacci_recursive(0), 0);
    assert_eq!(fibonacci_recursive(1), 1);
    assert_eq!(fibonacci_recursive(10), 55);

    // Test factorial iterative
    assert_eq!(factorial_iterative(0), 1);
    assert_eq!(factorial_iterative(5), 120);
    assert_eq!(factorial_iterative(10), 3628800);

    // Test factorial recursive
    assert_eq!(factorial_recursive(0), 1);
    assert_eq!(factorial_recursive(5), 120);
    assert_eq!(factorial_recursive(10), 3628800);

    println!("Benchmark tests passed!");
}
`,
    expectedOutput: 'Benchmark tests passed!',
    testCases: [
        {
            input: 'fibonacci_iterative(10)',
            expectedOutput: '55',
            description: 'Fibonacci(10) = 55'
        }
    ]
};
