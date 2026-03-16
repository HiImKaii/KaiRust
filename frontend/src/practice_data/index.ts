// =====================================================
// Chapter 28: 28Tech - Luyện Tập
// Structure: Each "Buổi" is a Chapter, containing multiple lessons
// =====================================================

import { Chapter } from '../courses';
import { buoi1_lessons } from './buoi1';
import { buoi2_lessons } from './buoi2';
import { buoi3_lessons } from './buoi3';

// =====================================================
// Export all chapters - Each session is a chapter with multiple lessons
// =====================================================

export const ch28_chapters: Chapter[] = [
  {
    id: 'ch28_buoi1',
    title: 'Buổi 1: Kiểu dữ liệu, Toán tử, If Else',
    introduction: '<p>Buổi 1 - Các bài tập cơ bản về kiểu dữ liệu, toán tử và cấu trúc rẽ nhánh</p>',
    lessons: buoi1_lessons,
  },
  {
    id: 'ch28_buoi2',
    title: 'Buổi 2: If Else, Switch Case, Vòng lặp',
    introduction: '<p>Buổi 2 - Các bài tập về cấu trúc rẽ nhánh và vòng lặp</p>',
    lessons: buoi2_lessons,
  },
  {
    id: 'ch28_buoi3',
    title: 'Buổi 3: Vòng lặp nâng cao',
    introduction: '<p>Buổi 3 - Các bài tập về vòng lặp, tính toán tổng, giai thừa, và xử lý số</p>',
    lessons: buoi3_lessons,
  },
  // More chapters will be added as we read more PDFs
];

export default ch28_chapters;
