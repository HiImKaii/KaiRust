import { Chapter } from '../../courses';
import { ch08_01 } from './ch08_01';
import { ch08_01_ex } from './ch08_01_ex';
import { ch08_02 } from './ch08_02';
import { ch08_02_ex } from './ch08_02_ex';
import { ch08_03 } from './ch08_03';
import { ch08_03_ex } from './ch08_03_ex';
import { ch08_04_ex } from './ch08_04_ex';
import { ch08_05_ex } from './ch08_05_ex';
import { ch08_06_ex } from './ch08_06_ex';

export const ch08: Chapter = {
  id: 'ch08',
  title: 'Chương 8: Collections phổ biến',
  introduction: `
    <h2>Common Collections</h2>
    <p>Thư viện chuẩn của Rust bao gồm một số cấu trúc dữ liệu rất hữu ích được gọi là collections. Hầu hết các kiểu dữ liệu khác đại diện cho một giá trị cụ thể, nhưng collections có thể chứa nhiều giá trị. Không giống như các kiểu array và tuple được tích hợp sẵn, dữ liệu mà các collections này trỏ đến được lưu trữ trên heap, có nghĩa là lượng dữ liệu không cần biết tại thời điểm biên dịch và có thể tăng hoặc giảm khi chương trình chạy. Mỗi loại collection có các khả năng và chi phí khác nhau, và việc chọn một collection phù hợp cho tình huống hiện tại là một kỹ năng bạn sẽ phát triển theo thời gian.</p>
    <p>Trong chương này, chúng ta sẽ thảo luận về ba collections được sử dụng rất nhiều trong các chương trình Rust:</p>
    <ul>
      <li>→ <strong>Vector</strong> cho phép bạn lưu trữ một số lượng giá trị biến đổi cạnh nhau.</li>
      <li>→ <strong>String</strong> là một tập hợp các ký tự. Chúng ta đã đề cập đến kiểu String trước đó, nhưng trong chương này, chúng ta sẽ nói về nó chi tiết.</li>
      <li>→ <strong>Hash map</strong> cho phép bạn liên kết một giá trị với một khóa cụ thể. Nó là một implementation cụ thể của cấu trúc dữ liệu tổng quát hơn được gọi là map.</li>
    </ul>
    <p>Để tìm hiểu về các loại collections khác được cung cấp bởi thư viện chuẩn, hãy xem tài liệu.</p>
    <p>Chúng ta sẽ thảo luận cách tạo và cập nhật vectors, strings, và hash maps, cũng như điều gì làm cho mỗi loại đặc biệt.</p>
  `,
  lessons: [
    ch08_01,           // Lý thuyết: Vector
    ch08_01_ex,        // Bài tập: Vector cơ bản
    ch08_02_ex,        // Bài tập: Vector nâng cao
    ch08_02,           // Lý thuyết: Strings
    ch08_03_ex,        // Bài tập: Strings
    ch08_03,           // Lý thuyết: HashMap
    ch08_04_ex,        // Bài tập: HashMap
    ch08_05_ex,        // Bài tập: Iterators
    ch08_06_ex,        // Bài tập: Todo List App
  ]
};
