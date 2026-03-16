import { Lesson } from '../../courses';

export const ch11_03_ex: Lesson = {
    id: 'ch11-03-ex',
    title: 'Bài tập 11.3: #[should_panic]',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết tests cho panic!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết function gây panic khi gặp điều kiện đặc biệt</li>
  <li>Viết test với #[should_panic]</li>
</ol>
`,
    defaultCode: `fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Cannot divide by zero!");
    }
    a / b
}

fn access_vector(v: &[i32], index: usize) -> i32 {
    if index >= v.len() {
        panic!("Index out of bounds!");
    }
    v[index]
}

fn main() {
    // Test divide không panic
    assert_eq!(divide(10, 2), 5);

    // Test access_vector không panic
    let v = vec![1, 2, 3];
    assert_eq!(access_vector(&v, 0), 1);
    assert_eq!(access_vector(&v, 2), 3);

    println!("Tests passed!");
}
`,
    expectedOutput: 'Tests passed!',
    testCases: [
        {
            input: 'divide(10, 2)',
            expectedOutput: '5',
            description: '10 / 2 = 5'
        }
    ]
};
