// Buổi 20: STRUCT (Cấu trúc)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi20_lessons: Lesson[] = [
  {
    id: 'ch28_b20_01',
    title: '1. Nhân viên - Tìm người sinh nhiều nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nhân viên</h2>
      <p>Tìm nhân viên có năm sinh lớn nhất (sinh nhiều tuổi nhất) trong danh sách.</p>
      <h3>Struct</h3>
      <p><code>NHANVIEN</code>: Mã (chuỗi), Tên (chuỗi), Năm sinh (số nguyên), Lương (số nguyên).</p>
      <h3>Input</h3>
      <p>Dòng 1: n (số nhân viên). n dòng tiếp theo: Mã Tên NămSinh Lương.</p>
      <h3>Output</h3>
      <p>Thông tin nhân viên sinh nhiều nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nNV001 Nghia 1995 5000000\nNV002 Huy 2001 7000000\nNV003 Lan 1998 6000000', expectedOutput: 'NV003 Lan 1998 6000000' },
      { input: '2\nA AA 2000 100 B BB 1990 200', expectedOutput: 'B BB 1990 200', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_02',
    title: '2. Học sinh - Liệt kê điểm toán thấp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Học sinh</h2>
      <p>Liệt kê các học sinh có điểm toán nhỏ hơn 5.</p>
      <h3>Struct</h3>
      <p><code>HOCSINH</code>: Tên (chuỗi), Điểm Toán (số thực), Điểm Văn (số thực), Điểm TB (số thực).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: Tên DiemToan DiemVan DiemTB.</p>
      <h3>Output</h3>
      <p>Mỗi dòng một học sinh thỏa điều kiện (theo thứ tự nhập). Nếu không có ai, in "NONE".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nA 4.5 7.0 5.8\nB 8.0 9.0 8.5\nC 3.5 6.0 4.8', expectedOutput: 'A 4.5 7.0 5.8\nC 3.5 6.0 4.8' },
      { input: '2\nA 6.0 7.0 6.5\nB 5.5 8.0 6.8', expectedOutput: 'NONE', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_03',
    title: '3. Điểm - Liệt kê điểm trong phần tư I',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Điểm Oxy</h2>
      <p>Liệt kê các điểm có hoành độ > 0 và tung độ > 0 (thuộc phần tư I).</p>
      <h3>Struct</h3>
      <p><code>DIEM</code>: Hoành độ x (số thực), Tung độ y (số thực).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: x y.</p>
      <h3>Output</h3>
      <p>Mỗi dòng một điểm thỏa điều kiện (x y). Nếu không có, in "NONE".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>3.5 2.1</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n3.5 2.1\n-1.0 3.0\n2.0 -4.0\n1.5 1.5', expectedOutput: '3.5 2.1\n1.5 1.5' },
      { input: '2\n-1.0 -2.0\n3.0 -1.0', expectedOutput: 'NONE', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_04',
    title: '4. Hộp sữa - Đếm trước năm 2003',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hộp sữa</h2>
      <p>Đếm số hộp sữa có năm sản xuất nhỏ hơn 2003.</p>
      <h3>Struct</h3>
      <p><code>HOPSUA</code>: Nhãn hiệu (chuỗi), Trọng lượng (số thực), Năm SX (số nguyên).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: NhanHieu KhoiLuong NamSX.</p>
      <h3>Output</h3>
      <p>Số hộp sữa sản xuất trước năm 2003.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nVinamilk 1000 2001\nTH true 1000 2003\nDutch Lady 500 2002', expectedOutput: '2' },
      { input: '3\nA 1000 2005\nB 500 2003\nC 700 2002', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_05',
    title: '5. Phòng khách sạn - Liệt kê phòng trống',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phòng khách sạn</h2>
      <p>Liệt kê các phòng có tình trạng = 0 (phòng trống).</p>
      <h3>Struct</h3>
      <p><code>PHONG</code>: Mã phòng (chuỗi), Tên phòng (chuỗi), Đơn giá (số nguyên), Số giường (số nguyên), Tình trạng (0=rảnh, 1=bận).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: Ma Ten DonGia SoGiuong TinhTrang.</p>
      <h3>Output</h3>
      <p>Mỗi dòng một phòng trống. Nếu không có, in "NONE".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nA101 Standard 500 2 0\nA102 VIP 1000 2 1\nA103 Deluxe 800 1 0', expectedOutput: 'A101 Standard 500 2 0\nA103 Deluxe 800 1 0' },
      { input: '2\nX 100 1 1\nY 200 2 1', expectedOutput: 'NONE', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_06',
    title: '6. Sách - Tìm sách cũ nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sách</h2>
      <p>Tìm quyển sách có năm xuất bản nhỏ nhất (sách cũ nhất).</p>
      <h3>Struct</h3>
      <p><code>SACH</code>: Tên sách (chuỗi), Tác giả (chuỗi), Năm XB (số nguyên).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: TenSach TacGia NamXB.</p>
      <h3>Output</h3>
      <p>Thông tin sách cũ nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nDoraemon Fujiko 1969\nConan Aoyama 1994\nDragonball Toriyama 1984', expectedOutput: 'Doraemon Fujiko 1969' },
      { input: '2\nA X 2000\nB Y 1998', expectedOutput: 'B Y 1998', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_07',
    title: '7. Tỉnh - Tỉnh có diện tích lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tỉnh</h2>
      <p>Tìm tỉnh có diện tích lớn nhất. Nếu có nhiều, lấy tỉnh xuất hiện trước.</p>
      <h3>Struct</h3>
      <p><code>TINH</code>: Tên tỉnh (chuỗi), Diện tích (số thực), Dân số (số nguyên).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: Ten Dientich Danso.</p>
      <h3>Output</h3>
      <p>Tên tỉnh có diện tích lớn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nHanoi 3359 8\nHCM 2061 9\nDanang 1285 1', expectedOutput: 'Hanoi' },
      { input: '3\nA 100 1000\nB 200 500\nC 200 2000', expectedOutput: 'B', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_08',
    title: '8. Vé xem phim - Tổng giá tiền',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vé xem phim</h2>
      <p>Tính tổng giá tiền của tất cả các vé.</p>
      <h3>Struct</h3>
      <p><code>VE</code>: Tên phim (chuỗi), Giá tiền (số nguyên), Ngày xem (chuỗi ngày/tháng/năm).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: TenPhim GiaTien NgayXem.</p>
      <h3>Output</h3>
      <p>Tổng giá tiền.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nAvatar 100000 01/01/2024\nInception 80000 02/01/2024\nTitanic 120000 03/01/2024', expectedOutput: '300000' },
      { input: '2\nA 50000 01/01\nB 30000 02/01', expectedOutput: '80000', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_09',
    title: '9. Mặt hàng - Đếm tồn kho > 1000',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mặt hàng</h2>
      <p>Đếm số mặt hàng có số lượng tồn lớn hơn 1000.</p>
      <h3>Struct</h3>
      <p><code>MATHANG</code>: Mã (chuỗi), Tên (chuỗi), Số lượng tồn (số nguyên), Đơn giá (số nguyên).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: Ma Ten SoLuong DonGia.</p>
      <h3>Output</h3>
      <p>Số mặt hàng có tồn kho > 1000.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\nA001 Gao 500 25000\nA002 Muoi 2000 5000\nA003 Nuoc 1500 8000', expectedOutput: '2' },
      { input: '3\nX Y 999 100\nZ W 1000 200', expectedOutput: '0', hidden: true },
      { input: '3\nA 500 5\nB 1001 10\nC 2000 3', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b20_10',
    title: '10. Chuyến bay - Tìm ngày nhiều chuyến nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuyến bay</h2>
      <p>Tìm ngày có nhiều chuyến bay nhất. Input gồm: Mã chuyến, Ngày (dd/mm/yyyy), Nơi đi, Nơi đến.</p>
      <h3>Struct</h3>
      <p><code>CHUYENBAY</code>: Mã (chuỗi), Ngày (chuỗi dd/mm/yyyy), Nơi đi (chuỗi), Nơi đến (chuỗi).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng: MaChuyen Ngay NoiDi NoiDen.</p>
      <h3>Output</h3>
      <p>Ngày có nhiều chuyến bay nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\nVN001 01/01/2024 Hanoi Danang\nVN002 02/01/2024 Hanoi Danang\nVN003 01/01/2024 Hanoi Saigon\nVN004 03/01/2024 Hanoi Danang\nVN005 01/01/2024 Saigon Danang', expectedOutput: '01/01/2024' },
      { input: '3\nA 01/01 B C\nB 02/01 D E\nC 02/01 F G', expectedOutput: '02/01', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
