import { Lesson } from '../../courses';

export const ch03_01_ex: Lesson = {
      id: 'ch03-01-ex',
      title: 'Bài tập 3.1: Biến (Variables)',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy cùng kiểm tra kiến thức của bạn về Biến và Tính bất biến!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến <strong>bất biến</strong> tên là <code>x</code> và gán cho nó giá trị <code>5</code>.</li>
  <li>Sau đó, tạo một biến <strong>khả biến (mutable)</strong> tên là <code>y</code> và gán cho nó giá trị <code>10</code>.</li>
  <li>Cuối cùng, hãy thay đổi giá trị của <code>y</code> thành <code>20</code>.</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Sử dụng từ khóa <code>mut</code> cho biến có thể thay đổi giá trị. Sau khi hoàn thành, hãy nhấn <strong>Run</strong> để hệ thống chấm điểm!
</div>
`,
      defaultCode: `fn main() {
    // 1. Tạo biến bất biến x = 5

    // 2. Tạo biến khả biến y = 10

    // 3. Thay đổi giá trị của y thành 20

    // (Code tự động in ra để bạn xem thử)
    // println!("x = {}, y = {}", x, y);
}
`
    };
