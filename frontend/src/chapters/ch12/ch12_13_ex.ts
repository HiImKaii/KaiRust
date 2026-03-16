import { Lesson } from '../../courses';

export const ch12_13_ex: Lesson = {
    id: 'ch12-13-ex',
    title: 'Bài tập 12.13: JSON Reading',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành đọc file JSON đơn giản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Parse JSON string thủ công</li>
  <li>Trích xuất giá trị</li>
</ol>
`,
    defaultCode: `use std::collections::HashMap;

fn parse_json(json: &str) -> HashMap<String, String> {
    let mut map = HashMap::new();

    // Bỏ qua { và }
    let content = json.trim().trim_matches('{').trim_matches('}');

    for pair in content.split(',') {
        let parts: Vec<&str> = pair.split(':').collect();
        if parts.len() == 2 {
            let key = parts[0].trim().trim_matches('"');
            let value = parts[1].trim().trim_matches('"');
            map.insert(key.to_string(), value.to_string());
        }
    }

    map
}

fn main() {
    let json = r#"{"name": "Alice", "age": "25", "city": "Hanoi"}"#;

    let map = parse_json(json);

    println!("Name: {}", map.get("name").unwrap());
    println!("Age: {}", map.get("age").unwrap());
    println!("City: {}", map.get("city").unwrap());
}
`,
    expectedOutput: 'Name: Alice',
    testCases: [
        {
            input: 'name',
            expectedOutput: 'Alice',
            description: 'Tên'
        }
    ]
};
