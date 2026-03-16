// Exercise - ch11_06_ex: Integration Tests

mod libs {
    pub fn add_all(numbers: &[i32]) -> i32 {
        numbers.iter().sum()
    }

    pub fn multiply_all(numbers: &[i32]) -> i32 {
        numbers.iter().product()
    }

    pub fn find_max(numbers: &[i32]) -> Option<i32> {
        numbers.iter().max().copied()
    }

    pub fn find_min(numbers: &[i32]) -> Option<i32> {
        numbers.iter().min().copied()
    }
}

fn main() {
    // Test add_all
    let numbers = vec![1, 2, 3, 4, 5];
    assert_eq!(libs::add_all(&numbers), 15);
    assert_eq!(libs::add_all(&[]), 0);

    // Test multiply_all
    assert_eq!(libs::multiply_all(&[1, 2, 3, 4]), 24);
    assert_eq!(libs::multiply_all(&[5]), 5);
    assert_eq!(libs::multiply_all(&[]), 1);

    // Test find_max
    assert_eq!(libs::find_max(&numbers), Some(5));
    assert_eq!(libs::find_max(&[]), None);

    // Test find_min
    assert_eq!(libs::find_min(&numbers), Some(1));
    assert_eq!(libs::find_min(&[]), None);

    println!("Integration tests passed!");
}
