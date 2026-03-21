// Buổi 24: DANH SÁCH LIÊN KẾT ĐƠN

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi24_lessons: Lesson[] = [
  {
    id: 'ch28_b24_01',
    title: '1. Nhân viên - Thêm/Search/Sắp xếp',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Nhân viên - Linked List</h2>
      <p>Xây dựng DSLK đơn quản lý nhân viên. Menu-driven với các lệnh:</p>
      <ul>
        <li>1 k: Thêm k nhân viên vào cuối</li>
        <li>2: Hiển thị danh sách</li>
        <li>3 ten: Tìm nhân viên theo tên</li>
        <li>4: Sắp xếp giảm dần theo lương rồi hiển thị</li>
      </ul>
      <h3>Struct</h3>
      <p><code>NHANVIEN</code>: Tên, Ngày sinh, Lương (số thực), Giới tính (0=Nữ, 1=Nam).</p>
      <h3>Input</h3>
      <p>Luồng lệnh theo menu trên. Kết thúc khi gặp lệnh bất kỳ khác.</p>
      <h3>Output</h3>
      <p>Theo từng lệnh: ds, kết quả tìm kiếm, ds đã sắp xếp.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1 3
Nguyen Van A 01/01/1990 5000 1
Tran Thi B 15/05/1992 7000 0
Le Van C 20/08/1988 6000 1
2
3 Nguyen
4
q
<b>Output</b>
Nguyen Van A 01/01/1990 5000 1
Tran Thi B 15/05/1992 7000 0
Le Van C 20/08/1988 6000 1
Nguyen Van A 01/01/1990 5000 1
Tran Thi B 15/05/1992 7000 0
Le Van C 20/08/1988 6000 1
Tran Thi B 15/05/1992 7000 0
Le Van C 20/08/1988 6000 1
Nguyen Van A 01/01/1990 5000 1</pre>
    `,
    testCases: [
      { input: '1 3\nNguyen Van A 01/01/1990 5000 1\nTran Thi B 15/05/1992 7000 0\nLe Van C 20/08/1988 6000 1\n2\n3 Nguyen\n4\nq', expectedOutput: 'Nguyen Van A 01/01/1990 5000 1\nTran Thi B 15/05/1992 7000 0\nLe Van C 20/08/1988 6000 1\nNguyen Van A 01/01/1990 5000 1\nTran Thi B 15/05/1992 7000 0\nLe Van C 20/08/1988 6000 1\nTran Thi B 15/05/1992 7000 0\nLe Van C 20/08/1988 6000 1\nNguyen Van A 01/01/1990 5000 1' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b24_02',
    title: '2. Học sinh - Linked List',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Học sinh - Linked List</h2>
      <p>Xây dựng DSLK đơn quản lý học sinh. Menu-driven:</p>
      <ul>
        <li>1 k: Thêm k học sinh vào cuối</li>
        <li>2: Hiển thị danh sách</li>
        <li>3: Sắp xếp giảm dần theo điểm trung bình rồi hiển thị</li>
      </ul>
      <h3>Struct</h3>
      <p><code>HOCSINH</code>: Tên, Điểm Toán, Điểm Văn, Điểm TB.</p>
      <h3>Input</h3>
      <p>Luồng lệnh theo menu. Kết thúc bằng lệnh khác.</p>
      <h3>Output</h3>
      <p>Hiển thị danh sách theo từng lệnh.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1 2
Nguyen Van A
8.0 7.0 7.5
Tran Thi B
6.0 8.0 7.0
2
3
q
<b>Output</b>
Nguyen Van A 8.0 7.0 7.5
Tran Thi B 6.0 8.0 7.0
Nguyen Van A 8.0 7.0 7.5
Tran Thi B 6.0 8.0 7.0</pre>
    `,
    testCases: [
      { input: '1 2\nNguyen Van A\n8.0 7.0 7.5\nTran Thi B\n6.0 8.0 7.0\n2\n3\nq', expectedOutput: 'Nguyen Van A 8.0 7.0 7.5\nTran Thi B 6.0 8.0 7.0\nNguyen Van A 8.0 7.0 7.5\nTran Thi B 6.0 8.0 7.0' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b24_03',
    title: '3. Hộp sữa - Linked List',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Hộp sữa - Linked List</h2>
      <p>Xây dựng DSLK đơn quản lý hộp sữa. Menu-driven:</p>
      <ul>
        <li>1 k: Thêm k hộp sữa vào cuối</li>
        <li>2: Hiển thị danh sách</li>
        <li>3: Sắp xếp giảm dần theo hạn sử dụng (mới→cũ) rồi hiển thị</li>
      </ul>
      <h3>Struct</h3>
      <p><code>HOPSUA</code>: Nhãn hiệu, Trọng lượng (số thực), Hạn SD (chuỗi ngày).</p>
      <h3>Input</h3>
      <p>Luồng lệnh theo menu. Kết thúc bằng lệnh khác.</p>
      <h3>Output</h3>
      <p>Hiển thị danh sách theo từng lệnh.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1 2
Vinamilk 1000 01/01/2024
THtrue 500 15/06/2023
2
3
q
<b>Output</b>
Vinamilk 1000 01/01/2024
THtrue 500 15/06/2023
THtrue 500 15/06/2023
Vinamilk 1000 01/01/2024</pre>
    `,
    testCases: [
      { input: '1 2\nVinamilk 1000 01/01/2024\nTHtrue 500 15/06/2023\n2\n3\nq', expectedOutput: 'Vinamilk 1000 01/01/2024\nTHtrue 500 15/06/2023\nTHtrue 500 15/06/2023\nVinamilk 1000 01/01/2024' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
