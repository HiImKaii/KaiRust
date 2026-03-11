import { Chapter, Lesson } from '../../courses';
import ch21_01 from './ch21_01';
import ch21_02 from './ch21_02';
import ch21_03 from './ch21_03';
import ch21_04 from './ch21_04';
import ch21_05 from './ch21_05';
import ch21_06 from './ch21_06';
import ch21_07 from './ch21_07';
import ch21_08 from './ch21_08';

/** MUP Transformer: Gộp nhiều tiểu mục lẻ tẻ trong 1 file (Chapter con) thành 1 Mục Menu Lớn Duy Nhất */
function mergeChapterToSingleLesson(ch: Chapter): Lesson {
  return {
    id: ch.id,
    title: ch.title,
    duration: '120 phút',
    type: 'theory',
    content: ch.lessons.map(l => l.content).join('\\n<hr class="my-10 border-gray-300 border-dashed" />\\n'),
    defaultCode: ch.lessons.map(l => l.defaultCode || '').filter(Boolean).join('\\n\\n')
  };
}

const ch21: Chapter = {
  id: 'ch21',
  title: 'Chương 21: Neural Networks & Deep Learning',
  introduction: 'Tài liệu học thuật hàn lâm chuyên sâu về mạng Nơ-ron (Neural Networks). Hành trình từ Mạch Não Ngô Nghê cơ bản 1 lớp tới Vua của mọi Học Thuyết - Những cỗ mày Trăm Tỷ Tham Số (Viễn Tưởng Transformer Đương Đại).',
  lessons: [
    mergeChapterToSingleLesson(ch21_01),
    mergeChapterToSingleLesson(ch21_02),
    mergeChapterToSingleLesson(ch21_03),
    mergeChapterToSingleLesson(ch21_04),
    mergeChapterToSingleLesson(ch21_05),
    mergeChapterToSingleLesson(ch21_06),
    mergeChapterToSingleLesson(ch21_07),
    mergeChapterToSingleLesson(ch21_08),
  ],
};

export { ch21 };
export default ch21;
