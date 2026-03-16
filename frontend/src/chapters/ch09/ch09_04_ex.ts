import { Lesson } from '../../courses';

export const ch09_04_ex: Lesson = {
    id: 'ch09-04-ex',
    title: 'Bài tập 9.4: unwrap và expect',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng unwrap() và expect()!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo function get_first_element() sử dụng .unwrap()</li>
  <li>Tạo function safe_get_element() sử dụng .expect() với thông báo lỗi tùy chỉnh</li>
  <li>So sánh sự khác biệt giữa unwrap và expect</li>
</ol>
`,
    defaultCode: `fn get_first_element(v: &[i32]) -> i32 {
    // Sử dụng unwrap() để lấy phần tử đầu tiên
    unimplemented!()
}

fn safe_get_element(v: &[i32], index: usize) -> i32 {
    // Sử dụng expect() với thông báo lỗi tùy chỉnh
    unimplemented!()
}

fn main() {
    let numbers = vec![10, 20, 30];

    // Test get_first_element
    let first = get_first_element(&numbers);
    println!("Phần tử đầu tiên: {}", first);

    // Test safe_get_element
    let element = safe_get_element(&numbers, 1);
    println!("Phần tử thứ 1: {}", element);

    println!("Chương trình chạy thành công!");
}
`,
    expectedOutput: 'Phần tử đầu tiên: 10\nPhần tử thứ 1: 20\nChương trình chạy thành công!',
    testCases: [
        {
            input: 'get_first_element([10, 20, 30])',
            expectedOutput: '10',
            description: 'Lấy phần tử đầu tiên = 10'
        },
        {
            input: 'safe_get_element([10, 20, 30], 1)',
            expectedOutput: '20',
            description: 'Lấy phần tử thứ 1 = 20'
        }
    ]
};
