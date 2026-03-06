import { Lesson } from '../../courses';

export const ch03_05_ex8: Lesson = {
    id: 'ch03-05-ex8',
    title: 'Bài tập 3.5.8: Tổng hợp - Cellular Automaton 1D',
    duration: '45 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy xây dựng một hệ thống mô phỏng sinh thái một chiều đơn giản (lấy cảm hứng từ Game of Life). Chúng ta làm việc trên một mảng tĩnh chứa các ô. Có 2 trạng thái: Sống (1) và Chết (0).</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, tôi đã cho bạn một quần thể có chứa vài tế bào: <code>let mut cells = [0, 0, 1, 0, 1, 0, 0, 1, 0];</code> (mảng 9 phần tử).</li>
  <li>Chúng ta sẽ cho tự nhiên diễn biến lặp đi lặp lại <code>3</code> Thế hệ (Generation). Hãy bọc mã của bạn trong một vòng lặp ngoài lớn (ví dụ chạy 3 lần).</li>
  <li>Từng thế hệ, tiến hành quy tắc sinh tồn đơn giản sau cho từng ô (cell) từ thứ index <code>0</code> đến <code>8</code>:
    <ul>
      <li>Hãy lấy giá trị các ô <em>hàng xóm</em>. Ô bên trái có chỉ số <code>i-1</code>, ô bên phải có <code>i+1</code>.</li>
      <li>(LƯU Ý: Với ô vị trí <code>0</code> thì ô bên trái coi như là giá trị 0. Với gốc phải cùng vị trí <code>8</code>, ô bên phải coi như bằng 0).</li>
      <li>Tính số lượng hàng xóm đã sống (sum).</li>
      <li><strong>Quy tắc (Rule):</strong> Nếu chính nó đang sống (1) thì nó cần có đủ điều kiện môi trường. Nếu sum = 1, ô sống sót. Các trường hợp còn lại ô chết do quá chật hoặc neo đơn. Nếu ô đang chết (0) mà có đúng số sum = 1, nó sinh sôi (về 1). Các trạng thái khác vẫn là 0.</li>
    </ul>
  </li>
  <li>Do bạn duyệt mảng và có thể ảnh hưởng liên hoàn nếu sửa ngay trực tiếp (Cell 0 mới tính xong sẽ làm Cell 1 tính sai so với thế hệ Cũ), bạn cần phải sử dụng 1 biến mảng tạm <code>let mut next_cells = cells;</code> để sửa. Khi thế hệ xong, cập nhật <code>cells = next_cells;</code></li>
  <li>In mảng <code>cells</code> của thế hệ mới.</li>
</ol>
<div class="cyber-alert info">
  <strong>Vòng lặp bên ngoài, vòng lặp bên trong:</strong> Một bài tập rèn tư duy đỉnh cao! Đừng để bị loạn số index của mảng nhé. Dùng <code>if</code> lồng trong <code>loop/while</code>.
</div>
`,
    defaultCode: `fn main() {
    let mut cells = [0, 0, 1, 0, 1, 0, 0, 1, 0];
    let generations = 3;

    println!("Gen 0: {:?}", cells);

    // Bắt đầu vòng lặp cho các thế hệ
    // Mỗi thế hệ, duyệt các ô. Đặt giá trị mới vào next_cells.
    let mut gen_count = 1;
    while gen_count <= generations {
        // let mut next_cells = cells;
        // Viết vòng lặp tính toán sự sống chết cho next_cells...
        
        // cells = next_cells;
        // println!("Gen {}: {:?}", gen_count, cells);
        gen_count += 1;
    }
}
`
};
