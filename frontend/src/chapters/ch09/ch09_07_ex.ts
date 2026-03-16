import { Lesson } from '../../courses';

export const ch09_07_ex: Lesson = {
    id: 'ch09-07-ex',
    title: 'Bài tập 9.7: ? với Option',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng ? operator với Option!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function get_first(v: &[i32]) -> Option&lt;i32&gt;</li>
  <li>Tạo function double_first(v: &[i32]) -> Option&lt;i32&gt;</li>
  <li>Sử dụng ? operator để unwrap Option</li>
</ol>
`,
    defaultCode: `fn get_first(v: &[i32]) -> Option<i32> {
    // Trả về Some(phần tử đầu tiên) hoặc None
    unimplemented!()
}

fn double_first(v: &[i32]) -> Option<i32> {
    // Lấy phần tử đầu tiên và nhân đôi
    // Sử dụng ? operator
    unimplemented!()
}

fn add_first_two(v: &[i32]) -> Option<i32> {
    // Lấy hai phần tử đầu tiên và cộng lại
    unimplemented!()
}

fn main() {
    let numbers = vec![10, 20, 30];

    // Test get_first
    match get_first(&numbers) {
        Some(n) => println!("First: {}", n),
        None => println!("Empty"),
    }

    // Test double_first
    match double_first(&numbers) {
        Some(n) => println!("Double first: {}", n),
        None => println!("Empty"),
    }

    // Test với vector rỗng
    let empty: Vec<i32> = vec![];
    match double_first(&empty) {
        Some(n) => println!("Double first: {}", n),
        None => println!("Empty vector"),
    }
}
`,
    expectedOutput: 'First: 10\nDouble first: 20\nEmpty vector',
    testCases: [
        {
            input: 'get_first([10, 20, 30])',
            expectedOutput: '10',
            description: 'Lấy phần tử đầu tiên = 10'
        },
        {
            input: 'double_first([10, 20, 30])',
            expectedOutput: '20',
            description: 'Nhân đôi phần tử đầu tiên = 20'
        }
    ]
};
