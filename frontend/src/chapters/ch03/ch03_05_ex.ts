import { Lesson } from '../../courses';

export const ch03_05_ex: Lesson = {
      id: 'ch03-05-ex',
      title: 'Bài tập 3.5: Luồng điều khiển (Control Flow)',
      duration: '15 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy sử dụng biểu thức <code>if-else</code> và kết hợp vòng lặp.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Bên dưới, có một hàm tên là <code>is_even</code>. Bạn hãy hoàn thiện <strong>logic (thân hàm)</strong> của hàm này.</li>
  <li>Hàm <code>is_even(n: i32) -> bool</code> sẽ <strong>trả về <code>true</code></strong> nếu số <code>n</code> là số chẵn, còn nếu là số lẻ thì trả về <code>false</code>.</li>
</ol>
<div class="cyber-alert info">
  <strong>Toán tử Modulo:</strong> Sử dụng <code>n % 2 == 0</code> để kiểm tra số chẵn nhé.
</div>
`,
      defaultCode: `fn main() {
    println!("4 là số chẵn? {}", is_even(4));
    println!("7 là số chẵn? {}", is_even(7));
}

fn is_even(n: i32) -> bool {
    // Hoàn thành logic if-else ở đây
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    #[test]
    fn test_is_even() {
        assert_eq!(super::is_even(2), true, "2 phải là số chẵn");
        assert_eq!(super::is_even(3), false, "3 phải là số lẻ");
        assert_eq!(super::is_even(0), true, "0 phải là số chẵn");
        assert_eq!(super::is_even(-4), true, "-4 phải là số chẵn");
        assert_eq!(super::is_even(-5), false, "-5 phải là số lẻ");
    }
}
`
    };
