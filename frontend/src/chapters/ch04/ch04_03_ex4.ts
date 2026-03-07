import { Lesson } from '../../courses';

export const ch04_03_ex4: Lesson = {
    id: 'ch04_03_ex4',
    title: 'Bài tập Khó: Tokenizer Trích xuất Từ Khoá',
    duration: '15 phút',
    type: 'practice',
    content: `
<p>Bạn là kỹ sư xây dựng ra trình biên dịch cho ngôn ngữ lập trình <strong>KaiiScript</strong>! Đầu tiên, bạn phải biến chuỗi thô của lập trình viên thành một mảng các khái niệm (Token).</p>
<p>Ví dụ đầu vào: <code>"let x = 10"</code> sẽ có 4 từ bị ngăn cách bởi khoảng trắng: <code>"let"</code>, <code>"x"</code>, <code>"="</code>, <code>"10"</code>.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Viết hàm <code>count_tokens(s: &str) -> usize</code>. Nó duyệt qua chuỗi bằng slices/bytes, và cứ phát hiện bất cứ lượng ký tự liên tiếp nào (không phải dấu cách) thì tính là 1 Token. Số lượng Token cách nhau bằng bao nhiêu đấu cách cũng được. (Ở đây đếm số lượng token chứ chưa cần tách mảng).</p>
`,
  defaultCode: `fn main() {
    let source_code = "   let  x =    100   ;  ";
    let token_count = count_tokens(source_code);
    println!("Số lượng tokens là: {}", token_count);
}

fn count_tokens(s: &str) -> usize {
    let bytes = s.as_bytes();
    let mut count = 0;
    let mut in_word = false;

    for &item in bytes.iter() {
        // Nếu kí tự là khoảng trắng b' '
        // ... Cập nhật in_word false
        
        // Nếu kí tự không phải khoảng trắng và in_word == false
        // ... Tức là bắt đầu một từ/token mới. Tăng count! 
    }

    count
}
`,
  expectedOutput: 'Số lượng tokens là: 5' // let, x, =, 100, ;
};
