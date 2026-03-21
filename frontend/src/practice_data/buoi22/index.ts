// Buổi 22: FILE & STRUCT NÂNG CAO

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi22_lessons: Lesson[] = [
  {
    id: 'ch28_b22_01',
    title: '1. Chi tiêu - Menu-driven',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Chi tiêu</h2>
      <p>Menu-driven: (1) Thêm k khoản mục, (2) Cập nhật theo ID, (3) Hiển thị tổng thu, tổng chi, tiền tiết kiệm.</p>
      <h3>Struct</h3>
      <p><code>CHITIEU</code>: ID (tự động), Loại (1=thu, 2=chi), Tên, Số tiền.</p>
      <h3>Input</h3>
      <p>Menu-driven: 1→k→thêm, 2→ID→cập nhật, 3→kết thúc. Kết thúc bằng lựa chọn 3.</p>
      <h3>Output</h3>
      <p>1: số thu và số chi được thêm. 2: tên khoản mục được sửa. 3: Tổng thu Tổng chi Tiền còn lại.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
3
1
tien an
2000
tien luong
10000
2
3
2
tien an
2000
3
<b>Output</b>
2 1
tien an
10000 7000 3000</pre>
    `,
    testCases: [
      { input: '1\n3\n1\ntien an\n2000\ntien luong\n10000\n2\n3\n2\ntien an\n2000\n3', expectedOutput: '2 1\ntien an\n10000 7000 3000' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b22_02',
    title: '2. Sản phẩm - Tiền lãi',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Sản phẩm</h2>
      <p>Menu-driven: (1) Thêm k sản phẩm, (2) Cập nhật giá theo mã, (3) Hiển thị sp có lãi > giá nhập.</p>
      <h3>Struct</h3>
      <p><code>SANPHAM</code>: Mã (tự động), Tên, Giá nhập, Giá xuất.</p>
      <h3>Input</h3>
      <p>1→k→thêm, 2→mã→sửa, 3→kết thúc. Kết thúc bằng lựa chọn 3.</p>
      <h3>Output</h3>
      <p>1: số sp thêm. 2: mã sp sửa. 3: ds sp có lãi > nhập (Mã Tên Nhập Xuất).</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
banh ngot
5.50 8.50
nuoc ngot
4.50 6.50
2
2
nuoc giai khat
2.50 5.50
3
<b>Output</b>
2
2
2 nuoc giai khat 2.50 5.50</pre>
    `,
    testCases: [
      { input: '1\n2\nbanh ngot\n5.50 8.50\nnuoc ngot\n4.50 6.50\n2\n2\nnuoc giai khat\n2.50 5.50\n3', expectedOutput: '2\n2\n2 nuoc giai khat 2.50 5.50' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b22_03',
    title: '3. Thiết bị - Sắp xếp giảm dần',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Thiết bị</h2>
      <p>Menu-driven: (1) Thêm k thiết bị, (2) Cập nhật theo mã, (3) Hiển thị ds giá nhập giảm dần.</p>
      <h3>Struct</h3>
      <p><code>THIETBI</code>: Mã (tự động), Tên, Giá nhập, Số năm BH.</p>
      <h3>Input</h3>
      <p>1→k→thêm, 2→mã→sửa, 3→kết thúc. Kết thúc bằng lựa chọn 3.</p>
      <h3>Output</h3>
      <p>1: số thiết bị thêm. 2: mã tb sửa. 3: ds giảm dần (Mã Tên Giá BH).</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
tu lanh
16.5 2
may giat
8.5 4
2
2
dieu hoa
20.5 1
3
<b>Output</b>
2
2
2 dieu hoa 20.5 1
3 tu lanh 16.5 2
1 may giat 8.5 4</pre>
    `,
    testCases: [
      { input: '1\n2\ntu lanh\n16.5 2\nmay giat\n8.5 4\n2\n2\ndieu hoa\n20.5 1\n3', expectedOutput: '2\n2\n2 dieu hoa 20.5 1\n3 tu lanh 16.5 2\n1 may giat 8.5 4' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b22_04',
    title: '4. Sinh viên - Sắp xếp tổng điểm tăng dần',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Sinh viên - Sắp xếp</h2>
      <p>Menu-driven: (1) Thêm k sinh viên, (2) Cập nhật điểm theo mã, (3) Hiển thị ds tăng dần theo tổng điểm.</p>
      <h3>Struct</h3>
      <p><code>SINHVIEN</code>: Mã (tự động), Tên, Điểm A, B, C (số thực).</p>
      <h3>Input</h3>
      <p>1→k→thêm, 2→mã→sửa, 3→kết thúc. Kết thúc bằng lựa chọn 3.</p>
      <h3>Output</h3>
      <p>1: số SV thêm. 2: mã SV sửa. 3: ds tăng dần (Mã Tên A B C).</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
nguyen van hai
8.5 5.5 7.5
tran van tuan
8.5 6.5 9.0
2
2
tran van nam
5.5 5.0 6.0
3
<b>Output</b>
2
2
2 tran van nam 5.5 5.0 6.0
1 nguyen van hai 8.5 5.5 7.5</pre>
    `,
    testCases: [
      { input: '1\n2\nnguyen van hai\n8.5 5.5 7.5\ntran van tuan\n8.5 6.5 9.0\n2\n2\ntran van nam\n5.5 5.0 6.0\n3', expectedOutput: '2\n2\n2 tran van nam 5.5 5.0 6.0\n1 nguyen van hai 8.5 5.5 7.5' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b22_05',
    title: '5. Sinh viên - Điểm tăng dần',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Sinh viên - Điểm tăng dần</h2>
      <p>Menu-driven: (1) Thêm k sinh viên, (2) Cập nhật điểm theo mã, (3) Hiển thị ds điểm 3 môn tăng dần (sắp xếp điểm mỗi SV tăng dần, giữ thứ tự SV).</p>
      <h3>Struct</h3>
      <p><code>SINHVIEN</code>: Mã (tự động), Tên, Điểm A, B, C (số thực).</p>
      <h3>Input</h3>
      <p>1→k→thêm, 2→mã→sửa, 3→kết thúc. Kết thúc bằng lựa chọn 3.</p>
      <h3>Output</h3>
      <p>1: số SV thêm. 2: mã SV sửa. 3: ds với điểm đã sắp xếp tăng dần.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
nguyen van hai
8.5 5.5 7.5
tran van tuan
8.5 6.5 9.0
2
2
tran van nam
5.5 6.0 7.0
3
<b>Output</b>
2
2
3 tran van nam 5.5 6.0 7.0
1 nguyen van hai 5.5 7.5 8.5
2 tran van tuan 6.5 8.5 9.0</pre>
    `,
    testCases: [
      { input: '1\n2\nnguyen van hai\n8.5 5.5 7.5\ntran van tuan\n8.5 6.5 9.0\n2\n2\ntran van nam\n5.5 6.0 7.0\n3', expectedOutput: '2\n2\n3 tran van nam 5.5 6.0 7.0\n1 nguyen van hai 5.5 7.5 8.5\n2 tran van tuan 6.5 8.5 9.0' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
