import { Chapter } from '../../courses';
import { ch13_01 } from './ch13_01';
import { ch13_02 } from './ch13_02';

export const ch13: Chapter = {
  id: 'ch13',
  title: 'Chương 13: Closures và Iterators',
  introduction: `
    <h2>Giới thiệu về Closures và Iterators</h2>
    <p>Closures và Iterators là hai tính năng lập trình hàm mạnh mẽ trong Rust, cho phép viết code ngắn gọn và hiệu quả.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Closures:</strong> Hàm ẩn danh có thể capture môi trường</li>
      <li>→ <strong>Closure types:</strong> Fn, FnMut, FnOnce - hiểu sự khác biệt</li>
      <li>→ <strong>Iterators:</strong> Duyệt qua collection một cách lazy</li>
      <li>→ <strong>Iterator adapters:</strong> map, filter, take, skip...</li>
      <li>→ <strong>Iterator consumers:</strong> collect, fold, sum...</li>
    </ul>
    <p>Những tính năng này giúp code của bạn trở nên functional và declarative hơn.</p>
  `,
  lessons: [ch13_01, ch13_02]
};
