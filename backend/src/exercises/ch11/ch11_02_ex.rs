// Exercise - ch11_02_ex: assert! và assert_eq!

fn is_even(n: i32) -> bool {
    n % 2 == 0
}

fn is_positive(n: i32) -> bool {
    n > 0
}

fn max(a: i32, b: i32) -> i32 {
    if a > b { a } else { b }
}

fn min(a: i32, b: i32) -> i32 {
    if a < b { a } else { b }
}

fn main() {
    // Test is_even
    assert!(is_even(4));
    assert!(is_even(0));
    assert!(!is_even(5));

    // Test is_positive
    assert!(is_positive(5));
    assert!(!is_positive(0));
    assert!(!is_positive(-5));

    // Test max
    assert_eq!(max(5, 3), 5);
    assert_eq!(max(3, 5), 5);
    assert_eq!(max(5, 5), 5);

    // Test min
    assert_eq!(min(5, 3), 3);
    assert_eq!(min(3, 5), 3);
    assert_eq!(min(5, 5), 5);

    println!("Tất cả tests passed!");
}
