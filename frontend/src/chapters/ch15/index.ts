import { Chapter } from '../../courses';
import { ch15_01 } from './ch15_01';
import { ch15_02 } from './ch15_02';

export const ch15: Chapter = {
  id: 'ch15',
  title: 'Chương 15: Smart Pointers',
  introduction: `
    <h2>Giới thiệu về Smart Pointers</h2>
    <p>Smart pointers là cấu trúc dữ liệu hoạt động như pointers nhưng có thêm metadata và capabilities đặc biệt.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Box&lt;T&gt;:</strong> Heap allocation đơn giản</li>
      <li>→ <strong>Rc&lt;T&gt;:</strong> Reference counting cho multiple owners</li>
      <li>→ <strong>RefCell&lt;T&gt;:</strong> Interior mutability pattern</li>
      <li>→ <strong>Rc&lt;RefCell&lt;T&gt;&gt;:</strong> Kết hợp cho nhiều owners với mutability</li>
    </ul>
    <p>Smart pointers mở rộng khả năng của ownership trong Rust.</p>
  `,
  lessons: [ch15_01, ch15_02]
};
