import { Lesson } from '../../courses';

export const ch03_02_ex: Lesson = {
      id: 'ch03-02-ex',
      title: 'Bài tập 3.2: Kiểu dữ liệu (Data Types)',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy cùng kiểm tra kiến thức của bạn về Kiểu dữ liệu, Tuple và Array!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một <strong>tuple</strong> tên là <code>my_tuple</code> chứa các giá trị sau: một số nguyên <code>500</code>, một số thực <code>6.4</code>, và một ký tự <code>'Z'</code> (Lưu ý chữ Z in hoa và dùng ngoặc đơn cho char).</li>
  <li>Giải nén (destructure) tuple đó thành 3 biến tương ứng <code>x</code>, <code>y</code>, <code>z</code>.</li>
  <li>Tạo một <strong>mảng (array)</strong> tên là <code>my_array</code> chứa 5 số nguyên đầu tiên (1, 2, 3, 4, 5).</li>
</ol>
<div class="cyber-alert info">
  Sau khi code xong, hãy nhấn <strong>Run</strong> để vượt qua bài kiểm tra!
</div>
`,
      defaultCode: `fn main() {
    // 1. Tạo tuple: my_tuple = (500, 6.4, 'Z')

    // 2. Giải nén tuple thành (x, y, z)

    // 3. Tạo array: my_array = [1, 2, 3, 4, 5]

}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_types_exercise() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code = code.replace(" ", ""); // Xóa khoảng trắng để dễ so sánh
        
        let has_tuple = code.contains("my_tuple=(500,6.4,'Z');") || code.contains("my_tuple:(i32,f64,char)=(500,6.4,'Z');");
        assert!(has_tuple, "Tuple my_tuple chưa chính xác!");

        let has_destructure = code.contains("let(x,y,z)=my_tuple;");
        assert!(has_destructure, "Bạn chưa giải nén tuple thành (x, y, z)!");

        let has_array = code.contains("my_array=[1,2,3,4,5];") || code.contains("my_array:[i32;5]=[1,2,3,4,5];");
        assert!(has_array, "Array my_array chưa chính xác!");
    }
}
`
    };
