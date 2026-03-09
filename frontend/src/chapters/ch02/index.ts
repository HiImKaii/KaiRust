import { Chapter } from '../../courses';
import { ch02_01 } from './ch02_01';
import { ch02_02 } from './ch02_02';
import { ch02_03 } from './ch02_03';
import { ch02_04 } from './ch02_04';
import { ch02_05 } from './ch02_05';
import { ch02_01_ex } from './ch02_01_ex';
import { ch02_04_ex } from './ch02_04_ex';
import { ch02_05_ex } from './ch02_05_ex';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số (Programming a Guessing Game)',
  introduction: `
    <h2>Giới thiệu về trò chơi đoán số</h2>
    <p>Trong chương này, chúng ta sẽ cùng xây dựng một trò chơi đoán số kinh điển - một dự án thực hành giúp bạn nắm vững các khái niệm cơ bản của Rust.</p>
    <p>Trò chơi này sẽ yêu cầu người chơi đoán một số ngẫu nhiên từ 1 đến 100, với phản hồi cho biết số đoán lớn hơn hay nhỏ hơn số bí mật.</p>
    <h3>Bạn sẽ học được gì?</h3>
    <ul class="task-list">
      <li>→ <strong>Biến và kiểu dữ liệu:</strong> Cách khai báo và sử dụng biến trong Rust</li>
      <li>→ <strong>Hàm và tham số:</strong> Cách tạo và gọi hàm</li>
      <li>→ <strong>Điều kiện và vòng lặp:</strong> Sử dụng if/else và loop/while/for</li>
      <li>→ <strong>Sinh số ngẫu nhiên:</strong> Sử dụng crate rand</li>
      <li>→ <strong>Xử lý input/output:</strong> Đọc từ bàn phím và in ra màn hình</li>
      <li>→ <strong>So sánh giá trị:</strong> Hiểu cách so sánh và match kết quả</li>
    </ul>
    <p>Đây là dự án hoàn hảo để áp dụng những gì bạn đã học về Rust cơ bản. Hãy bắt đầu!</p>
  `,
  lessons: [ch02_01, ch02_02, ch02_03, ch02_04, ch02_05, ch02_01_ex, ch02_04_ex, ch02_05_ex]
};
