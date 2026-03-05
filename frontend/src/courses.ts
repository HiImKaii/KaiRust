// =====================================================
// KaiRust Course Data — Sourced from "The Rust Programming Language" Book
// Structure: Chapter > Lessons
// =====================================================

export interface Lesson {
  id: string;
  title: string;
  duration: string;     // estimated reading/practice time
  type: 'theory' | 'practice' | 'quiz';
  content: string;      // HTML content for instruction panel
  defaultCode?: string; // pre-filled code for Monaco editor
  expectedOutput?: string;
  isExercise?: boolean; // flag to mark as exercise
  testCode?: string;    // hidden test code to append for validation
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Import chapter data from folder structure
import { ch01 } from './chapters/ch01/index';
import { ch02 } from './chapters/ch02/index';
import { ch03 } from './chapters/ch03/index';
import { ch04 } from './chapters/ch04/index';
import { ch05 } from './chapters/ch05/index';
import { ch06 } from './chapters/ch06/index';
import { ch07 } from './chapters/ch07/index';
import { ch08 } from './chapters/ch08/index';
import { ch09 } from './chapters/ch09/index';
import { ch10 } from './chapters/ch10/index';
import { ch11 } from './chapters/ch11/index';
import { ch12 } from './chapters/ch12/index';
import { ch13 } from './chapters/ch13/index';
import { ch14 } from './chapters/ch14/index';
import { ch15 } from './chapters/ch15/index';
import { ch16 } from './chapters/ch16/index';
import { ch17 } from './chapters/ch17/index';
import { ch18 } from './chapters/ch18/index';
import { ch19 } from './chapters/ch19/index';
import { ch20 } from './chapters/ch20/index';

export const courseData: Chapter[] = [
  ch01,
  ch02,
  ch03,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12,
  ch13,
  ch14,
  ch15,
  ch16,
  ch17,
  ch18,
  ch19,
  ch20
];
