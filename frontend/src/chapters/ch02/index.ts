import { Chapter } from '../../courses';
import { ch02_01 } from './ch02_01';
import { ch02_02 } from './ch02_02';
import { ch02_03 } from './ch02_03';
import { ch02_04 } from './ch02_04';
import { ch02_05 } from './ch02_05';
import { ch02_01_ex } from './ch02_01_ex';
import { ch02_04_ex } from './ch02_04_ex';
import { ch02_05_ex } from './ch02_05_ex';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số (Programming a Guessing Game)',
  lessons: [ch02_01, ch02_02, ch02_03, ch02_04, ch02_05, ch02_01_ex, ch02_04_ex, ch02_05_ex]
};
