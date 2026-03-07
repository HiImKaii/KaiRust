import { Lesson } from '../../courses';

export const ch04_02_ex1: Lesson = {
    id: 'ch04_02_ex1',
    title: 'Bài tập: Tham chiếu Bất biến (Immutable Borrow)',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Trả đi trả lại ownership là một quá trình nhàm chán. Thay vào đó, nếu bạn không có ý định chỉnh sửa giá trị, bạn chỉ nên cho hàm <strong>mượn tham chiếu bất biến</strong> của nó thay vì đưa vào như là biến được Move.</p>
<p>Vì mượn là reference bất biến, String gốc ở hàm cha sẽ hoàn toàn an toàn và không bị thả \`drop\` sau khi hàm thực thi xong.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Cập nhật hàm <code>calculate_len</code> để nhận tham số kiểu <code>&String</code> thay vì <code>String</code>. Ở hàm main, hãy truyền tham chiếu bằng dấu <code>&</code> khi gọi hàm.</p>
`,
  defaultCode: `fn main() {
    let text = String::from("Tôi yêu Rust");
    
    // Gọi hàm một cách mượn (đặt dấu & trước text)
    let length = calculate_len(text); 
    
    // text vẫn phải còn nguyên vẹn sau khi gọi hàm!
    println!("Độ dài của chuỗi '{}' là {} byte.", text, length);
}

// Hàm này đang ăn cắp ownership gây lỗi ở main. Sửa đối số s thành &String.
fn calculate_len(s: String) -> usize {
    s.len()
}
`,
  expectedOutput: 'Độ dài của chuỗi \'Tôi yêu Rust\' là 14 byte.' // Tính theo byte UTF-8
};
