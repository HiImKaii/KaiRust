// Exercise - ch12_13_ex: JSON Reading

use std::collections::HashMap;

fn parse_json(json: &str) -> HashMap<String, String> {
    let mut map = HashMap::new();

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
