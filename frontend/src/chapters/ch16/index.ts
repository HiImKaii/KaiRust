import { Chapter } from '../../courses';
import { ch16_01 } from './ch16_01';
import { ch16_02 } from './ch16_02';
import { ch16_03 } from './ch16_03';
import { ch16_04 } from './ch16_04';

export const ch16: Chapter = {
  id: 'ch16',
  title: 'Chương 16: Fearless Concurrency (Concurrency Không Sợ Hãi)',
  introduction: `
    <h2>Fearless Concurrency - Xử lý Concurrent một cách An toàn và Hiệu quả</h2>
    <p>Handling concurrent programming một cách an toàn và hiệu quả là một trong những mục tiêu chính của Rust. Concurrent programming, trong đó các phần khác nhau của một chương trình thực hiện độc lập, và parallel programming, trong đó các phần khác nhau của một chương trình thực hiện cùng một lúc, đang ngày càng quan trọng hơn khi ngày càng nhiều máy tính tận dụng nhiều processors của chúng.</p>
    <p>Lịch sử, việc lập trình trong những ngữ cảnh này đã khó khăn và dễ bị lỗi. Rust hy vọng sẽ thay đổi điều đó.</p>
    <p>Ban đầu, Rust team nghĩ rằng đảm bảo memory safety và ngăn chặn các vấn đề concurrency là hai thách thức riêng biệt cần được giải quyết với các phương pháp khác nhau. Theo thời gian, team phát hiện rằng ownership và type systems là một tập hợp mạnh mẽ các công cụ để quản lý memory safety và các vấn đề concurrency! Bằng cách tận dụng ownership và type checking, nhiều concurrency errors là compile-time errors trong Rust thay vì runtime errors.</p>
    <p>Do đó, thay vì làm bạn tốn nhiều thời gian cố gắng tái tạo các hoàn cảnh chính xác mà một runtime concurrency bug xảy ra, code không đúng sẽ từ chối compile và đưa ra một error giải thích vấn đề. Kết quả là, bạn có thể fix code của mình trong khi đang làm việc trên nó thay vì có thể sau khi nó đã được shipping đến production.</p>
    <p>Chúng tôi đã đặt biệt danh khía cạnh này của Rust là fearless concurrency. Fearless concurrency cho phép bạn viết code không có các subtle bugs và dễ dàng refactor mà không giới thiệu các bugs mới.</p>
    <div class="cyber-alert info">
      <strong>Lưu ý:</strong> Để đơn giản, chúng ta sẽ gọi nhiều vấn đề là concurrent thay vì chính xác hơn bằng cách nói concurrent và/hoặc parallel. Trong chương này, xin hãy thay thế bằng concurrent và/hoặc parallel trong đầu khi chúng ta sử dụng concurrent.
    </div>
    <h3>Các chủ đề trong chương này:</h3>
    <ul>
      <li>→ <strong>Threads:</strong> Cách tạo threads để chạy nhiều pieces of code cùng một lúc</li>
      <li>→ <strong>Message-passing concurrency:</strong> Trong đó channels gửi messages giữa các threads</li>
      <li>→ <strong>Shared-state concurrency:</strong> Trong đó nhiều threads có quyền truy cập vào một piece of data</li>
      <li>→ <strong>Sync và Send traits:</strong> Mở rộng các concurrency guarantees của Rust cho cả user-defined types và các types được cung cấp bởi standard library</li>
    </ul>
    <p>Nhiều languages có quan điểm cứng nhắc về các giải pháp họ cung cấp để xử lý các vấn đề concurrent. Ví dụ, Erlang có chức năng message-passing concurrency thanh lịch nhưng chỉ có những cách obscure để share state giữa các threads.</p>
    <p>Rust cung cấp nhiều công cụ khác nhau để modeling problems theo bất kỳ cách nào phù hợp với situation và requirements của bạn.</p>
  `,
  lessons: [ch16_01, ch16_02, ch16_03, ch16_04]
};
