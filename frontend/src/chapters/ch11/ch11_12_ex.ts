import { Lesson } from '../../courses';

export const ch11_12_ex: Lesson = {
    id: 'ch11-12-ex',
    title: 'Bài tập 11.12: Testing with Vectors',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành test với Vectors!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết tests cho Vector operations</li>
  <li>Test push, pop, remove, etc.</li>
</ol>
`,
    defaultCode: `fn main() {
    // Test creating vector
    let mut v = vec![1, 2, 3, 4, 5];
    assert_eq!(v.len(), 5);
    assert_eq!(v.first(), Some(&1));
    assert_eq!(v.last(), Some(&5));

    // Test push
    v.push(6);
    assert_eq!(v.len(), 6);
    assert_eq!(v.last(), Some(&6));

    // Test pop
    let last = v.pop();
    assert_eq!(last, Some(6));
    assert_eq!(v.len(), 5);

    // Test contains
    assert!(v.contains(&3));
    assert!(!v.contains(&6));

    // Test remove
    let removed = v.remove(0);
    assert_eq!(removed, 1);
    assert_eq!(v.len(), 4);
    assert_eq!(v.first(), Some(&2));

    // Test sort
    let mut v2 = vec![5, 3, 1, 4, 2];
    v2.sort();
    assert_eq!(v2, vec![1, 2, 3, 4, 5]);

    // Test reverse
    v2.reverse();
    assert_eq!(v2, vec![5, 4, 3, 2, 1]);

    println!("Vector tests passed!");
}
`,
    expectedOutput: 'Vector tests passed!',
    testCases: [
        {
            input: 'len',
            expectedOutput: '4',
            description: 'Sau khi remove(0), còn 4 phần tử'
        }
    ]
};
