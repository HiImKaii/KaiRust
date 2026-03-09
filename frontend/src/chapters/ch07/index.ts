import { Chapter } from '../../courses';
import { ch07_01 } from './ch07_01';
import { ch07_01_ex } from './ch07_01_ex';
import { ch07_02 } from './ch07_02';
import { ch07_02_ex } from './ch07_02_ex';
import { ch07_03 } from './ch07_03';
import { ch07_03_ex } from './ch07_03_ex';
import { ch07_04_ex } from './ch07_04_ex';
import { ch07_05_ex } from './ch07_05_ex';

export const ch07: Chapter = {
  id: 'ch07',
  title: 'Chương 7: Quản lý Packages, Crates, Modules',
  introduction: `
    <h2>Giới thiệu về Packages, Crates, và Modules</h2>
    <p>Rust có một hệ thống module mạnh mẽ cho phép bạn tổ chức code, kiểm soát visibility, và tái sử dụng code một cách hiệu quả.</p>

    <h3>Tại sao cần hệ thống module?</h3>
    <p>Khi dự án lớn dần, việc nhóm code có chức năng liên quan vào các module giúp:</p>
    <ul>
      <li>Dễ quản lý và bảo trì</li>
      <li>Kiểm soát visibility (private/public)</li>
      <li>Tái sử dụng code</li>
      <li>Tránh xung đột tên</li>
    </ul>

    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Packages và Crates:</strong> Hiểu sự khác biệt và cách tổ chức project</li>
      <li>→ <strong>Modules:</strong> Tổ chức code với từ khóa mod</li>
      <li>→ <strong>Paths và use:</strong> Import và truy cập items</li>
      <li>→ <strong>Visibility:</strong> Sử dụng pub để kiểm soát truy cập</li>
      <li>→ <strong>External crates:</strong> Sử dụng thư viện từ crates.io</li>
    </ul>
  `,
  lessons: [
    ch07_01,           // Lý thuyết: Packages và Crates
    ch07_01_ex,        // Bài tập: Modules cơ bản
    ch07_02,           // Lý thuyết: Modules & Visibility
    ch07_02_ex,        // Bài tập: pub và Visibility
    ch07_03,           // Lý thuyết: use và Paths
    ch07_03_ex,        // Bài tập: use và Paths
    ch07_04_ex,        // Bài tập: Tổ chức Library
    ch07_05_ex,        // Bài tập: Xây dựng Library hoàn chỉnh
  ]
};
