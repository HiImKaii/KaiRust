import { Chapter } from '../../courses';
import { ch10_01 } from './ch10_01';
import { ch10_02 } from './ch10_02';
import { ch10_03 } from './ch10_03';

export const ch10: Chapter = {
  id: 'ch10',
  title: 'Chương 10: Generics, Traits, Lifetimes',
  introduction: `
    <h2>Giới thiệu về Generics, Traits, và Lifetimes</h2>
    <p>Đây là các tính năng nâng cao cho phép bạn viết code linh hoạt và tái sử dụng được trong Rust.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Generics:</strong> Viết code hoạt động với nhiều kiểu dữ liệu</li>
      <li><strong>Traits:</strong> Định nghĩa hành vi chia sẻ giữa các types</li>
      <li><strong>Trait Bounds:</strong> Giới hạn kiểu dữ liệu generic</li>
      <li><strong>Lifetimes:</strong> Đảm bảo tham chiếu luôn hợp lệ</li>
      <li><strong>Advanced Patterns:</strong> Kết hợp generics với traits</li>
    </ul>
    <p>Nắm vững những khái niệm này sẽ giúp bạn viết code Rust chuyên nghiệp.</p>
  `,
  lessons: [ch10_01, ch10_02, ch10_03]
};
