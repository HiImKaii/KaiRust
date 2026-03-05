import { Chapter } from '../../courses';
import { ch01_01 } from './ch01_01';
import { ch01_02 } from './ch01_02';
import { ch01_03 } from './ch01_03';

export const ch01: Chapter = {
  id: 'ch01',
  title: 'Chương 1: Bắt đầu với Rust',
  lessons: [ch01_01, ch01_02, ch01_03]
};
