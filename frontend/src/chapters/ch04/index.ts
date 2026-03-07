import { Chapter } from '../../courses';
import { ch04_01 } from './ch04_01';
import { ch04_01_ex1 } from './ch04_01_ex1';
import { ch04_01_ex2 } from './ch04_01_ex2';
import { ch04_01_ex3 } from './ch04_01_ex3';
import { ch04_02 } from './ch04_02';
import { ch04_02_ex1 } from './ch04_02_ex1';
import { ch04_02_ex2 } from './ch04_02_ex2';
import { ch04_02_ex3 } from './ch04_02_ex3';
import { ch04_03 } from './ch04_03';
import { ch04_03_ex1 } from './ch04_03_ex1';
import { ch04_03_ex2 } from './ch04_03_ex2';
import { ch04_03_ex3 } from './ch04_03_ex3';
import { ch04_03_ex4 } from './ch04_03_ex4';
import { ch04_03_ex5 } from './ch04_03_ex5';
import { ch04_03_ex6 } from './ch04_03_ex6';

export const ch04: Chapter = {
  id: 'ch04',
  title: 'Chương 4: Hiểu về Ownership',
  introduction: `
    <h2>Giới thiệu về Ownership</h2>
    <p>Ownership là tính năng độc đáo nhất của Rust, cho phép đảm bảo an toàn bộ nhớ mà không cần garbage collector.</p>
    <p>Mỗi giá trị trong Rust có một "owner" (người sở hữu), và khi owner ra khỏi scope, giá trị đó sẽ được tự động giải phóng.</p>
    <h3>Tại sao Ownership quan trọng?</h3>
    <ul>
      <li><strong>An toàn bộ nhớ:</strong> Không có null pointers, dangling pointers, hay data races</li>
      <li><strong>Không cần GC:</strong> Bộ nhớ được quản lý tự động ở compile time</li>
      <li><strong>Hiệu suất cao:</strong> Không có overhead như garbage collector</li>
    </ul>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Quy tắc Ownership:</strong> Ba quy tắc cốt lõi của Rust</li>
      <li><strong>Borrowing:</strong> Tham chiếu (&) - borrow mà không sở hữu</li>
      <li><strong>Lifetimes:</strong> Đảm bảo tham chiếu luôn hợp lệ</li>
      <li><strong>Slice types:</strong> Tham chiếu đến một phần của collection</li>
    </ul>
    <p>Đây là chương quan trọng nhất để hiểu Rust. Hãy dành thời gian để nắm vững!</p>
  `,
  lessons: [
    ch04_01,
    ch04_01_ex1,
    ch04_01_ex2,
    ch04_01_ex3,
    ch04_02,
    ch04_02_ex1,
    ch04_02_ex2,
    ch04_02_ex3,
    ch04_03,
    ch04_03_ex1,
    ch04_03_ex2,
    ch04_03_ex3,
    ch04_03_ex4,
    ch04_03_ex5,
    ch04_03_ex6,
  ]
};
