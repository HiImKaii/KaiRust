import { Chapter } from '../../courses';
import { ch19_01 } from './ch19_01';
import { ch19_02 } from './ch19_02';

export const ch19: Chapter = {
  id: 'ch19',
  title: 'Chương 19: Patterns và Matching',
  introduction: `
    <h2>Giới thiệu về Patterns và Matching</h2>
    <p>Patterns là cú pháp mạnh mẽ để match và destructure dữ liệu, kết hợp với match expression cho code rõ ràng và an toàn.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Match expressions:</strong> Pattern matching với match</li>
      <li><strong>Destructuring:</strong> Trích xuất giá trị từ structs, tuples, enums</li>
      <li><strong>Guard clauses:</strong> Thêm điều kiện với if trong patterns</li>
      <li><strong>at patterns:</strong> Sử dụng @ để bind giá trị</li>
      <li><strong>Patterns in different contexts:</strong> if let, while let, for loops</li>
    </ul>
    <p>Patterns giúp code trở nên expressive và exhaustively checked.</p>
  `,
  lessons: [ch19_01, ch19_02]
};
