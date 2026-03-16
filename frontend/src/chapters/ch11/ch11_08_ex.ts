import { Lesson } from '../../courses';

export const ch11_08_ex: Lesson = {
    id: 'ch11-08-ex',
    title: 'Bài tập 11.8: Testing HashMap',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành test HashMap!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết tests cho HashMap operations</li>
  <li>Test insert, get, contains_key</li>
</ol>
`,
    defaultCode: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    // Insert
    scores.insert("Alice".to_string(), 100);
    scores.insert("Bob".to_string(), 85);
    scores.insert("Charlie".to_string(), 90);

    // Test insert
    assert_eq!(scores.len(), 3);

    // Test get
    assert_eq!(scores.get("Alice"), Some(&100));
    assert_eq!(scores.get("Bob"), Some(&85));
    assert_eq!(scores.get("David"), None);

    // Test contains_key
    assert!(scores.contains_key("Alice"));
    assert!(!scores.contains_key("David"));

    // Test update
    scores.insert("Alice", 110);
    assert_eq!(scores.get("Alice"), Some(&110));

    // Test remove
    scores.remove("Bob");
    assert_eq!(scores.len(), 2);
    assert!(!scores.contains_key("Bob"));

    println!("HashMap tests passed!");
}
`,
    expectedOutput: 'HashMap tests passed!',
    testCases: [
        {
            input: 'len',
            expectedOutput: '2',
            description: 'Sau khi remove, còn 2 phần tử'
        }
    ]
};
