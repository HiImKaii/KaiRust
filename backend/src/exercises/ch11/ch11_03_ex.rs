// Exercise - ch11_03_ex: #[should_panic]

fn divide(a: i32, b: i32) -> i32 {
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
