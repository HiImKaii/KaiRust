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
    <h2>Giới thiệu về Collections</h2>
    <p>Rust cung cấp các collection types mạnh mẽ trong thư viện chuẩn, cho phép lưu trữ và thao tác với nhiều giá trị.</p>

    <h3>Tại sao cần Collections?</h3>
    <ul>
      <li><strong>Vector:</strong> Mảng động, lưu nhiều giá trị cùng kiểu</li>
      <li><strong>String:</strong> Xử lý văn bản UTF-8</li>
      <li><strong>HashMap:</strong> Lưu trữ key-value với hiệu suất cao</li>
      <li><strong>Iterators:</strong> Duyệt và thao tác với collections</li>
    </ul>

    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Vector (Vec&lt;T&gt;):</strong> Mảng động có thể thay đổi kích thước</li>
      <li><strong>String và &amp;str:</strong> Xử lý văn bản trong Rust</li>
      <li><strong>HashMap:</strong> Lưu trữ key-value pairs với hiệu suất cao</li>
      <li><strong>Iterators và Methods:</strong> Cách thao tác với collections</li>
    </ul>
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
