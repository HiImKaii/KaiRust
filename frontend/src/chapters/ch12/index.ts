import { Chapter } from '../../courses';
import { ch12_01 } from './ch12_01';
import { ch12_02 } from './ch12_02';

export const ch12: Chapter = {
  id: 'ch12',
  title: 'Chương 12: Dự án I/O: grep CLI',
  introduction: `
    <h2>Giới thiệu về dự án grep CLI</h2>
    <p>Chương này sẽ hướng dẫn bạn xây dựng một công cụ command-line tương tự grep - một trong những công cụ phổ biến nhất trong Unix/Linux.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Command-line arguments:</strong> Xử lý arguments với clap</li>
      <li>→ <strong>File reading:</strong> Đọc file và thư mục</li>
      <li>→ <strong>Pattern matching:</strong> Tìm kiếm với regular expressions</li>
      <li>→ <strong>Error handling:</strong> Xử lý lỗi file I/O</li>
      <li>→ <strong>Modular code:</strong> Tổ chức code thành modules</li>
    </ul>
    <p>Đây là dự án thực tế giúp bạn áp dụng kiến thức đã học.</p>
  `,
  lessons: [ch12_01, ch12_02]
};
