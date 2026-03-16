import { Lesson } from '../../courses';

export const ch11_05_ex: Lesson = {
    id: 'ch11-05-ex',
    title: 'Bài tập 11.5: Unit Tests trong Module',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành viết unit tests trong module!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo một module với function</li>
  <li>Viết tests trong module đó</li>
  <li>Sử dụng #[cfg(test)] để đánh dấu test module</li>
</ol>
`,
    defaultCode: `mod calculator {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn subtract(a: i32, b: i32) -> i32 {
        a - b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    pub fn divide(a: i32, b: i32) -> i32 {
        if b == 0 {
            panic!("Cannot divide by zero");
        }
        a / b
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_add() {
            assert_eq!(add(2, 3), 5);
            assert_eq!(add(-1, 1), 0);
        }

        #[test]
        fn test_subtract() {
            assert_eq!(subtract(5, 3), 2);
            assert_eq!(subtract(3, 5), -2);
        }

        #[test]
        fn test_multiply() {
            assert_eq!(multiply(3, 4), 12);
            assert_eq!(multiply(-2, 3), -6);
        }

        #[test]
        #[should_panic]
        fn test_divide_by_zero() {
            divide(10, 0);
        }
    }
}

fn main() {
    use calculator::*;
    assert_eq!(add(2, 3), 5);
    assert_eq!(subtract(5, 3), 2);
    assert_eq!(multiply(3, 4), 12);
    assert_eq!(divide(10, 2), 5);
    println!("Tests passed!");
}
`,
    expectedOutput: 'Tests passed!',
    testCases: [
        {
            input: 'calculator::add(2, 3)',
            expectedOutput: '5',
            description: '2 + 3 = 5'
        }
    ]
};
