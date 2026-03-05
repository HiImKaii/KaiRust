import { Chapter } from '../../courses';
import { ch10_01 } from './ch10_01';
import { ch10_02 } from './ch10_02';
import { ch10_03 } from './ch10_03';

export const ch10: Chapter = {
  id: 'ch10',
  title: 'Chương 10: Generics, Traits, Lifetimes',
  lessons: [ch10_01, ch10_02, ch10_03]
};
