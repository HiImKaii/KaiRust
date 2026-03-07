import { Chapter } from '../../courses';
import { ch05_01 } from './ch05_01';
import { ch05_02 } from './ch05_02';
import { ch05_03 } from './ch05_03';

export const ch05: Chapter = {
  id: 'ch05',
  title: 'Chương 5: Sử dụng Structs',
  introduction: `
    <h2>Giới thiệu về Structs</h2>
    <p>Struct (cấu trúc) cho phép bạn đóng gói các dữ liệu có liên quan thành một đơn vị duy nhất, tương tự như class trong các ngôn ngữ OOP.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Struct cơ bản:</strong> Định nghĩa và sử dụng struct với named fields</li>
      <li><strong>Tuple Structs:</strong> Struct không có tên trường, hữu ích cho các kiểu dữ liệu đặc biệt</li>
      <li><strong>Method Syntax:</strong> Định nghĩa method cho struct với impl</li>
      <li><strong>Associated Functions:</strong> Hàm liên kết với struct, không cần self</li>
    </ul>
    <p>Struct là nền tảng để xây dựng các kiểu dữ liệu phức tạp trong Rust.</p>
  `,
  lessons: [ch05_01, ch05_02, ch05_03]
};
