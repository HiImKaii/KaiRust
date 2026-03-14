import { Chapter } from '../../courses';
import { ch09_01 } from './ch09_01';
import { ch09_02 } from './ch09_02';
import { ch09_03 } from './ch09_03';

export const ch09: Chapter = {
  id: 'ch09',
  title: 'Chương 9: Xử lý lỗi (Error Handling)',
  introduction: `
    <h2>Giới thiệu về Error Handling</h2>
    <p>Lỗi là một thực tế trong cuộc sống của phần mềm, vì vậy Rust có một số tính năng để xử lý các tình huống khi có sự cố xảy ra. Trong nhiều trường hợp, Rust yêu cầu bạn thừa nhận khả năng xảy ra lỗi và thực hiện một số hành động trước khi code của bạn sẽ biên dịch. Yêu cầu này làm cho chương trình của bạn mạnh mẽ hơn bằng cách đảm bảo rằng bạn sẽ phát hiện ra lỗi và xử lý chúng một cách thích hợp trước khi deploy code của bạn vào production!</p>

    <h3>Phân loại lỗi trong Rust</h3>
    <p>Rust nhóm các lỗi thành hai loại chính: recoverable (có thể phục hồi) và unrecoverable (không thể phục hồi). Đối với lỗi có thể phục hồi, chẳng hạn như lỗi file không tìm thấy, chúng ta hầu hết chỉ muốn báo cáo vấn đề cho người dùng và thử lại thao tác. Lỗi không thể phục hồi luôn là triệu chứng của bugs, chẳng hạn như cố gắng truy cập một vị trí ngoài phạm vi của mảng, và vì vậy chúng ta muốn dừng chương trình ngay lập tức.</p>

    <p>Hầu hết các ngôn ngữ không phân biệt giữa hai loại lỗi này và xử lý cả hai theo cùng một cách, sử dụng các cơ chế như exceptions. Rust không có exceptions. Thay vào đó, nó có kiểu Result&lt;T, E&gt; cho các lỗi có thể phục hồi và macro panic! dừng execution khi chương trình gặp lỗi không thể phục hồi.</p>

    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>panic! macro:</strong> Dừng execution khi gặp lỗi không thể phục hồi</li>
      <li>→ <strong>Result enum:</strong> Xử lý recoverable errors một cách an toàn</li>
      <li>→ <strong>Propagating errors:</strong> Sử dụng ? operator để truyền lỗi lên caller</li>
      <li>→ <strong>Custom error types:</strong> Tạo kiểu lỗi riêng cho ứng dụng</li>
    </ul>
    <p>Xử lý lỗi tốt giúp ứng dụng của bạn trở nên đáng tin cậy và dễ debug hơn.</p>
  `,
  lessons: [ch09_01, ch09_02, ch09_03]
};
