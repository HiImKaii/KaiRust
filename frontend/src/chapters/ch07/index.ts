import { Chapter } from '../../courses';
import { ch07_01 } from './ch07_01';
import { ch07_02 } from './ch07_02';
import { ch07_03 } from './ch07_03';

export const ch07: Chapter = {
  id: 'ch07',
  title: 'Chương 7: Quản lý Packages, Crates, Modules',
  introduction: `
    <h2>Giới thiệu về Packages, Crates, và Modules</h2>
    <p>Rust có một hệ thống module mạnh mẽ cho phép bạn tổ chức code, kiểm soát visibility, và tái sử dụng code một cách hiệu quả.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Packages và Crates:</strong> Hiểu sự khác biệt và cách tổ chức project</li>
      <li><strong>Modules:</strong> Tổ chức code thành các module với từ khóa mod</li>
      <li><strong>Paths và use:</strong> Cách import và truy cập items từ module khác</li>
      <li><strong>Visibility:</strong> Sử dụng pub để kiểm soát truy cập</li>
      <li><strong>External crates:</strong> Sử dụng thư viện bên ngoài từ crates.io</li>
    </ul>
    <p>Nắm vững hệ thống module giúp code của bạn dễ đọc và dễ bảo trì hơn.</p>
  `,
  lessons: [ch07_01, ch07_02, ch07_03]
};
