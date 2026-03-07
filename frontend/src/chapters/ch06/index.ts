import { Chapter } from '../../courses';
import { ch06_01 } from './ch06_01';
import { ch06_01_ex } from './ch06_01_ex';
import { ch06_02 } from './ch06_02';
import { ch06_02_ex } from './ch06_02_ex';
import { ch06_03 } from './ch06_03';
import { ch06_03_ex } from './ch06_03_ex';
import { ch06_04_ex } from './ch06_04_ex';
import { ch06_05_ex } from './ch06_05_ex';
import { ch06_06_ex } from './ch06_06_ex';
import { ch06_07_ex } from './ch06_07_ex';
import { ch06_08_ex } from './ch06_08_ex';
import { ch06_09_ex } from './ch06_09_ex';
import { ch06_10_ex } from './ch06_10_ex';

export const ch06: Chapter = {
  id: 'ch06',
  title: 'Chương 6: Enums và Pattern Matching',
  introduction: `
    <h2>Giới thiệu về Enums và Pattern Matching</h2>
    <p>Enums cho phép bạn định nghĩa một kiểu dữ liệu có thể là một trong nhiều variants. Kết hợp với Pattern Matching, bạn có thể xử lý các trường hợp khác nhau một cách an toàn và rõ ràng.</p>

    <h3>Tại sao cần Enum?</h3>
    <p>Hãy tưởng tượng bạn cần mô tả trạng thái của một kết nối mạng: đang kết nối, đã kết nối, lỗi, hoặc đóng. Thay vì dùng các con số hoặc string (rất dễ nhầm lẫn), Enum cho phép bạn định nghĩa rõ ràng từng trạng thái có thể có.</p>

    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Enum cơ bản:</strong> Định nghĩa enum với nhiều variants</li>
      <li><strong>Enum với dữ liệu:</strong> Mỗi variant có thể chứa dữ liệu khác nhau</li>
      <li><strong>Option enum:</strong> Kiểu an toàn thay thế cho null</li>
      <li><strong>Pattern Matching với match:</strong> Xử lý từng variant một cách toàn diện</li>
      <li><strong>if let / while let:</strong> Cú pháp rút gọn cho các trường hợp đơn giản</li>
      <li><strong>Result<T, E>:</strong> Enum xử lý lỗi</li>
    </ul>
    <p>Enums và Pattern Matching là công cụ mạnh mẽ giúp code an toàn hơn - trình biên dịch sẽ báo lỗi nếu bạn quên xử lý một trường hợp nào đó!</p>
  `,
  lessons: [
    ch06_01,           // Lý thuyết: Định nghĩa Enum
    ch06_01_ex,        // Bài tập: Enum cơ bản (Day, Status)
    ch06_04_ex,        // Bài tập: Enum cơ bản (TrafficLight, Season)
    ch06_02,           // Lý thuyết: Pattern Matching với match
    ch06_02_ex,        // Bài tập: Pattern Matching (Message)
    ch06_05_ex,        // Bài tập: Enum với dữ liệu (Shape)
    ch06_03,           // Lý thuyết: if let / while let
    ch06_03_ex,        // Bài tập: if let
    ch06_06_ex,        // Bài tập: Option<T> nâng cao
    ch06_07_ex,        // Bài tập: Result<T, E>
    ch06_08_ex,        // Bài tập: Kết hợp Enum + Pattern
    ch06_09_ex,        // Bài tập: Binary Tree với Enum
    ch06_10_ex,        // Bài tập: Linked List với Enum (Dự án tổng hợp)
  ]
};
