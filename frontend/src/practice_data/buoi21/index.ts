// Buổi 21: ÔN TẬP TỔNG HỢP

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi21_lessons: Lesson[] = [
  {
    id: 'ch28_b21_01',
    title: '1. Quản lý sinh viên 1',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Quản lý sinh viên 1</h2>
      <p>Menu-driven: (1) Thêm k sinh viên, (2) Cập nhật điểm theo mã, (3) Kết thúc + hiển thị ds tăng dần theo tổng điểm.</p>
      <h3>Struct</h3>
      <p><code>SINHVIEN</code>: Mã (tự động tăng), Tên, Điểm A, B, C (số thực).</p>
      <h3>Input</h3>
      <p>Dòng 1: lựa chọn. Dòng 2: theo lựa chọn... Kết thúc khi gặp lựa chọn 3.</p>
      <h3>Output</h3>
      <p>Dòng 1: số SV được thêm. Dòng 2: mã SV được sửa (cách nhau khoảng trắng). Dòng 3+: ds tăng dần (mã tên điểm).</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
nguyen van hai
8.5 5.5 7.5
tran van tuan
8.5 5.0 9.0
2
2
tran van nam
5.5 5.0 6.0
1
2
hoang dinh nam
1.0 2.0 3.0
nguyen ngoc thien
1.0 2.0 5.0
phuong nam
1.0 2.0 10.0
3
<b>Output</b>
4
2 4
3 hoang dinh nam 1.0 2.0 3.0
4 phuong nam 1.0 2.0 10.0
2 tran van nam 5.5 5.0 6.0
1 tran van tuan 8.5 5.0 9.0</pre>
    `,
    testCases: [
      { input: '1\n2\nnguyen van hai\n8.5 5.5 7.5\ntran van tuan\n8.5 5.0 9.0\n2\n2\ntran van nam\n5.5 5.0 6.0\n1\n2\nhoang dinh nam\n1.0 2.0 3.0\nnguyen ngoc thien\n1.0 2.0 5.0\nphuong nam\n1.0 2.0 10.0\n3', expectedOutput: '4\n2 4\n3 hoang dinh nam 1.0 2.0 3.0\n4 phuong nam 1.0 2.0 10.0\n2 tran van nam 5.5 5.0 6.0\n1 tran van tuan 8.5 5.0 9.0' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_02',
    title: '2. Quản lý sinh viên 2',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Quản lý sinh viên 2</h2>
      <p>Menu-driven: (1) Thêm k sinh viên, (2) Cập nhật điểm theo mã, (3) Hiển thị ds điểm 3 môn tăng dần (sắp xếp điểm mỗi SV tăng dần, giữ thứ tự SV).</p>
      <h3>Struct</h3>
      <p><code>SINHVIEN</code>: Mã (tự động tăng), Tên, Điểm A, B, C (số thực).</p>
      <h3>Input</h3>
      <p>Tương tự B1: 1=k→thêm, 2=ID→sửa, 3=kết thúc+hiển thị.</p>
      <h3>Output</h3>
      <p>1: số SV thêm. 2: mã SV sửa. 3: ds với điểm đã sắp xếp tăng dần.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
1
2
nguyen van hai
8.5 5.5 7.5
tran van tuan
8.5 5.0 9.0
2
2
tran van nam
5.5 5.0 6.0
1
2
hoang dinh nam
1.0 2.0 3.0
phuong nam
1.0 2.0 10.0
3
<b>Output</b>
4
2 4
3 hoang dinh nam 1.0 2.0 3.0
2 tran van nam 5.0 5.5 6.0
4 phuong nam 1.0 2.0 10.0
1 tran van tuan 5.0 8.5 9.0</pre>
    `,
    testCases: [
      { input: '1\n2\nnguyen van hai\n8.5 5.5 7.5\ntran van tuan\n8.5 5.0 9.0\n2\n2\ntran van nam\n5.5 5.0 6.0\n1\n2\nhoang dinh nam\n1.0 2.0 3.0\nphuong nam\n1.0 2.0 10.0\n3', expectedOutput: '4\n2 4\n3 hoang dinh nam 1.0 2.0 3.0\n2 tran van nam 5.0 5.5 6.0\n4 phuong nam 1.0 2.0 10.0\n1 tran van tuan 5.0 8.5 9.0' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_03',
    title: '3. Từ thuận nghịch dài nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Từ thuận nghịch dài nhất</h2>
      <p>Cho văn bản (tối đa 1000 từ). Tìm từ thuận nghịch có độ dài lớn nhất và số lần xuất hiện. Nếu có nhiều, liệt kê tất cả theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Một văn bản (nhiều dòng, kết thúc bằng EOF).</p>
      <h3>Output</h3>
      <p>Từ dài nhất + số lần xuất hiện. Nếu nhiều từ cùng độ dài max, liệt kê cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>AAA BAABA HDHDH ACBSD SRGTDH DDDDS DUAHD AAA AD DA HDHDH AAA AAA AAA AAA DDDAS HDHDH HDH AAA AAA AAA AAA AAA AAA AAA AAA DHKFKH DHDHDD HDHDHD DDDHHH HHHDDD TDTD</td><td>HDHDH 3</td></tr>
      </table>
    `,
    testCases: [
      { input: 'AAA BAABA HDHDH ACBSD SRGTDH DDDDS DUAHD AAA AD DA HDHDH AAA AAA AAA AAA DDDAS HDHDH HDH AAA AAA AAA AAA AAA AAA AAA AAA DHKFKH DHDHDD HDHDHD DDDHHH HHHDDD TDTD', expectedOutput: 'HDHDH 3' },
      { input: 'abc def cba abc', expectedOutput: 'cba 2', hidden: true },
      { input: 'aa bb cc', expectedOutput: 'aa 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_04',
    title: '4. Phân số - Rút gọn, Quy đồng, Tổng, Thương',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân số</h2>
      <p>Với mỗi bộ test (p, q): rút gọn, quy đồng (lcm), tính tổng và thương (p/q), rút gọn kết quả.</p>
      <h3>Input</h3>
      <p>Dòng 1: t (số bộ test). t dòng, mỗi dòng: tu1 mau1 tu2 mau2.</p>
      <h3>Output</h3>
      <p>Với mỗi test: "Case #i:" rồi 3 dòng: 2 phân số quy đồng, tổng, thương (dạng a/b).</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
2
2 3 4 5
1 4 7 8
<b>Output</b>
Case #1:
10/15 12/15
22/15
5/6
Case #2:
2/8 7/8
9/8
2/7</pre>
    `,
    testCases: [
      { input: '2\n2 3 4 5\n1 4 7 8', expectedOutput: 'Case #1:\n10/15 12/15\n22/15\n5/6\nCase #2:\n2/8 7/8\n9/8\n2/7' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_05',
    title: '5. Sắp xếp mặt hàng theo lợi nhuận',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp mặt hàng</h2>
      <p>Sắp xếp mặt hàng theo lợi nhuận giảm dần. Mỗi mặt hàng: tên, nhóm, giá mua, giá bán. Lợi nhuận = giá bán - giá mua.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n×4 dòng: Tên, Nhóm, Giá mua, Giá bán (mỗi trên 1 dòng).</p>
      <h3>Output</h3>
      <p>Danh sách đã sắp xếp: Mã Tên Nhóm Lợi nhuận (2 chữ số thập phân). Giữ thứ tự nếu cùng lợi nhuận.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
3
May tinh SONY VAIO
Dien tu
16400
17699
Tu lanh Side by Side
Dien lanh
18300
25999
Banh Chocopie
Tieu dung
27.5
37
<b>Output</b>
2 Tu lanh Side by Side Dien lanh 7699.00
1 May tinh SONY VAIO Dien tu 1299.00
3 Banh Chocopie Tieu dung 9.50</pre>
    `,
    testCases: [
      { input: '3\nMay tinh SONY VAIO\nDien tu\n16400\n17699\nTu lanh Side by Side\nDien lanh\n18300\n25999\nBanh Chocopie\nTieu dung\n27.5\n37', expectedOutput: '2 Tu lanh Side by Side Dien lanh 7699.00\n1 May tinh SONY VAIO Dien tu 1299.00\n3 Banh Chocopie Tieu dung 9.50' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_06',
    title: '6. Tìm thủ khoa kì thi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tìm thủ khoa</h2>
      <p>Tìm thí sinh có tổng điểm cao nhất. Nếu có nhiều, liệt kê tất cả theo mã tăng dần.</p>
      <h3>Struct</h3>
      <p><code>THISINH</code>: Mã (tự động tăng), Tên, Ngày sinh, Điểm 1, Điểm 2, Điểm 3.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n×5 dòng: Tên, Ngày sinh, Điểm 1, Điểm 2, Điểm 3.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: Mã Tên NgàySinh Tổng điểm. (Các thủ khoa có cùng điểm max, sắp xếp theo mã.)</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
3
Nguyen Van A
12/12/1994
3.5
7.0
5.5
Nguyen Van B
1/9/1994
7.5
9.5
9.5
Nguyen Van C
6/7/1994
8.5
9.5
8.5
<b>Output</b>
2 Nguyen Van B 1/9/1994 26.5
3 Nguyen Van C 6/7/1994 26.5</pre>
    `,
    testCases: [
      { input: '3\nNguyen Van A\n12/12/1994\n3.5\n7.0\n5.5\nNguyen Van B\n1/9/1994\n7.5\n9.5\n9.5\nNguyen Van C\n6/7/1994\n8.5\n9.5\n8.5', expectedOutput: '2 Nguyen Van B 1/9/1994 26.5\n3 Nguyen Van C 6/7/1994 26.5' },
      { input: '2\nA\n01/01/2000\n10.0\n10.0\n10.0\nB\n02/01/2000\n10.0\n10.0\n10.0', expectedOutput: '1 A 01/01/2000 30.0\n2 B 02/01/2000 30.0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b21_07',
    title: '7. Sắp xếp thí sinh',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp thí sinh</h2>
      <p>Sắp xếp thí sinh theo tổng điểm giảm dần. Nếu bằng điểm, giữ thứ tự ban đầu. Điểm tổng làm tròn 1 chữ số thập phân.</p>
      <h3>Struct</h3>
      <p><code>THISINH</code>: Mã (tự động tăng), Tên, Ngày sinh, Điểm 1, Điểm 2, Điểm 3.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n×5 dòng: Tên, Ngày sinh, Điểm 1, Điểm 2, Điểm 3.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: Mã Tên NgàySinh Tổng (1 chữ số thập phân). Sắp xếp giảm dần theo tổng.</p>
      <h3>Ví dụ</h3>
      <pre><b>Input</b>
3
Nguyen Van A
12/12/1994
3.5
7.0
5.5
Nguyen Van B
1/9/1994
7.5
9.5
9.5
Nguyen Van C
6/7/1994
4.5
4.5
5.0
<b>Output</b>
2 Nguyen Van B 1/9/1994 26.5
1 Nguyen Van A 12/12/1994 16.0
3 Nguyen Van C 6/7/1994 14.0</pre>
    `,
    testCases: [
      { input: '3\nNguyen Van A\n12/12/1994\n3.5\n7.0\n5.5\nNguyen Van B\n1/9/1994\n7.5\n9.5\n9.5\nNguyen Van C\n6/7/1994\n4.5\n4.5\n5.0', expectedOutput: '2 Nguyen Van B 1/9/1994 26.5\n1 Nguyen Van A 12/12/1994 16.0\n3 Nguyen Van C 6/7/1994 14.0' },
      { input: '2\nA\n01/01/2000\n10.0\n10.0\n10.0\nB\n02/01/2000\n9.0\n9.0\n9.0', expectedOutput: '1 A 01/01/2000 30.0\n2 B 02/01/2000 27.0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
