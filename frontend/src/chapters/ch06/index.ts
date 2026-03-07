import { Chapter } from '../../courses';
import { ch06_01 } from './ch06_01';
import { ch06_02 } from './ch06_02';
import { ch06_03 } from './ch06_03';

export const ch06: Chapter = {
  id: 'ch06',
  title: 'Chương 6: Enums và Pattern Matching',
  introduction: `
    <h2>Giới thiệu về Enums và Pattern Matching</h2>
    <p>Enums cho phép bạn định nghĩa một kiểu dữ liệu có thể là một trong nhiều variants. Kết hợp với Pattern Matching, bạn có thể xử lý các trường hợp khác nhau một cách an toàn và rõ ràng.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Enum cơ bản:</strong> Định nghĩa enum với nhiều variants</li>
      <li><strong>Enum với dữ liệu:</strong> Mỗi variant có thể chứa dữ liệu khác nhau</li>
      <li><strong>Option enum:</strong> Kiểu an toàn thay thế cho null</li>
      <li><strong>Pattern Matching với match:</strong> Xử lý từng variant một cách toàn diện</li>
      <li><strong>if let:</strong> Rút gọn code khi chỉ quan tâm một trường hợp</li>
    </ul>
    <p>Enums và Pattern Matching là công cụ mạnh mẽ để viết code an toàn và dễ bảo trì.</p>
  `,
  lessons: [ch06_01, ch06_02, ch06_03]
};
