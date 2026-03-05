import { Chapter } from '../../courses';
import { ch03_01 } from './ch03_01';
import { ch03_02 } from './ch03_02';
import { ch03_03 } from './ch03_03';
import { ch03_04 } from './ch03_04';
import { ch03_05 } from './ch03_05';
import { ch03_01_ex } from './ch03_01_ex';
import { ch03_02_ex } from './ch03_02_ex';
import { ch03_03_ex } from './ch03_03_ex';
import { ch03_05_ex } from './ch03_05_ex';

export const ch03: Chapter = {
  id: 'ch03',
  title: 'Chương 3: Các khái niệm lập trình phổ biến',
  lessons: [ch03_01, ch03_02, ch03_03, ch03_04, ch03_05, ch03_01_ex, ch03_02_ex, ch03_03_ex, ch03_05_ex]
};
