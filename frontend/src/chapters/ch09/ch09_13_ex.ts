import { Lesson } from '../../courses';

export const ch09_13_ex: Lesson = {
    id: 'ch09-13-ex',
    title: 'Bài tập 9.13: Result trong Closures',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng Result trong closures!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Sử dụng .map() với closure</li>
  <li>Sử dụng .filter_map() để lọc và transform</li>
  <li>Sử dụng .collect() để thu thập Results</li>
</ol>
`,
    defaultCode: `fn main() {
    let numbers = vec!["1", "2", "abc", "4", "hello", "6"];

    // Parse tất cả strings thành numbers
    // Lọc bỏ các strings không hợp lệ
    let parsed: Vec<i32> = numbers
        .iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();

    println!("Parsed: {:?}", parsed);

    // Nhân đôi các số hợp lệ
    let doubled: Vec<i32> = parsed.iter().map(|x| x * 2).collect();
    println!("Doubled: {:?}", doubled);

    // Cộng tất cả
    let sum: i32 = parsed.iter().sum();
    println!("Sum: {}", sum);
}
`,
    expectedOutput: 'Parsed: [1, 2, 4, 6]\nDoubled: [2, 4, 8, 12]\nSum: 13',
    testCases: [
        {
            input: 'sum',
            expectedOutput: '13',
            description: 'Tổng = 1 + 2 + 4 + 6 = 13'
        }
    ]
};
