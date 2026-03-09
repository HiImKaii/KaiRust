import { Chapter } from '../../courses';
import { ch05_01 } from './ch05_01';
import { ch05_02 } from './ch05_02';
import { ch05_03 } from './ch05_03';
import { ch05_01_ex } from './ch05_01_ex';
import { ch05_02_ex } from './ch05_02_ex';
import { ch05_03_ex } from './ch05_03_ex';
import { ch05_04_ex } from './ch05_04_ex';
import { ch05_05_ex } from './ch05_05_ex';
import { ch05_06_ex } from './ch05_06_ex';
import { ch05_07_ex } from './ch05_07_ex';
import { ch05_08_ex } from './ch05_08_ex';
import { ch05_09_ex } from './ch05_09_ex';
import { ch05_10_ex } from './ch05_10_ex';

export const ch05: Chapter = {
  id: 'ch05',
  title: 'Chương 5: Sử dụng Structs',
  introduction: `
    <h2>Giới thiệu về Structs</h2>
    <p>Struct (cấu trúc) cho phép bạn đóng gói các dữ liệu có liên quan thành một đơn vị duy nhất, tương tự như class trong các ngôn ngữ OOP.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Struct cơ bản:</strong> Định nghĩa và sử dụng struct với named fields</li>
      <li>→ <strong>Tuple Structs:</strong> Struct không có tên trường, hữu ích cho các kiểu dữ liệu đặc biệt</li>
      <li>→ <strong>Unit-Like Structs:</strong> Struct không có fields</li>
      <li>→ <strong>Debug và Derive:</strong> Cách in và debug struct với #[derive(...)]</li>
      <li>→ <strong>Method Syntax:</strong> Định nghĩa method cho struct với impl</li>
      <li>→ <strong>Associated Functions:</strong> Hàm liên kết với struct, không cần self</li>
      <li>→ <strong>Multiple impl Blocks:</strong> Nhiều impl blocks cho cùng struct</li>
    </ul>
    <p>Struct là nền tảng để xây dựng các kiểu dữ liệu phức tạp trong Rust.</p>
  `,
  lessons: [
    ch05_01,
    ch05_01_ex,
    ch05_02,
    ch05_02_ex,
    ch05_03,
    ch05_03_ex,
    ch05_04_ex,
    ch05_05_ex,
    ch05_06_ex,
    ch05_07_ex,
    ch05_08_ex,
    ch05_09_ex,
    ch05_10_ex
  ]
};
