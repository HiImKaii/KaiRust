import { Chapter } from '../../courses';
import { ch03_01 } from './ch03_01';
import { ch03_02 } from './ch03_02';
import { ch03_03 } from './ch03_03';
import { ch03_04 } from './ch03_04';
import { ch03_05 } from './ch03_05';

import { ch03_01_ex } from './ch03_01_ex';
import { ch03_01_ex2 } from './ch03_01_ex2';
import { ch03_01_ex3 } from './ch03_01_ex3';

import { ch03_02_ex } from './ch03_02_ex';
import { ch03_02_ex2 } from './ch03_02_ex2';
import { ch03_02_ex3 } from './ch03_02_ex3';

import { ch03_03_ex } from './ch03_03_ex';
import { ch03_03_ex2 } from './ch03_03_ex2';

import { ch03_05_ex } from './ch03_05_ex';
import { ch03_05_ex2 } from './ch03_05_ex2';
import { ch03_05_ex3 } from './ch03_05_ex3';
import { ch03_05_ex4 } from './ch03_05_ex4';
import { ch03_05_ex5 } from './ch03_05_ex5';
import { ch03_05_ex6 } from './ch03_05_ex6';
import { ch03_05_ex7 } from './ch03_05_ex7';
import { ch03_05_ex8 } from './ch03_05_ex8';

export const ch03: Chapter = {
  id: 'ch03',
  title: 'Chương 3: Các khái niệm lập trình phổ biến',
  introduction: `
    <h2>Giới thiệu các khái niệm lập trình phổ biến</h2>
    <p>Chương này sẽ giới thiệu các khái niệm lập trình cơ bản mà bạn sẽ thường xuyên sử dụng trong Rust và hầu hết các ngôn ngữ lập trình khác.</p>
    <h3>Những gì bạn sẽ học:</h3>
    <ul>
      <li><strong>Biến và tính bất biến (Variables & Mutability):</strong> Hiểu sự khác biệt giữa let và let mut, tại sao Rust mặc định là bất biến</li>
      <li><strong>Kiểu dữ liệu (Data Types):</strong> Scalar types (integers, floats, booleans, characters) và Compound types (tuples, arrays)</li>
      <li><strong>Hàm (Functions):</strong> Cách định nghĩa và gọi hàm, tham số và giá trị trả về</li>
      <li><strong>Câu lệnh điều kiện (Control Flow):</strong> if/else, match expressions</li>
      <li><strong>Vòng lặp (Loops):</strong> loop, while, for - và cách Rust xử lý vòng lặp an toàn</li>
    </ul>
    <p>Nắm vững những khái niệm này là nền tảng quan trọng để tiếp tục học các chương nâng cao hơn của Rust.</p>
  `,
  lessons: [
    ch03_01, ch03_01_ex, ch03_01_ex2, ch03_01_ex3,
    ch03_02, ch03_02_ex, ch03_02_ex2, ch03_02_ex3,
    ch03_03, ch03_03_ex, ch03_03_ex2,
    ch03_04,
    ch03_05, ch03_05_ex, ch03_05_ex2, ch03_05_ex3, ch03_05_ex4, ch03_05_ex5, ch03_05_ex6, ch03_05_ex7, ch03_05_ex8
  ]
};
