import { Chapter, Lesson } from '../../courses';
import ch22_01 from './ch22_01';
import ch22_02 from './ch22_02';
import ch22_03 from './ch22_03';
import ch22_04 from './ch22_04';
import ch22_05 from './ch22_05';
import ch22_06 from './ch22_06';
// import ch22_07 from './ch22_07';
// import ch22_08 from './ch22_08';

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

const ch22: Chapter = {
  id: 'ch22',
  title: 'Chương 22: Mạng Neural Hồi Quy (RNN)',
  introduction: 'Tài liệu học thuật hàn lâm chuyên sâu về Mạng Neural Hồi Quy (Recurrent Neural Networks). Hành trình từ Dynamic Memory cơ bản tới LSTM, GRU, Attention Mechanism — nền tảng dẫn tới kỷ nguyên Transformer.',
  lessons: [
    mergeChapterToSingleLesson(ch22_01),
    mergeChapterToSingleLesson(ch22_02),
    mergeChapterToSingleLesson(ch22_03),
    mergeChapterToSingleLesson(ch22_04),
    mergeChapterToSingleLesson(ch22_05),
    mergeChapterToSingleLesson(ch22_06),
    // mergeChapterToSingleLesson(ch22_07),
    // mergeChapterToSingleLesson(ch22_08),
  ],
};

export { ch22 };
export default ch22;
