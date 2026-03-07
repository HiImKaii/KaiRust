import { Chapter } from '../../courses';
import { ch18_01 } from './ch18_01';
import { ch18_02 } from './ch18_02';

export const ch18: Chapter = {
  id: 'ch18',
  title: 'Chương 18: OOP trong Rust',
  introduction: `
    <h2>Giới thiệu về OOP trong Rust</h2>
    <p>Rust hỗ trợ các nguyên lý OOP nhưng theo cách riêng, tận dụng strength của ownership và traits.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Object-oriented patterns:</strong> Áp dụng OOP trong Rust</li>
      <li><strong>Trait objects:</strong> Dynamic dispatch với dyn Trait</li>
      <li><strong>State pattern:</strong> Implement state machine với structs</li>
      <li><strong>Design patterns:</strong> Các patterns phổ biến trong Rust</li>
    </ul>
    <p>Rust không phải OOP language thuần túy, nhưng vẫn hỗ trợ OOP patterns hiệu quả.</p>
  `,
  lessons: [ch18_01, ch18_02]
};
