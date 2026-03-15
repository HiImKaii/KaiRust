import { Chapter } from '../../courses';
import { ch19_01 } from './ch19_01';
import { ch19_02 } from './ch19_02';

export const ch19: Chapter = {
  id: 'ch19',
  title: 'Chương 19: Patterns và Matching',
  introduction: `
    <h2>Patterns và Matching</h2>
    <p>Patterns là một cú pháp đặc biệt trong Rust để so khớp (matching) với cấu trúc của các kiểu dữ liệu, cả phức tạp và đơn giản. Việc sử dụng patterns kết hợp với các biểu thức match và các cấu trúc khác cho phép bạn kiểm soát nhiều hơn luồng điều khiển của chương trình. Một pattern bao gồm sự kết hợp của các thành phần sau:</p>
    <ul>
      <li>→ <strong>Literals:</strong> Các giá trị literal (hằng số)</li>
      <li>→ <strong>Destructured:</strong> Arrays, enums, structs, hoặc tuples được destructure</li>
      <li>→ <strong>Variables:</strong> Các biến</li>
      <li>→ <strong>Wildcards:</strong> Ký tự đại diện (_)</li>
      <li>→ <strong>Placeholders:</strong> Các placeholder</li>
    </ul>
    <p>Một số ví dụ về patterns bao gồm <code>x</code>, <code>(a, 3)</code>, và <code>Some(Color::Red)</code>. Trong ngữ cảnh mà patterns có hiệu lực, các thành phần này mô tả hình dạng (shape) của dữ liệu. Chương trình của chúng ta sau đó so khớp các giá trị với patterns để xác định xem liệu nó có đúng hình dạng dữ liệu để tiếp tục chạy một đoạn code cụ thể hay không.</p>
    <p>Để sử dụng một pattern, chúng ta so sánh nó với một giá trị. Nếu pattern khớp với giá trị, chúng ta sử dụng các phần của giá trị đó trong code của mình. Hãy nhớ lại các biểu thức match trong Chương 6 sử dụng patterns, chẳng hạn như ví dụ về máy phân loại tiền xu. Nếu giá trị phù hợp với hình dạng của pattern, chúng ta có thể sử dụng các phần đã được đặt tên. Nếu không, code liên quan đến pattern đó sẽ không được thực thi.</p>
    <p>Chương này là tài liệu tham khảo về mọi thứ liên quan đến patterns. Chúng ta sẽ tìm hiểu các vị trí hợp lệ để sử dụng patterns, sự khác biệt giữa refutable và irrefutable patterns, cũng như các loại cú pháp pattern khác nhau mà bạn có thể gặp. Đến cuối chương, bạn sẽ biết cách sử dụng patterns để thể hiện nhiều khái niệm một cách rõ ràng.</p>
  `,
  lessons: [ch19_01, ch19_02]
};
