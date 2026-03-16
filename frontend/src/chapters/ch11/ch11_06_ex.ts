import { Lesson } from '../../courses';

export const ch11_06_ex: Lesson = {
    id: 'ch11-06-ex',
    title: 'Bài tập 11.6: Integration Tests',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết integration tests!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo library crate</li>
  <li>Viết tests bên ngoài crate</li>
</ol>
`,
    defaultCode: `mod libs {
    pub fn add_all(numbers: &[i32]) -> i32 {
        numbers.iter().sum()
    }

    pub fn multiply_all(numbers: &[i32]) -> i32 {
        numbers.iter().product()
    }

    pub fn find_max(numbers: &[i32]) -> Option<i32> {
        numbers.iter().max().copied()
    }

    pub fn find_min(numbers: &[i32]) -> Option<i32> {
        numbers.iter().min().copied()
    }
}

fn main() {
    // Test add_all
    let numbers = vec![1, 2, 3, 4, 5];
    assert_eq!(libs::add_all(&numbers), 15);
    assert_eq!(libs::add_all(&[]), 0);

    // Test multiply_all
    assert_eq!(libs::multiply_all(&[1, 2, 3, 4]), 24);
    assert_eq!(libs::multiply_all(&[5]), 5);
    assert_eq!(libs::multiply_all(&[]), 1);

    // Test find_max
    assert_eq!(libs::find_max(&numbers), Some(5));
    assert_eq!(libs::find_max(&[]), None);

    // Test find_min
    assert_eq!(libs::find_min(&numbers), Some(1));
    assert_eq!(libs::find_min(&[]), None);

    println!("Integration tests passed!");
}
`,
    expectedOutput: 'Integration tests passed!',
    testCases: [
        {
            input: 'add_all([1, 2, 3, 4, 5])',
            expectedOutput: '15',
            description: 'Sum = 15'
        }
    ]
};
