import { Chapter } from '../../courses';
import { ch09_01 } from './ch09_01';
import { ch09_02 } from './ch09_02';
import { ch09_03 } from './ch09_03';

export const ch09: Chapter = {
  id: 'ch09',
  title: 'Chương 9: Xử lý lỗi (Error Handling)',
  introduction: `
    <h2>Giới thiệu về Error Handling</h2>
    <p>Rust có cơ chế xử lý lỗi mạnh mẽ, phân biệt rõ ràng giữa recoverable và unrecoverable errors.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Result enum:</strong> Xử lý recoverable errors một cách an toàn</li>
      <li>→ <strong>panic! macro:</strong> Xử lý unrecoverable errors</li>
      <li>→ <strong>Propagating errors:</strong> Sử dụng ? operator để truyền lỗi lên caller</li>
      <li>→ <strong>Custom error types:</strong> Tạo kiểu lỗi riêng cho ứng dụng</li>
    </ul>
    <p>Xử lý lỗi tốt giúp ứng dụng của bạn trở nên đáng tin cậy và dễ debug hơn.</p>
  `,
  lessons: [ch09_01, ch09_02, ch09_03]
};
