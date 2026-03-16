// Exercise - ch11_12_ex: Testing with Vectors

fn main() {
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
