import { Chapter } from '../../courses';
import { ch14_01 } from './ch14_01';
import { ch14_02 } from './ch14_02';
import { ch14_03 } from './ch14_03';
import { ch14_04 } from './ch14_04';
import { ch14_05 } from './ch14_05';
import { ch14_01_ex } from './ch14_01_ex';
import { ch14_02_ex, ch14_03_ex, ch14_04_ex, ch14_05_ex, ch14_06_ex, ch14_07_ex, ch14_08_ex, ch14_09_ex, ch14_10_ex, ch14_11_ex, ch14_12_ex, ch14_13_ex, ch14_14_ex, ch14_15_ex } from './ch14_exercises';

export const ch14: Chapter = {
  id: 'ch14',
  title: 'Chương 14: Cargo và Crates.io',
  introduction: `
    <h2>Giới thiệu về Cargo và Crates.io</h2>
    <p>Cho đến nay, chúng ta chỉ sử dụng các tính năng cơ bản nhất của Cargo để build, chạy và test code của mình, nhưng nó có thể làm được nhiều hơn thế. Trong chương này, chúng ta sẽ thảo luận về một số tính năng nâng cao khác của nó để chỉ cho bạn cách làm những điều sau đây:</p>
    <ul>
      <li>→ <strong>Tùy chỉnh build thông qua release profiles:</strong> Cấu hình tối ưu hóa cho development và production</li>
      <li>→ <strong>Publish thư viện trên crates.io:</strong> Chia sẻ code của bạn với cộng đồng Rust</li>
      <li>→ <strong>Tổ chức large projects với workspaces:</strong> Quản lý nhiều crates trong một project</li>
      <li>→ <strong>Cài đặt binaries từ crates.io:</strong> Sử dụng công cụ từ cộng đồng</li>
      <li>→ <strong>Mở rộng Cargo với custom commands:</strong> Tự động hóa các tác vụ</li>
    </ul>
    <p>Cargo có thể làm được nhiều hơn nữa so với những gì chúng ta cover trong chương này, vì vậy để có giải thích đầy đủ về tất cả các tính năng của nó, hãy xem tài liệu của Cargo.</p>
  `,
  lessons: [
    ch14_01, ch14_01_ex, ch14_02, ch14_02_ex,
    ch14_03, ch14_03_ex, ch14_04, ch14_04_ex,
    ch14_05, ch14_05_ex, ch14_06_ex, ch14_07_ex,
    ch14_08_ex, ch14_09_ex, ch14_10_ex, ch14_11_ex,
    ch14_12_ex, ch14_13_ex, ch14_14_ex, ch14_15_ex,
  ]
};
