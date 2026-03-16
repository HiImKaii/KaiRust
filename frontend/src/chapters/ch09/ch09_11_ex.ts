import { Lesson } from '../../courses';

export const ch09_11_ex: Lesson = {
    id: 'ch09-11-ex',
    title: 'Bài tập 9.11: Combinators - unwrap_or và unwrap_or_else',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng unwrap_or và unwrap_or_else!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng unwrap_or để cung cấp giá trị mặc định</li>
  <li>Sử dụng unwrap_or_else để cung cấp function tạo giá trị mặc định</li>
</ol>
`,
    defaultCode: `fn find_element(v: &[i32], target: i32) -> Option<usize> {
    // Tìm index của phần tử target
    unimplemented!()
}

fn get_value(index: usize) -> Option<i32> {
    let numbers = vec![10, 20, 30, 40, 50];
    numbers.get(index).copied()
}

fn main() {
    // unwrap_or với Option
    let numbers = vec![1, 2, 3];
    let first = numbers.first().copied().unwrap_or(-1);
    println!("First element (or -1): {}", first);

    // unwrap_or_else với Option
    let empty: Vec<i32> = vec![];
    let first_empty = empty.first().copied().unwrap_or_else(|| {
        println!("Vector trống, sử dụng giá trị mặc định");
        0
    });
    println!("First from empty: {}", first_empty);

    // unwrap_or với Result
    let result: Result<i32, &str> = Err("error");
    let value = result.unwrap_or(42);
    println!("Unwrap or default: {}", value);
}
`,
    expectedOutput: 'First element (or -1): 1\nFirst from empty: 0\nUnwrap or default: 42',
    testCases: [
        {
            input: 'unwrap_or',
            expectedOutput: 'true',
            description: 'Sử dụng unwrap_or'
        }
    ]
};
