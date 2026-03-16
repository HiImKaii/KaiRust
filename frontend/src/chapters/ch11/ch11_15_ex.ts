import { Lesson } from '../../courses';

export const ch11_15_ex: Lesson = {
    id: 'ch11-15-ex',
    title: 'Bài tập 11.15: Tổng hợp Testing',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy tổng hợp tất cả kiến thức về Testing!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo một library với nhiều functions</li>
  <li>Viết đầy đủ tests cho library đó</li>
</ol>
`,
    defaultCode: `mod library {
    use std::collections::HashMap;

    pub struct Counter {
        count: i32,
    }

    impl Counter {
        pub fn new() -> Self {
            Counter { count: 0 }
        }

        pub fn increment(&mut self) {
            self.count += 1;
        }

        pub fn get(&self) -> i32 {
            self.count
        }

        pub fn reset(&mut self) {
            self.count = 0;
        }
    }

    pub fn word_count(text: &str) -> HashMap<String, usize> {
        let mut counts = HashMap::new();
        for word in text.split_whitespace() {
            *counts.entry(word.to_string()).or_insert(0) += 1;
        }
        counts
    }

    pub fn is_palindrome(s: &str) -> bool {
        let cleaned: String = s.chars()
            .filter(|c| c.is_alphanumeric())
            .map(|c| c.to_ascii_lowercase())
            .collect();
        cleaned == cleaned.chars().rev().collect::<String>()
    }

    pub fn fibonacci(n: u32) -> u64 {
        match n {
            0 => 0,
            1 => 1,
            _ => {
                let mut a = 0u64;
                let mut b = 1u64;
                for _ in 2..=n {
                    let temp = a + b;
                    a = b;
                    b = temp;
                }
                b
            }
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_counter_new() {
            let c = Counter::new();
            assert_eq!(c.get(), 0);
        }

        #[test]
        fn test_counter_increment() {
            let mut c = Counter::new();
            c.increment();
            assert_eq!(c.get(), 1);
            c.increment();
            assert_eq!(c.get(), 2);
        }

        #[test]
        fn test_counter_reset() {
            let mut c = Counter::new();
            c.increment();
            c.increment();
            c.reset();
            assert_eq!(c.get(), 0);
        }

        #[test]
        fn test_word_count() {
            let text = "hello world hello";
            let counts = word_count(text);
            assert_eq!(counts.get("hello"), Some(&2));
            assert_eq!(counts.get("world"), Some(&1));
        }

        #[test]
        fn test_is_palindrome() {
            assert!(is_palindrome("racecar"));
            assert!(is_palindrome("A man a plan a canal Panama"));
            assert!(!is_palindrome("hello"));
        }

        #[test]
        fn test_fibonacci() {
            assert_eq!(fibonacci(0), 0);
            assert_eq!(fibonacci(1), 1);
            assert_eq!(fibonacci(10), 55);
            assert_eq!(fibonacci(20), 6765);
        }
    }
}

fn main() {
    // Test Counter
    let mut counter = library::Counter::new();
    counter.increment();
    counter.increment();
    counter.increment();
    assert_eq!(counter.get(), 3);

    // Test word_count
    let counts = library::word_count("rust is great rust is awesome");
    assert_eq!(counts.get("rust"), Some(&2));
    assert_eq!(counts.get("is"), Some(&2));

    // Test is_palindrome
    assert!(library::is_palindrome("level"));
    assert!(library::is_palindrome("rotor"));
    assert!(!library::is_palindrome("hello"));

    // Test fibonacci
    assert_eq!(library::fibonacci(10), 55);

    println!("All tests passed!");
}
`,
    expectedOutput: 'All tests passed!',
    testCases: [
        {
            input: 'library::fibonacci(10)',
            expectedOutput: '55',
            description: 'Fibonacci(10) = 55'
        }
    ]
};
