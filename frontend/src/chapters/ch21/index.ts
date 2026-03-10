// =====================================================
// Chapter 21: Neural Networks
// =====================================================

import { Chapter } from '../../courses';
import { ch21_01 } from './ch21_01';
import { ch21_02 } from './ch21_02';
import { ch21_03 } from './ch21_03';
import { ch21_backprop } from './ch21_backprop';
import { ch21_activation } from './ch21_activation';
import { ch21_loss } from './ch21_loss';

export const ch21: Chapter = {
  id: 'ch21',
  title: '21. Neural Networks',
  introduction: `
    <h2>Neural Networks - Mạng Neural</h2>
    <p>Học về Neural Networks từ cơ bản đến nâng cao.</p>
    <ul>
      <li><strong>Phần 1</strong>: Giới thiệu - Neural Network là gì, Perceptron, Activation Functions</li>
      <li><strong>Phần 2</strong>: Cách Neural Networks Học - Loss Function</li>
      <li><strong>Phần 3</strong>: Gradient Descent - Thuật toán học</li>
      <li><strong>Phần 4</strong>: Backpropagation - Lan truyền ngược</li>
      <li><strong>Phần 5</strong>: Activation Functions chi tiết</li>
      <li><strong>Phần 6</strong>: Loss Functions chi tiết</li>
    </ul>
  `,
  lessons: [
    ...ch21_01.lessons,
    ...ch21_02.lessons,
    ...ch21_03.lessons,
    ...ch21_backprop.lessons,
    ...ch21_activation.lessons,
    ...ch21_loss.lessons,
  ],
};

export default ch21;
