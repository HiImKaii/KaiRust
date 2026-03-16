// Exercise - ch11_07_ex: Test Organization

fn test_basic_assertions() {
    assert!(true);
    assert!(1 + 1 == 2);
}

fn test_assert_eq() {
    assert_eq!(2 + 2, 4);
    assert_eq!("hello", "hello");
}

fn test_assert_ne() {
    assert_ne!(2 + 2, 5);
    assert_ne!("hello", "world");
}

fn main() {
    test_basic_assertions();
    test_assert_eq();
    test_assert_ne();
    println!("All tests passed!");
}
