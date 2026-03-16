import { Chapter } from '../../courses';
import { ch13_01 } from './ch13_01';
import { ch13_02 } from './ch13_02';
import { ch13_03 } from './ch13_03';
import { ch13_04 } from './ch13_04';
import { ch13_01_ex } from './ch13_01_ex';
import { ch13_02_ex } from './ch13_02_ex';
import { ch13_03_ex } from './ch13_03_ex';
import { ch13_04_ex } from './ch13_04_ex';
import { ch13_05_ex } from './ch13_05_ex';
import { ch13_06_ex } from './ch13_06_ex';
import { ch13_07_ex } from './ch13_07_ex';
import { ch13_08_ex } from './ch13_08_ex';
import { ch13_09_ex } from './ch13_09_ex';
import { ch13_10_ex } from './ch13_10_ex';
import { ch13_11_ex } from './ch13_11_ex';
import { ch13_12_ex } from './ch13_12_ex';
import { ch13_13_ex } from './ch13_13_ex';
import { ch13_14_ex } from './ch13_14_ex';
import { ch13_15_ex } from './ch13_15_ex';

export const ch13: Chapter = {
  id: 'ch13',
  title: 'Chương 13: Tính năng ngôn ngữ Functional: Closures và Iterators',
  introduction: `
    <h2>Giới thiệu về Closures và Iterators</h2>
    <p>Thiết kế của Rust đã lấy cảm hứng từ nhiều ngôn ngữ và kỹ thuật hiện có, và một ảnh hưởng đáng kể là lập trình hàm. Lập trình theo phong cách hàm thường bao gồm việc sử dụng các hàm như các giá trị bằng cách truyền chúng trong các đối số, trả về chúng từ các hàm khác, gán chúng cho các biến để thực thi sau, và vân vân.</p>

    <p>Trong chương này, chúng ta sẽ không tranh luận về vấn đề lập trình hàm là gì hay không phải là gì mà sẽ thảo luận về một số tính năng của Rust tương tự như các tính năng trong nhiều ngôn ngữ thường được gọi là functional.</p>

    <p>Cụ thể, chúng ta sẽ cover:</p>

    <ul>
      <li>→ <strong>Closures</strong>, một cấu trúc giống như hàm bạn có thể lưu trữ trong một biến</li>
      <li>→ <strong>Iterators</strong>, một cách để xử lý một chuỗi các elements</li>
      <li>→ <strong>Cách sử dụng closures và iterators</strong> để cải thiện project I/O trong Chương 12</li>
      <li>→ <strong>Hiệu suất của closures và iterators</strong> (spoiler alert: Chúng nhanh hơn bạn có thể nghĩ!)</li>
    </ul>

    <p>Chúng ta đã cover một số tính năng Rust khác, như pattern matching và enums, cũng bị ảnh hưởng bởi phong cách functional. Vì việc thành thạo closures và iterators là một phần quan trọng của việc viết code Rust nhanh, idiomatic, chúng ta sẽ dành toàn bộ chương này cho chúng.</p>
  `,
  lessons: [
    ch13_01, ch13_01_ex, ch13_02, ch13_02_ex,
    ch13_03, ch13_03_ex, ch13_04, ch13_04_ex,
    ch13_05_ex, ch13_06_ex, ch13_07_ex, ch13_08_ex,
    ch13_09_ex, ch13_10_ex, ch13_11_ex, ch13_12_ex,
    ch13_13_ex, ch13_14_ex, ch13_15_ex,
  ]
};
