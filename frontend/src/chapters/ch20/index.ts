import { Chapter } from '../../courses';
import { ch20_01 } from './ch20_01';
import { ch20_02 } from './ch20_02';
import { ch20_03 } from './ch20_03';

export const ch20: Chapter = {
  id: 'ch20',
  title: 'Chương 20: Advanced Features',
  introduction: `
    <h2>Giới thiệu về Advanced Features</h2>
    <p>Chương cuối cùng giới thiệu các tính năng nâng cao của Rust, giúp bạn viết code chuyên nghiệp và tối ưu.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Unsafe Rust:</strong> Bypassing compiler checks khi cần thiết</li>
      <li>→ <strong>Advanced traits:</strong> Associated types, supertraits, blanket implementations</li>
      <li>→ <strong>Advanced types:</strong> Newtype pattern, type aliases, never type</li>
      <li>→ <strong>Advanced functions:</strong> Function pointers, returning closures</li>
      <li>→ <strong>Macros:</strong> Declarative và procedural macros</li>
    </ul>
    <p>Chương này hoàn thiện hành trình học Rust của bạn!</p>
  `,
  lessons: [ch20_01, ch20_02, ch20_03]
};
