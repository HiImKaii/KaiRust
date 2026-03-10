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
  title: 'Chương 21: Neural Networks',
  introduction: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">route</span> Neural Networks - Khởi nguồn của AI Hiện Đại</h2>
  <div class="definition-block mb-4">
    <p>Chào mừng bạn đến với khóa học toàn diện nhất về <strong>Mạng Neural Nhân Tạo (Artificial Neural Networks)</strong>. Trong chương này, chúng ta sẽ bắt đầu từ những khái niệm hạt nhân nhỏ nhất (Perceptron) cho đến cách xây dựng, huấn luyện và tối ưu một hệ thống Deep Learning hoàn chỉnh.</p>
  </div>
  
  <h3>Lộ trình chinh phục:</h3>
  <div class="features-grid mt-4">
    <div class="feature-card highlight-info">
      <div class="feature-icon"><span class="material-symbols-outlined">psychology</span></div>
      <h4>Phần 1 & 2: Nền Tảng Hình Thành</h4>
      <p class="text-sm">Hiểu về Perceptron sinh học, cấu tạo cơ bản của Neural Network và Hàm Kích Hoạt (Activation Functions) - Tế bào linh hồn mang lại khả năng học phi tuyến.</p>
    </div>
    
    <div class="feature-card highlight-warning">
      <div class="feature-icon"><span class="material-symbols-outlined">explore</span></div>
      <h4>Phần 3 & 4: Định Hướng Học Tập</h4>
      <p class="text-sm">Tìm hiểu về Loss Function - Thiết bị đo lường sai số và thuật toán Gradient Descent - Chiếc la bàn dẫn lối model đi tìm chân lý.</p>
    </div>
    
    <div class="feature-card highlight-success">
      <div class="feature-icon"><span class="material-symbols-outlined">all_inclusive</span></div>
      <h4>Phần 5 & 6: Vận Hành Toàn Tập</h4>
      <p class="text-sm">Mổ xẻ thuật toán cốt lõi Backpropagation (Lan truyền ngược). Thực hành ráp nối tất cả thành một Vòng Lặp Huấn Luyện (Training Loop) hoàn chỉnh.</p>
    </div>
  </div>
</div>
  `,
  lessons: ch21_01.lessons.map((l, i) => ({ ...l, title: `${i + 1}. ${l.title.replace(/^\d+\.\s*/, '')}` }))
    .concat(ch21_02.lessons.map((l, i) => ({ ...l, title: `${i + 3}. ${l.title.replace(/^\d+\.\s*/, '')}` })))
    .concat(ch21_03.lessons.map((l, i) => ({ ...l, title: `${i + 7}. ${l.title.replace(/^\d+\.\s*/, '')}` })))
    .concat(ch21_backprop.lessons.map((l, i) => ({ ...l, title: `${i + 10}. ${l.title.replace(/^\d+\.\s*/, '')}` })))
    .concat(ch21_activation.lessons.map((l, i) => ({ ...l, title: `${i + 13}. ${l.title.replace(/^\d+\.\s*/, '')}` })))
    .concat(ch21_loss.lessons.map((l, i) => ({ ...l, title: `${i + 15}. ${l.title.replace(/^\d+\.\s*/, '')}` }))),
};

export default ch21;
