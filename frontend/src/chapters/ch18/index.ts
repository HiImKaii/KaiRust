import { Chapter } from '../../courses';
import { ch18_01 } from './ch18_01';
import { ch18_02 } from './ch18_02';
import { ch18_03 } from './ch18_03';

export const ch18: Chapter = {
  id: 'ch18',
  title: 'Chương 18: Các Tính Năng Lập Trình Hướng Đối Tượng',
  introduction: `
    <h2>Các Tính Năng Lập Trình Hướng Đối Tượng</h2>
    <p>Lập trình hướng đối tượng (OOP) là một cách mô hình hóa các chương trình. Các đối tượng như một khái niệm lập trình đã được giới thiệu trong ngôn ngữ lập trình Simula vào những năm 1960. Những đối tượng đó đã ảnh hưởng đến kiến trúc lập trình của Alan Kay trong đó các đối tượng truyền tin nhắn cho nhau. Để mô tả kiến trúc này, ông đã tạo ra thuật ngữ lập trình hướng đối tượng vào năm 1967. Nhiều định nghĩa cạnh tranh mô tả OOP là gì, và theo một số định nghĩa này Rust là hướng đối tượng nhưng theo những định nghĩa khác thì không. Trong chương này, chúng ta sẽ khám phá một số đặc điểm thường được coi là hướng đối tượng và cách những đặc điểm đó chuyển đổi sang Rust idiomatic. Sau đó, chúng tôi sẽ chỉ cho bạn cách triển khai một design pattern hướng đối tượng trong Rust và thảo luận về trade-offs của việc đó so với việc triển khai một giải pháp sử dụng một số điểm mạnh của Rust thay vào đó.</p>
    <h3>Các chủ đề trong chương này:</h3>
    <ul>
      <li>→ <strong>Traits như Interfaces:</strong> Định nghĩa behavior chung</li>
      <li>→ <strong>Trait Objects:</strong> Dynamic dispatch với dyn Trait</li>
      <li>→ <strong>State Pattern:</strong> Triển khai state machine</li>
      <li>→ <strong>Object-Oriented Patterns trong Rust:</strong> Áp dụng OOP patterns</li>
      <li>→ <strong>Trade-offs:</strong> So sánh OOP với Rust idioms</li>
    </ul>
  `,
  lessons: [ch18_01, ch18_02, ch18_03]
};
