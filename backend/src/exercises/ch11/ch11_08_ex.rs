// Exercise - ch11_08_ex: Testing HashMap

use std::collections::HashMap;

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
