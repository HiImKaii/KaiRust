import { Chapter } from '../../courses';
import { ch11_01 } from './ch11_01';
import { ch11_02 } from './ch11_02';
import { ch11_03 } from './ch11_03';

export const ch11: Chapter = {
  id: 'ch11',
  title: 'Chương 11: Viết Automated Tests',
  introduction: `
    <h2>Giới thiệu về Automated Testing</h2>
    <p>Testing là phần quan trọng trong phát triển phần mềm. Rust cung cấp framework testing tích hợp sẵn.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li>→ <strong>Unit Tests:</strong> Viết test trong cùng file với code</li>
      <li>→ <strong>Integration Tests:</strong> Test tương tác giữa các modules</li>
      <li>→ <strong>Doc Tests:</strong> Chạy code ví dụ trong documentation</li>
      <li>→ <strong>Test organization:</strong> Tổ chức test hiệu quả</li>
    </ul>
    <p>Viết test giúp code của bạn đáng tin cậy và dễ refactor hơn.</p>
  `,
  lessons: [ch11_01, ch11_02, ch11_03]
};
