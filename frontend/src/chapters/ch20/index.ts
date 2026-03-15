import { Chapter } from '../../courses';
import { ch20_01 } from './ch20_01';
import { ch20_02 } from './ch20_02';
import { ch20_03 } from './ch20_03';

export const ch20: Chapter = {
  id: 'ch20',
  title: 'Chương 20: Tính Năng Nâng Cao',
  introduction: `
    <h2>Tính Năng Nâng Cao</h2>
    <p>Đến giờ, bạn đã học các phần thường được sử dụng nhất của ngôn ngữ lập trình Rust. Trước khi chúng ta làm thêm một dự án nữa, ở Chương 21, chúng ta sẽ xem xét một số khía cạnh của ngôn ngữ mà bạn có thể gặp thỉnh thoảng nhưng có thể không sử dụng mỗi ngày. Bạn có thể sử dụng chương này như một tài liệu tham khảo khi bạn gặp bất kỳ điều gì chưa biết. Các tính năng được đề cập ở đây hữu ích trong các tình huống rất cụ thể. Mặc dù bạn có thể không sử dụng chúng thường xuyên, chúng tôi muốn đảm bảo bạn nắm được tất cả các tính năng mà Rust cung cấp.</p>
    <p>Trong chương này, chúng ta sẽ bao gồm:</p>
    <ul>
      <li>→ <strong>Unsafe Rust:</strong> Cách từ chối một số đảm bảo của Rust và chịu trách nhiệm thủ công duy trì các đảm bảo đó</li>
      <li>→ <strong>Advanced traits:</strong> Associated types, default type parameters, fully qualified syntax, supertraits, và newtype pattern liên quan đến traits</li>
      <li>→ <strong>Advanced types:</strong> Thêm về newtype pattern, type aliases, never type, và dynamically sized types</li>
      <li>→ <strong>Advanced functions và closures:</strong> Function pointers và returning closures</li>
      <li>→ <strong>Macros:</strong> Các cách để định nghĩa code định nghĩa thêm code tại thời điểm biên dịch</li>
    </ul>
    <p>Đây là một loạt các tính năng của Rust có gì đó cho mọi người! Hãy đi sâu vào!</p>
  `,
  lessons: [ch20_01, ch20_02, ch20_03]
};
