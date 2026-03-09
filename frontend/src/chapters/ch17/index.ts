import { Chapter } from '../../courses';
import { ch17_01 } from './ch17_01';
import { ch17_02 } from './ch17_02';

export const ch17: Chapter = {
  id: 'ch17',
  title: 'Chương 17: Async và Await',
  introduction: `
    <h2>Giới thiệu về Async/Await</h2>
    <p>Async/await cho phép viết asynchronous code theo cách đồng bộ, rất hữu ích cho I/O operations như network requests.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Async/await:</strong> Cú pháp async trong Rust</li>
      <li>→ <strong>Futures:</strong> Hiểu về Future trait</li>
      <li>→ <strong>Runtime:</strong> Sử dụng tokio hoặc async-std</li>
      <li>→ <strong>Async traits:</strong> Traits với async methods</li>
    </ul>
    <p>Async/await là kỹ năng quan trọng cho các ứng dụng network và web.</p>
  `,
  lessons: [ch17_01, ch17_02]
};
