import { Chapter } from '../../courses';
import { ch16_01 } from './ch16_01';
import { ch16_02 } from './ch16_02';
import { ch16_03 } from './ch16_03';

export const ch16: Chapter = {
  id: 'ch16',
  title: 'Chương 16: Concurrency (Đa luồng)',
  introduction: `
    <h2>Giới thiệu về Concurrency</h2>
    <p>Concurrency cho phép chương trình thực hiện nhiều tác vụ đồng thời. Rust đảm bảo thread safety ở compile time.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Threads:</strong> Tạo và quản lý threads với spawn</li>
      <li>→ <strong>Message passing:</strong> Giao tiếp giữa các threads qua channels</li>
      <li>→ <strong>Shared state:</strong> Mutex và Arc cho shared data</li>
      <li>→ <strong>Sync và Send:</strong> Traits đảm bảo thread safety</li>
    </ul>
    <p>Rust cho phép viết concurrent code an toàn mà không lo data races.</p>
  `,
  lessons: [ch16_01, ch16_02, ch16_03]
};
