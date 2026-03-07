import { Lesson } from '../../courses';

export const ch04_03_ex1: Lesson = {
    id: 'ch04_03_ex1',
    title: 'Bài tập: Sử dụng String Slice',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Bạn đã biết về \`first_word\`, hàm tìm từ đầu tiên của một chuỗi dựa trên khoảng trắng. Lần này, nhiệm vụ là tìm từ thứ 2.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Viết hàm <code>second_word</code> nhận vào một \`&String\` và trả về một slice \`&str\` tương ứng với từ thứ 2. Giả định chuỗi luôn có ít nhất 2 từ cách nhau bởi khoảng trắng đơn (bắt đầu bằng một từ, sau đó là khoảng trắng, sau đó là từ tiếp theo).</p>
`,
  defaultCode: `fn main() {
    let my_string = String::from("Rust Tutorial on Slices");
    let word2 = second_word(&my_string);
    println!("Từ thứ hai là: {}", word2);
}

fn second_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    let mut first_space = 0;

    // Tìm vị trí của khoảng trắng đầu tiên
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            first_space = i;
            break;
        }
    }

    // Viết tiếp vòng lặp ở đây để tìm khoảng trắng thứ hai! (Nếu còn từ 2)
    // Sau đó trả về slice tương ứng!
    
}
`,
  expectedOutput: 'Từ thứ hai là: Tutorial'
};
