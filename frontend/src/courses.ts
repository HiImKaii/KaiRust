// =====================================================
// KaiRust Course Data — Sourced from "The Rust Programming Language" Book
// Structure: Chapter > Lessons
// =====================================================

// Helper function to generate competitive programming content
export function generateCPContent(lesson: Lesson): string {
  if (!lesson.problemTitle) return lesson.content;

  let html = `<h2>${lesson.problemTitle}</h2>`;

  // Memory and Time limits (Memory first, then Time)
  if (lesson.memoryLimit || lesson.timeLimit) {
    html += `<div class="cp-limits">`;
    if (lesson.memoryLimit) html += `<span>Memory: ${lesson.memoryLimit}</span>`;
    if (lesson.timeLimit) html += `<span>Time: ${lesson.timeLimit}</span>`;
    html += `</div>`;
  }

  // Problem Description
  if (lesson.problemDescription) {
    html += `<h3>Đề bài</h3><p>${lesson.problemDescription}</p>`;
  }

  // Input Format
  if (lesson.inputFormat) {
    html += `<h3>Input</h3><p>${lesson.inputFormat}</p>`;
  }

  // Output Format
  if (lesson.outputFormat) {
    html += `<h3>Output</h3><p>${lesson.outputFormat}</p>`;
  }

  // Constraints
  if (lesson.constraints && lesson.constraints.length > 0) {
    html += `<h3>Constraints</h3><ul>`;
    for (const c of lesson.constraints) {
      html += `<li><strong>${c.field}:</strong> ${c.condition}</li>`;
    }
    html += `</ul>`;
  }

  // Examples - Hiển thị Input và Output trong các ô riêng biệt
  if (lesson.examples && lesson.examples.length > 0) {
    html += `<h3>Ví dụ</h3>`;
    for (let i = 0; i < lesson.examples.length; i++) {
      const ex = lesson.examples[i];
      html += `<div class="cp-example">`;
      html += `<div class="example-box"><strong>Input ${i + 1}:</strong><pre>${ex.input || '(trống)'}</pre></div>`;
      html += `<div class="example-box"><strong>Output ${i + 1}:</strong><pre>${ex.output}</pre></div>`;
      if (ex.explanation) {
        html += `<div class="example-explanation"><strong>Giải thích:</strong> ${ex.explanation}</div>`;
      }
      html += `</div>`;
    }
  }

  // Original content
  if (lesson.content) {
    html += lesson.content;
  }

  return html;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Constraint {
  field: string;
  condition: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;     // estimated reading/practice time
  type: 'theory' | 'practice' | 'quiz';
  content: string;      // HTML content for instruction panel
  defaultCode?: string; // pre-filled code for Monaco editor
  expectedOutput?: string;
  isExercise?: boolean; // flag to mark as exercise
  testCases?: TestCase[]; // test cases for practice problems (LeetCode/HackerRank style)

  // Competitive Programming Format
  problemTitle?: string; // Tên bài toán (ví dụ: "Tổng hai số lớn nhất")
  timeLimit?: string; // Time limit (ví dụ: "1s")
  memoryLimit?: string; // Memory limit (ví dụ: "256MB")
  problemDescription?: string; // Mô tả bài toán chi tiết
  inputFormat?: string; // Định dạng input
  outputFormat?: string; // Định dạng output
  constraints?: Constraint[]; // Các ràng buộc
  examples?: Example[]; // Các ví dụ
}

export interface Chapter {
  id: string;
  title: string;
  introduction: string;  // HTML content for chapter introduction
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
import { ch21 } from './chapters/ch21/index';

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
  ch20,
  ch21
];
