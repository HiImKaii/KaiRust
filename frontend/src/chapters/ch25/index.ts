import { Chapter } from '../../courses';
import { ch25_01_ex, ch25_02_ex, ch25_03_ex, ch25_04_ex, ch25_05_ex, ch25_06_ex } from './ch25_ex';

export const ch25: Chapter = {
  id: 'ch25',
  title: 'Chương 25: Hàm và Đệ quy',
  introduction: `
    <h2>Hàm (Function) trong C++</h2>
    <p>Trong chương này, chúng ta sẽ học về cách định nghĩa và sử dụng hàm, truyền tham số, overload hàm, và đệ quy.</p>
  `,
  lessons: [
    ch25_01_ex,
    ch25_02_ex,
    ch25_03_ex,
    ch25_04_ex,
    ch25_05_ex,
    ch25_06_ex,
  ]
};
