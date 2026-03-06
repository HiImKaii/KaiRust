import { Lesson } from '../../courses';

export const ch03_03_ex2: Lesson = {
    id: 'ch03-03-ex2',
    title: 'Bài tập 3.3.2: Hàm trả về nhiều giá trị (Tuple)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Một tính năng cực kỳ mạnh mẽ của Rust là các hàm có thể trả về một Tuple để truyền nhiều kết quả khác nhau cùng lúc!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Bên dưới hàm <code>main()</code>, hãy viết một hàm tên là <code>calculate_length</code>.</li>
  <li>Hàm <code>calculate_length</code> <strong>nhận vào một tham số</strong> <code>s</code> có kiểu <code>String</code>.</li>
  <li>Hàm này phải <strong>trả về một tuple</strong> chứa 2 giá trị: bản thân chuỗi <code>s</code> đó (kiểu <code>String</code>) và độ dài của chuỗi (kiểu <code>usize</code>).</li>
  <li>Sử dụng phương thức <code>s.len()</code> để lấy độ dài của chuỗi. Tuple được trả về có kiểu là <code>(String, usize)</code>.</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Tuple trong Rust có dạng <code>(giá trị 1, giá trị 2)</code>. Hãy dùng tuple làm biểu thức cuối cùng (expression) để trả về từ hàm.
</div>
`,
    defaultCode: `fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("Độ dài của chuỗi '{}' là {}.", s2, len);
}

// Viết hàm calculate_length ở đây nha!

`
};
