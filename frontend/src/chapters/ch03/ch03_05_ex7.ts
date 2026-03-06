import { Lesson } from '../../courses';

export const ch03_05_ex7: Lesson = {
    id: 'ch03-05-ex7',
    title: 'Bài tập 3.5.7: Tổng hợp - Mã hóa Caesar (Caesar Cipher)',
    duration: '35 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Kể từ thời Julius Caesar, thuật toán mật mã dịch vòng đã được sử dụng. Hãy cùng triển khai thuật toán này trong giới hạn ASCII chữ thường bằng vòng lặp.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm <code>caesar_cipher(text: &amp;str, shift: u8)</code> in ra bảng mã. Chúng ta không thao tác với mảng ký tự phức tạp, mà sẽ in trực tiếp từng ký tự!</li>
  <li>Dùng hàm <code>text.as_bytes()</code> để lấy mảng dữ liệu byte <code>u8</code> (Mã ASCII <code>'a'=97</code>, <code>'z'=122</code>).</li>
  <li>Sử dụng vòng lặp <code>while</code> hoặc <code>loop</code> (với biến đếm <code>i</code>) để nhảy qua từng byte <code>c</code> của mảng. (Ví dụ <code>let bytes = text.as_bytes(); bytes[i]</code>).</li>
  <li>Nếu <code>c</code> nằm trong khoảng từ <code>b'a'</code> (97) đến <code>b'z'</code> (122), hãy dịch nó đi một khoảng là <code>shift</code> (dịch các chữ cái tiến lên).
    <ul>
      <li>Ví dụ: <code>'a'</code> dịch vòng <code>3</code> sẽ thành <code>'d'</code>.</li>
      <li>Cẩn thận tràn bộ chữ: <code>'z'</code> dịch vòng <code>1</code> sẽ xoay lại thành <code>'a'</code>. Cần tính toán cẩn thận công thức modulo! <code>(((c - b'a') + shift) % 26) + b'a'</code> </li>
    </ul>
  </li>
  <li>Nếu ký tự <strong>không</strong> phải chữ in thường (ví dụ: khoảng trắng, dấu chấm...), hãy giữ nguyên không dịch nó.</li>
  <li>Ép kiểu byte vừa dịch bằng <code>as char</code> và dùng lệnh <code>print!("{}", kết_quả)</code>.</li>
</ol>
<div class="cyber-alert warning">
  <strong>Ép kiểu:</strong> Để phép tính <code>u8</code> không gặp lỗi tràn số khi cộng shift, bạn có thể cân nhắc ép sang một kiểu lớn hơn như <code>i32</code> trước khi xử lý hoặc tính toán thật cẩn thận: <code>let mut c = bytes[i];</code>
</div>
`,
    defaultCode: `fn main() {
    let message = "hello world!";
    let shift_amount = 3;
    
    print!("Original: {}\\nEncrypted: ", message);
    caesar_cipher(message, shift_amount);
    // Mục tiêu: khoor zruog!
    println!();
}

fn caesar_cipher(text: &str, shift: u8) {
    let bytes = text.as_bytes();
    let len = text.len();
    
    // Viết vòng lặp để duyệt từng byte và mã hoá!
    
}
`
};
