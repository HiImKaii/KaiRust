// Exercise - ch11_14_ex: Testing Error Handling

use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n: i32 = s.parse()?;
    Ok(n * 2)
}

fn safe_divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn find_in_slice(slice: &[i32], target: i32) -> Option<usize> {
    slice.iter().position(|&x| x == target)
}

fn main() {
    // Test parse_and_double
    assert_eq!(parse_and_double("5").unwrap(), 10);
    assert_eq!(parse_and_double("21").unwrap(), 42);
    assert!(parse_and_double("abc").is_err());

    // Test safe_divide
    assert_eq!(safe_divide(10, 2).unwrap(), 5);
    assert_eq!(safe_divide(15, 3).unwrap(), 5);
    assert!(safe_divide(10, 0).is_err());

    // Test find_in_slice
    let v = vec![1, 2, 3, 4, 5];
    assert_eq!(find_in_slice(&v, 3), Some(2));
    assert_eq!(find_in_slice(&v, 6), None);
    assert_eq!(find_in_slice(&v, 1), Some(0));

    println!("Error handling tests passed!");
}
