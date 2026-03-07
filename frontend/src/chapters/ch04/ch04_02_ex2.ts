import { Lesson } from '../../courses';

export const ch04_02_ex2: Lesson = {
    id: 'ch04_02_ex2',
    title: 'Bài tập: Tham chiếu Có thể thay đổi (Mutable Borrow)',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Nếu bạn muốn cấp quyền cho một hàm khác sửa đổi chuỗi cho bạn mà không truyền ownership, thì hãy giao cho họ một <strong>Mutable Reference</strong> bằng cú pháp <code>&mut</code>.</p>
<p>Nhớ rằng mọi thứ đều chặt chẽ: String của bạn định truyền đi CŨNG PHẢI có bản chất ban đầu là <code>mut</code>.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Thêm các từ hạn định \`mut\` cần thiết vào bên trong khai báo hàm main, sau đó cấp quyền <code>&mut</code> khi gọi hàm \`append_text\`. Tiếp theo, cập nhật hàm nhận tham số bằng tham chiếu <code>&mut String</code>.</p>
`,
  defaultCode: `fn main() {
    let message = String::from("Xin chào"); // Biến này cần trở thành mutable
    
    // Truyền mutable reference thay vì truyền trực tiếp 
    append_text(message); 
    
    println!("Nội dung sau cùng: {}", message);
}

// Cho hàm quyền thay đổi chuỗi trực tiếp
fn append_text(s: String) {
    s.push_str(", bạn tôi!");
}
`,
  expectedOutput: 'Nội dung sau cùng: Xin chào, bạn tôi!'
};
