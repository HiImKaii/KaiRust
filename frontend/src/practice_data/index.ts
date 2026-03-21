// =====================================================
// Chapter 28: 28Tech - Luyện Tập
// Structure: Each "Buổi" is a Chapter, containing multiple lessons
// =====================================================

import { Chapter } from '../courses';
import { buoi1_lessons } from './buoi1';
import { buoi2_lessons } from './buoi2';
import { buoi3_lessons } from './buoi3';
import { buoi4_lessons } from './buoi4';
import { buoi5_lessons } from './buoi5';
import { buoi6_lessons } from './buoi6';
import { buoi7_lessons } from './buoi7';
import { buoi8_lessons } from './buoi8';
import { buoi9_lessons } from './buoi9';
import { buoi10_lessons } from './buoi10';
import { buoi11_lessons } from './buoi11';
import { buoi12_lessons } from './buoi12';
import { buoi13_lessons } from './buoi13';
import { buoi14_lessons } from './buoi14';
import { buoi15_lessons } from './buoi15';
import { buoi16_lessons } from './buoi16';
import { buoi17_lessons } from './buoi17';
import { buoi18_lessons } from './buoi18';
import { buoi19_lessons } from './buoi19';

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
  {
    id: 'ch28_buoi4',
    title: 'Buổi 4: Số nguyên tố và các dạng đặc biệt',
    introduction: '<p>Buổi 4 - Các bài tập về số nguyên tố, số hoàn hảo, số Armstrong, số Fibonacci, và các dạng số đặc biệt khác</p>',
    lessons: buoi4_lessons,
  },
  {
    id: 'ch28_buoi5',
    title: 'Buổi 5: Ôn tập - Số đặc biệt và xử lý chuỗi',
    introduction: '<p>Buổi 5 - Ôn tập các dạng bài về số Strong, Armstrong, hoàn hảo, Fibonacci, số thuận nghịch, xử lý chữ số và tam giác Pascal</p>',
    lessons: buoi5_lessons,
  },
  {
    id: 'ch28_buoi6',
    title: 'Buổi 6: Vẽ hình',
    introduction: '<p>Buổi 6 - Các bài tập về vẽ hình: hình bình hành, hình chữ nhật, tam giác sao, hình thoi, mũi tên, và các hình đặc biệt</p>',
    lessons: buoi6_lessons,
  },
  {
    id: 'ch28_buoi7',
    title: 'Buổi 7: Vẽ hình nâng cao',
    introduction: '<p>Buổi 7 - Các bài tập vẽ hình nâng cao: ma trận đồng tâm, ma trận xoắn ốc, tam giác số, tam giác lũy thừa, tam giác Fibonacci, và các hình số đặc biệt</p>',
    lessons: buoi7_lessons,
  },
  {
    id: 'ch28_buoi8',
    title: 'Buổi 8: Toán tử và vòng lặp nâng cao',
    introduction: '<p>Buổi 8 - Các bài tập nâng cao về toán tử và vòng lặp: đếm ước, phân phối tiền, trò chơi, xác suất, và các bài toán Codeforces</p>',
    lessons: buoi8_lessons,
  },
  {
    id: 'ch28_buoi9',
    title: 'Buổi 9: Ôn tập số học',
    introduction: '<p>Buổi 9 - Ôn tập toàn diện các bài toán số học: số thuận nghịch, số chính phương, số hoàn hảo, số nguyên tố, Fibonacci, Armstrong, Strong, tam giác Pascal, ước số, và phi hàm Euler</p>',
    lessons: buoi9_lessons,
  },
  {
    id: 'ch28_buoi10',
    title: 'Buổi 10: Đệ quy và mảng cơ bản',
    introduction: '<p>Buổi 10 - Các bài tập về đệ quy (tổng, giai thừa, Fibonacci, UCLN, đảo số) và xử lý mảng cơ bản (đếm, tổng, tích, max, đối xứng)</p>',
    lessons: buoi10_lessons,
  },
  {
    id: 'ch28_buoi11',
    title: 'Buổi 11: Mảng nâng cao',
    introduction: '<p>Buổi 11 - Các bài tập nâng cao về mảng: tìm max, min, đếm số nguyên tố, số thuận nghịch, số chính phương, bài toán Lineland, và đổi tiền</p>',
    lessons: buoi11_lessons,
  },
  {
    id: 'ch28_buoi12',
    title: 'Buổi 12: Mảng nâng cao 2',
    introduction: '<p>Buổi 12 - Các bài tập nâng cao về mảng: tìm top N, vị trí đặc biệt, đếm tần suất, kiểm tra mảng tăng/giảm, và xử lý chuỗi số</p>',
    lessons: buoi12_lessons,
  },
  {
    id: 'ch28_buoi13',
    title: 'Buổi 13: Ma trận và Mảng (Phần 2)',
    introduction: '<p>Buổi 13 - Các bài tập về ma trận: tổng nguyên tố tam giác, xoay ma trận, loại bỏ hàng/cột, tìm cột max/min, và các bài toán mảng nâng cao</p>',
    lessons: buoi13_lessons,
  },
  {
    id: 'ch28_buoi14',
    title: 'Buổi 14: Ma trận và Mảng (Phần 3)',
    introduction: '<p>Buổi 14 - Các bài tập về ma trận: xoáy ốc, xoáy ốc nguyên tố, tích ma trận với chuyển vị, khoảng cách nhỏ nhất, và các bài toán sắp xếp/dịch mảng</p>',
    lessons: buoi14_lessons,
  },
  {
    id: 'ch28_buoi15',
    title: 'Buổi 15: Ma trận và Mảng (Phần 4)',
    introduction: '<p>Buổi 15 - Các bài tập về ma trận: sắp xếp cột, chuyển cột/hàng/đường chéo, tổng 2 ma trận, và các thuật toán sắp xếp bubble/insertion/selection sort</p>',
    lessons: buoi15_lessons,
  },
  {
    id: 'ch28_buoi16',
    title: 'Buổi 16: Ôn Tập Mảng (Array nâng cao)',
    introduction: '<p>Buổi 16 - Các bài tập ôn tập mảng: Lineland, vé xem phim, Kadane, sliding window, gcd, tích lớn nhất, và các bài toán mảng nâng cao khác</p>',
    lessons: buoi16_lessons,
  },
  {
    id: 'ch28_buoi17',
    title: 'Buổi 17: Xây dựng Hàm Xử lý Chuỗi Cơ bản',
    introduction: '<p>Buổi 17 - Các bài tập về hàm xử lý chuỗi cơ bản: kiểm tra ký tự, chuyển hoa/thường, mã hóa/giải mã, và các bài toán chuỗi Codeforces</p>',
    lessons: buoi17_lessons,
  },
  {
    id: 'ch28_buoi18',
    title: 'Buổi 18: Xử lý Chuỗi Nâng cao',
    introduction: '<p>Buổi 18 - Các bài tập xử lý chuỗi nâng cao: chuẩn hóa tên, tạo email, tách/tách đảo ngược, đếm tần suất, loại bỏ từ trùng</p>',
    lessons: buoi18_lessons,
  },
  {
    id: 'ch28_buoi19',
    title: 'Buổi 19: Xử lý Chuỗi - Codeforces',
    introduction: '<p>Buổi 19 - Các bài tập xử lý chuỗi từ Codeforces: bàn phím, trai gái, chat, dịch thuật, đếm, pangram, và các bài toán chuỗi nâng cao</p>',
    lessons: buoi19_lessons,
  },
];

export default ch28_chapters;
