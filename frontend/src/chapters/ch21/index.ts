import { Chapter, Lesson } from '../../courses';
import { ch21_01 } from './ch21_01';
import { ch21_02 } from './ch21_02';
import { ch21_03 } from './ch21_03';
import { ch21_04 } from './ch21_04';
import { ch21_05 } from './ch21_05';
import { ch21_06 } from './ch21_06';
import { ch21_07 } from './ch21_07';
import { ch21_08 } from './ch21_08';

// Helper: Convert a sub-Chapter to a Lesson for display
const chapterToLesson = (subChapter: Chapter): Lesson => {
  const firstLesson = subChapter.lessons[0] || { content: '' };
  return {
    id: subChapter.id,
    title: subChapter.title,
    duration: '60 phút',
    type: 'theory',
    content: generateLessonContent(subChapter)
  };
};

// Generate content for a chapter-based lesson
const generateLessonContent = (subChapter: Chapter): string => {
  let content = subChapter.introduction || '';

  // Add all lessons from the sub-chapter
  for (const lesson of subChapter.lessons) {
    content += '\n' + lesson.content;
  }

  return content;
};

export const ch21: Chapter = {
  id: 'ch21',
  title: 'Chương 21: Mạng Neural Network (ANN)',
  introduction: `
    <h2>Mạng Neural Network (ANN)</h2>
    <p>Trong chương này, chúng ta sẽ học về mạng nơron nhân tạo (Artificial Neural Network), nền tảng của Deep Learning và Trí tuệ Nhân tạo hiện đại.</p>
  `,
  lessons: [
    chapterToLesson(ch21_01),
    chapterToLesson(ch21_02),
    chapterToLesson(ch21_03),
    chapterToLesson(ch21_04),
    chapterToLesson(ch21_05),
    chapterToLesson(ch21_06),
    chapterToLesson(ch21_07),
    chapterToLesson(ch21_08),
  ]
};
