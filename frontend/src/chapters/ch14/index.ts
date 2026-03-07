import { Chapter } from '../../courses';
import { ch14_01 } from './ch14_01';
import { ch14_02 } from './ch14_02';

export const ch14: Chapter = {
  id: 'ch14',
  title: 'Chương 14: Cargo và Crates.io',
  introduction: `
    <h2>Giới thiệu về Cargo và Crates.io</h2>
    <p>Cargo là công cụ quản lý package và build của Rust. Crates.io là registry chứa hàng nghìn thư viện mã nguồn mở.</p>
    <h3>Bạn sẽ học gì?</h3>
    <ul>
      <li><strong>Cargo workflow:</strong> Tạo, build, và chạy project</li>
      <li><strong>Dependencies:</strong> Thêm và quản lý thư viện bên ngoài</li>
      <li><strong>Publishing:</strong> Đăng package lên crates.io</li>
      <li><strong>Workspaces:</strong> Quản lý multi-crate projects</li>
      <li><strong>Release profiles:</strong> Tối ưu build cho production</li>
    </ul>
    <p>Biết cách sử dụng Cargo hiệu quả là kỹ năng thiết yếu cho mọi Rust developer.</p>
  `,
  lessons: [ch14_01, ch14_02]
};
