// Exercise - ch11_07_ex: Test Organization

mod tests {
    #[test]
    fn test_basic_assertions() {
        assert!(true);
        assert!(1 + 1 == 2);
    }

    #[test]
    fn test_assert_eq() {
        assert_eq!(2 + 2, 4);
        assert_eq!("hello", "hello");
    }

    #[test]
    fn test_assert_ne() {
        assert_ne!(2 + 2, 5);
        assert_ne!("hello", "world");
    }

    #[test]
    #[should_panic]
    fn test_panic_case() {
        panic!("This test is expected to panic");
    }

    #[test]
    fn test_result_return() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err("Math is broken".to_string())
        }
    }
}

fn main() {
    tests::test_basic_assertions();
    tests::test_assert_eq();
    tests::test_assert_ne();
    tests::test_result_return().unwrap();
    println!("All tests passed!");
}
