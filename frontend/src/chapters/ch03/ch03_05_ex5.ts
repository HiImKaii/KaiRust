import { Lesson } from '../../courses';

export const ch03_05_ex5: Lesson = {
    id: 'ch03-05-ex5',
    title: 'Bài tập 3.5.5: Tổng hợp - Máy tính Mini (Mini Calculator)',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy cùng xây dựng một chiếc máy tính mini để củng cố kỹ năng về hàm, biểu thức <code>if-else</code> lồng nhau và <code>tuple</code>!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm <code>calculate(a: f64, b: f64, op: char) -&gt; (bool, f64)</code>.</li>
  <li>Hàm nhận vào 2 số thực <code>a</code>, <code>b</code> và một toán tử <code>op</code> (các ký tự <code>'+'</code>, <code>'-'</code>, <code>'*'</code>, <code>'/'</code>).</li>
  <li>Hàm trả về một <strong>tuple</strong> gồm 2 phần tử: <code>(has_error, result)</code>.
    <ul>
      <li><code>has_error</code> (kiểu <code>bool</code>): Bằng <code>true</code> nếu có lỗi (ví dụ chia cho 0 hoặc toán tử không hợp lệ), ngược lại là <code>false</code>.</li>
      <li><code>result</code> (kiểu <code>f64</code>): Kết quả phép tính. Nếu có lỗi, kết quả có thể trả về <code>0.0</code>.</li>
    </ul>
  </li>
  <li>Sử dụng cấu trúc <code>if else if</code> lồng nhau (hoặc các khối lệnh if nối tiếp) để kiểm tra các toán tử. <em>Lưu ý: chưa học lệnh match, vây nên bắt buộc phải dùng lệnh if.</em></li>
  <li>Trong hàm <code>main()</code>, tôi đã viết sẵn một số ca kiểm thử nhằm gọi hàm <code>calculate</code> của bạn. Hãy đảm bảo mọi thứ chạy trơn tru!</li>
</ol>
<div class="cyber-alert warning">
  <strong>Cảnh báo (Panic):</strong> Nếu bạn chia đại một số cho <code>0.0</code> (f64), Rust sẽ sinh ra kết quả vô cực (<code>inf</code>) chứ không bị crash giống như số nguyên đâu nhé! Nhưng với yêu cầu bài này, bạn bắt buộc phải kiểm tra thủ công mẫu số <code>b == 0.0</code> khi <code>op == '/'</code>, nếu đúng thì coi là có lỗi (<code>has_error = true</code>).
</div>
`,
    defaultCode: `fn main() {
    let (err1, res1) = calculate(10.0, 5.0, '+');
    println!("10 + 5 = {} (Lỗi: {})", res1, err1);

    let (err2, res2) = calculate(10.0, 0.0, '/');
    println!("10 / 0 = {} (Lỗi: {})", res2, err2);

    let (err3, res3) = calculate(5.0, 2.0, '%');
    println!("5 % 2 = {} (Lỗi: {})", res3, err3);
}

// Định nghĩa hàm calculate của bạn ở đây:
fn calculate(a: f64, b: f64, op: char) -> (bool, f64) {
    // Viết code logic xử lý if-else tại đây.
    
    // (Lưu ý: nhớ rào trường hợp các toán tử không hợp lệ)
    
}
`
};
