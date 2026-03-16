import { Lesson } from '../../courses';

export const ch11_09_ex: Lesson = {
    id: 'ch11-09-ex',
    title: 'Bài tập 11.9: Testing with Result',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết tests trả về Result!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết tests trả về Result&lt;(), String&gt;</li>
  <li>Sử dụng ? operator trong tests</li>
</ol>
`,
    defaultCode: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn sqrt(n: f64) -> Result<f64, String> {
    if n < 0.0 {
        Err("Cannot take sqrt of negative".to_string())
    } else {
        Ok(n.sqrt())
    }
}

fn main() {
    // Test divide
    let result = divide(10.0, 2.0)?;
    assert!((result - 5.0).abs() < 0.001);

    let result = divide(9.0, 3.0)?;
    assert!((result - 3.0).abs() < 0.001);

    // Test sqrt
    let result = sqrt(16.0)?;
    assert!((result - 4.0).abs() < 0.001);

    let result = sqrt(2.0)?;
    assert!((result - 1.414).abs() < 0.01);

    println!("Result tests passed!");
}

fn run_tests() -> Result<(), String> {
    // Test divide OK case
    divide(10.0, 2.0)?;
    divide(9.0, 3.0)?;

    // Test sqrt OK case
    sqrt(16.0)?;
    sqrt(2.0)?;

    Ok(())
}
`,
    expectedOutput: 'Result tests passed!',
    testCases: [
        {
            input: 'divide(10.0, 2.0)',
            expectedOutput: '5',
            description: '10 / 2 = 5'
        }
    ]
};
