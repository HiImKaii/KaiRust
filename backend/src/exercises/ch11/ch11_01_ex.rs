// Exercise - ch11_01_ex: #[test] cơ bản

fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn subtract(a: i32, b: i32) -> i32 {
    a - b
}

fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn divide(a: i32, b: i32) -> i32 {
    a / b
}

fn main() {
    // Test add
    assert_eq!(add(2, 3), 5);
    assert_eq!(add(-1, 1), 0);
    assert_eq!(add(0, 0), 0);

    // Test subtract
    assert_eq!(subtract(5, 3), 2);
    assert_eq!(subtract(3, 5), -2);

    // Test multiply
    assert_eq!(multiply(3, 4), 12);
    assert_eq!(multiply(-2, 3), -6);

    // Test divide
    assert_eq!(divide(10, 2), 5);
    assert_eq!(divide(9, 3), 3);

    println!("Tất cả tests passed!");
}
