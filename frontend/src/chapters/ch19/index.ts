import { Chapter } from '../../courses';
import { ch19_01 } from './ch19_01';
import { ch19_02 } from './ch19_02';
import { ch19_03 } from './ch19_03';
import { ch19_01_ex } from './ch19_01_ex';
import { ch19_02_ex } from './ch19_02_ex';
import { ch19_03_ex } from './ch19_03_ex';
import { ch19_04_ex } from './ch19_04_ex';
import { ch19_05_ex } from './ch19_05_ex';
import { ch19_06_ex } from './ch19_06_ex';
import { ch19_07_ex } from './ch19_07_ex';
import { ch19_08_ex, ch19_09_ex, ch19_14_ex, ch19_15_ex } from './ch19_08_ex';
import { ch19_10_ex } from './ch19_10_ex';
import { ch19_11_ex } from './ch19_11_ex';
import { ch19_12_ex } from './ch19_12_ex';
import { ch19_13_ex } from './ch19_13_ex';

export const ch19: Chapter = {
  id: 'ch19',
  title: 'Chương 19: Patterns và Matching',
  introduction: `
    <h2>Patterns và Matching</h2>
    <p>Patterns là một cú pháp đặc biệt trong Rust để so khớp với cấu trúc của các kiểu dữ liệu.</p>
  `,
  lessons: [
    ch19_01, ch19_01_ex, ch19_02, ch19_02_ex,
    ch19_03, ch19_03_ex, ch19_04_ex, ch19_05_ex,
    ch19_06_ex, ch19_07_ex, ch19_08_ex, ch19_09_ex,
    ch19_10_ex, ch19_11_ex, ch19_12_ex, ch19_13_ex,
    ch19_14_ex, ch19_15_ex,
  ]
};
