import { Chapter } from '../../courses';
import { ch21_01_ex, ch21_02_ex, ch21_03_ex, ch21_04_ex, ch21_05_ex, ch21_06_ex } from './ch21_ex';

export const ch21: Chapter = {
  id: 'ch21',
  title: 'Chương 21: C++ Cơ bản - Biến và Phép toán',
  introduction: `
    <h2>Biến và Phép toán cơ bản trong C++</h2>
    <p>Trong chương này, chúng ta sẽ học về các khái niệm cơ bản trong C++ bao gồm khai báo biến, nhập xuất dữ liệu, và các phép toán số học.</p>
  `,
  lessons: [
    ch21_01_ex,
    ch21_02_ex,
    ch21_03_ex,
    ch21_04_ex,
    ch21_05_ex,
    ch21_06_ex,
  ]
};
