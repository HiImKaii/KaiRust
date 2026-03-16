import { Lesson } from '../../courses';

export const ch11_07_ex: Lesson = {
    id: 'ch11-07-ex',
    title: 'Bài tập 11.7: Test Organization',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành tổ chức tests!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tổ chức tests theo module</li>
  <li>Sử dụng #[cfg(test)] module</li>
</ol>
`,
    defaultCode: `mod tests {
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
`,
    expectedOutput: 'All tests passed!',
    testCases: [
        {
            input: 'basic',
            expectedOutput: 'true',
            description: 'Basic assertions'
        }
    ]
};
