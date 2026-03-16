import { Chapter } from '../../courses';
import { ch20_01 } from './ch20_01';
import { ch20_02 } from './ch20_02';
import { ch20_03 } from './ch20_03';
import { ch20_04 } from './ch20_04';
import { ch20_05 } from './ch20_05';
import { ch20_01_ex, ch20_02_ex, ch20_03_ex, ch20_04_ex, ch20_05_ex } from './ch20_01_ex';
import { ch20_06_ex, ch20_07_ex, ch20_08_ex, ch20_09_ex, ch20_10_ex } from './ch20_06_ex';
import { ch20_11_ex } from './ch20_11_ex';
import { ch20_12_ex, ch20_13_ex, ch20_14_ex, ch20_15_ex } from './ch20_10_ex';

export const ch20: Chapter = {
  id: 'ch20',
  title: 'Chương 20: Tính Năng Nâng Cao',
  introduction: `
    <h2>Tính Năng Nâng Cao</h2>
    <p>Đến giờ, bạn đã học các phần thường được sử dụng nhất của ngôn ngữ lập trình Rust.</p>
  `,
  lessons: [
    ch20_01, ch20_01_ex, ch20_02, ch20_02_ex,
    ch20_03, ch20_03_ex, ch20_04, ch20_04_ex,
    ch20_05, ch20_05_ex, ch20_06_ex, ch20_07_ex,
    ch20_08_ex, ch20_09_ex, ch20_10_ex, ch20_11_ex,
    ch20_12_ex, ch20_13_ex, ch20_14_ex, ch20_15_ex,
  ]
};
