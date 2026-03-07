import { Chapter } from '../../courses';
import { ch08_01 } from './ch08_01';
import { ch08_02 } from './ch08_02';
import { ch08_03 } from './ch08_03';

export const ch08: Chapter = {
  id: 'ch08',
  title: 'Chương 8: Collections phổ biến',
  introduction: `
    <h2>Giới thiệu về Collections</h2>
    <p>Rust cung cấp các collection types mạnh mẽ trong thư viện chuẩn, cho phép lưu trữ và thao tác với nhiều giá trị.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Vector (Vec&lt;T&gt;):</strong> Mảng động có thể thay đổi kích thước</li>
      <li><strong>String và &amp;str:</strong> Xử lý văn bản trong Rust</li>
      <li><strong>HashMap:</strong> Lưu trữ key-value pairs với hiệu suất cao</li>
      <li><strong>Iterators và Methods:</strong> Cách thao tác với collections</li>
    </ul>
    <p>Collections là công cụ thiết yếu cho hầu hết các ứng dụng Rust.</p>
  `,
  lessons: [ch08_01, ch08_02, ch08_03]
};
