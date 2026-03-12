import { Chapter, Lesson } from '../../courses';
import ch23_01 from './ch23_01';
import ch23_02 from './ch23_02';
import ch23_03 from './ch23_03';
import ch23_04 from './ch23_04';
import ch23_05 from './ch23_05';
import ch23_06 from './ch23_06';
import ch23_07 from './ch23_07';
import ch23_08 from './ch23_08';
/** MUP Transformer: Gộp nhiều tiểu mục lẻ tẻ trong 1 file (Chapter con) thành 1 Mục Menu Lớn Duy Nhất */
function mergeChapterToSingleLesson(ch: Chapter): Lesson {
  return {
    id: ch.id,
    title: ch.title,
    duration: '120 phút',
    type: 'theory',
    content: ch.lessons.map(l => l.content).join('\n<hr class="my-10 border-gray-300 border-dashed" />\n'),
    defaultCode: ch.lessons.map(l => l.defaultCode || '').filter(Boolean).join('\n\n')
  };
}

const ch23: Chapter = {
  id: 'ch23',
  title: 'Chương 23: Kiến Trúc Transformer',
  introduction: 'Tài liệu học thuật hàn lâm chuyên sâu về Kiến Trúc Transformer — "Attention Is All You Need". Từ Positional Encoding, Multi-Head Attention, Encoder/Decoder Stack tới BERT, GPT và LLMs hiện đại.',
  lessons: [
    mergeChapterToSingleLesson(ch23_01),
    mergeChapterToSingleLesson(ch23_02),
    mergeChapterToSingleLesson(ch23_03),
    mergeChapterToSingleLesson(ch23_04),
    mergeChapterToSingleLesson(ch23_05),
    mergeChapterToSingleLesson(ch23_06),
    mergeChapterToSingleLesson(ch23_07),
    mergeChapterToSingleLesson(ch23_08),
  ],
};

export { ch23 };
export default ch23;
export { default as ch23_06 } from './ch23_06';
export { default as ch23_07 } from './ch23_07';
export { default as ch23_08 } from './ch23_08';
