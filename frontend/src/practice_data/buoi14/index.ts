// Buổi 14: MA TRẬN VÀ MẢNG (PHẦN 3)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi14_lessons: Lesson[] = [
  {
    id: 'ch28_b14_01',
    title: '1. Ma trận xoáy ốc',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoáy ốc</h2>
      <p>Ma trận xoáy ốc cấp N: các số từ 1 đến N² được điền theo chiều kim đồng hồ theo thứ tự tăng dần.</p>
      <h3>Input</h3>
      <p>Dòng 1: n.</p>
      <h3>Output</h3>
      <p>Ma trận xoáy ốc, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>1 2 3\n8 9 4\n7 6 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '3', expectedOutput: '1 2 3\n8 9 4\n7 6 5' },
      { input: '4', expectedOutput: '1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7', hidden: true },
      { input: '2', expectedOutput: '1 2\n4 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_02',
    title: '2. Ma trận xoáy ốc ngược',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoáy ốc ngược</h2>
      <p>Ma trận xoáy ốc ngược cấp N: các số từ N² đến 1 được điền theo chiều kim đồng hồ theo thứ tự giảm dần (bắt đầu từ góc trên trái).</p>
      <h3>Input</h3>
      <p>Dòng 1: n.</p>
      <h3>Output</h3>
      <p>Ma trận xoáy ốc ngược, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>9 8 7\n2 1 6\n3 4 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '3', expectedOutput: '9 8 7\n2 1 6\n3 4 5' },
      { input: '4', expectedOutput: '16 15 14 13\n5 4 3 12\n6 7 8 9\n10 11 12 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_03',
    title: '3. Ma trận xoáy ốc nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoáy ốc nguyên tố</h2>
      <p>Ma trận xoáy ốc cấp N: các số nguyên tố từ nhỏ đến lớn được điền theo chiều kim đồng hồ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n.</p>
      <h3>Output</h3>
      <p>Ma trận xoáy ốc nguyên tố, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>2 3 5\n19 23 7\n17 13 11</td></tr>
      </table>
    `,
    testCases: [
      { input: '3', expectedOutput: '2 3 5\n19 23 7\n17 13 11' },
      { input: '2', expectedOutput: '2 3\n5 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_04',
    title: '4. Tổng nguyên tố tam giác trên',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng nguyên tố tam giác trên</h2>
      <p>Tính tổng các phần tử là số nguyên tố thuộc tam giác trên (i < j), không bao gồm đường chéo chính.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Tổng các số nguyên tố trong tam giác trên.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>12</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '12' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '0', hidden: true },
      { input: '3\n2 3 5\n7 11 13\n17 19 23', expectedOutput: '60', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_05',
    title: '5. Đếm nguyên tố trong mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đếm nguyên tố</h2>
      <p>Đếm các phần tử là số nguyên tố trong mảng và liệt kê chúng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng và liệt kê các số nguyên tố.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n1 5 3 19 18 25</td><td>3 5 3 19</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n1 5 3 19 18 25', expectedOutput: '3 5 3 19' },
      { input: '5\n1 4 6 8 9', expectedOutput: '0', hidden: true },
      { input: '4\n2 3 5 7', expectedOutput: '4 2 3 5 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_06',
    title: '6. Liệt kê phần tử xuất hiện một lần',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Phần tử xuất hiện một lần</h2>
      <p>Liệt kê các phần tử chỉ xuất hiện 1 lần trong mảng theo thứ tự xuất hiện. Nếu không có in ra 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các phần tử thỏa mãn cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 3 3 2 1 9 5</td><td>1 9 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 3 3 2 1 9 5', expectedOutput: '1 9 5' },
      { input: '4\n1 1 1 1', expectedOutput: '0', hidden: true },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_07',
    title: '7. Tích ma trận với chuyển vị',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Tích A × Aᵀ</h2>
      <p>Cho ma trận A cấp N×M. Tính tích của A với ma trận chuyển vị Aᵀ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là các phần tử của ma trận A.</p>
      <h3>Output</h3>
      <p>Ma trận tích (n×m × m×n = n×n), mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 2\n1 2\n3 4</td><td>5 11\n11 25</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 2\n1 2\n3 4', expectedOutput: '5 11\n11 25' },
      { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '14 32\n32 77', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_08',
    title: '8. Đếm nguyên tố trên 2 đường chéo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm nguyên tố trên đường chéo</h2>
      <p>Đếm các số nguyên tố trên đường chéo chính và đường chéo phụ (mỗi giá trị chỉ đếm một lần).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Số lượng số nguyên tố.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '3' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_09',
    title: '9. Khoảng cách nhỏ nhất giữa 2 phần tử',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Khoảng cách nhỏ nhất</h2>
      <p>Tìm khoảng cách nhỏ nhất giữa hai phần tử bất kỳ trong mảng. Nếu có nhiều cặp cùng khoảng cách, in cặp có phần tử xuất hiện đầu tiên.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Hai số của cặp có khoảng cách nhỏ nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n1 5 3 19 18 25</td><td>1 18 19</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n1 5 3 19 18 25', expectedOutput: '1 18 19' },
      { input: '4\n1 10 20 30', expectedOutput: '10 20', hidden: true },
      { input: '5\n5 5 5 5 5', expectedOutput: '5 5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_10',
    title: '10. Đếm số thuận nghịch trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số thuận nghịch</h2>
      <p>Đếm và liệt kê các số thuận nghịch có ít nhất 2 chữ số trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng và liệt kê các số thuận nghịch.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n1 525 44 19 181 25</td><td>3 525 44 181</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n1 525 44 19 181 25', expectedOutput: '3 525 44 181' },
      { input: '5\n1 2 3 4 5', expectedOutput: '0', hidden: true },
      { input: '4\n11 22 33 44', expectedOutput: '4 11 22 33 44', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_11',
    title: '11. Liệt kê giá trị trong mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê giá trị</h2>
      <p>Liệt kê các giá trị có trong mảng theo thứ tự xuất hiện đầu tiên (mỗi giá trị chỉ liệt kê 1 lần).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các giá trị cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 3 3 2 1 9 5</td><td>2 3 1 9 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 3 3 2 1 9 5', expectedOutput: '2 3 1 9 5' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', hidden: true },
      { input: '4\n5 5 5 5', expectedOutput: '5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_12',
    title: '12. Sắp xếp tăng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp tăng</h2>
      <p>Sắp xếp các phần tử mảng theo thứ tự tăng dần và in ra.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mảng sau khi sắp xếp, các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 3 8 2 9 7 6 5</td><td>1 2 3 5 6 7 8 9</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 3 8 2 9 7 6 5', expectedOutput: '1 2 3 5 6 7 8 9' },
      { input: '5\n5 4 3 2 1', expectedOutput: '1 2 3 4 5', hidden: true },
      { input: '3\n1 2 3', expectedOutput: '1 2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_13',
    title: '13. Hàng có nhiều nguyên tố nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hàng có nhiều nguyên tố nhất</h2>
      <p>Tìm hàng có nhiều phần tử là số nguyên tố nhất. Nếu có nhiều hàng cùng, in hàng đầu tiên.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Dòng 1: thứ tự hàng (1-indexed). Dòng 2: các số nguyên tố trong hàng đó.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n8 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>1\n2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n8 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '1\n2 3' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1\n2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_14',
    title: '14. Dịch mảng sang phải',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Dịch mảng sang phải</h2>
      <p>Dịch các phần tử của mảng sang phải k vị trí (phần tử cuối quay về đầu).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên. Dòng 3: k.</p>
      <h3>Output</h3>
      <p>Mảng sau khi dịch, các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 10\n3</td><td>8 9 10 1 2 3 4 5 6 7</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 10\n3', expectedOutput: '8 9 10 1 2 3 4 5 6 7' },
      { input: '5\n1 2 3 4 5\n1', expectedOutput: '5 1 2 3 4', hidden: true },
      { input: '4\n1 2 3 4\n4', expectedOutput: '1 2 3 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_15',
    title: '15. Tổng từng hàng và từng cột',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng hàng và cột</h2>
      <p>Tính tổng từng hàng và từng cột của ma trận vuông.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Dòng 1: tổng các hàng. Dòng 2: tổng các cột.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3\n1 2 3\n4 5 6\n7 8 9</td><td>6 15 24\n12 15 18</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '6 15 24\n12 15 18' },
      { input: '2\n1 2\n3 4', expectedOutput: '3 7\n4 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_16',
    title: '16. Tích 2 ma trận',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Tích 2 ma trận</h2>
      <p>Tính ma trận tích A × B với A là ma trận n×m và B là ma trận m×n.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là A, m dòng tiếp theo là B.</p>
      <h3>Output</h3>
      <p>Ma trận tích n×n, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11</td><td>42 48 54\n93 108 123\n144 168 192</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11', expectedOutput: '42 48 54\n93 108 123\n144 168 192' },
      { input: '2 3\n1 2 3\n4 5 6\n1 2\n3 4\n5 6', expectedOutput: '22 28\n49 64', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_17',
    title: '17. Đếm và liệt kê phần tử xuất hiện đúng một lần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm và liệt kê phần tử xuất hiện đúng một lần</h2>
      <p>Đếm và liệt kê các phần tử chỉ xuất hiện đúng một lần theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng. Dòng 2: các phần tử.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>9\n1 5 10 10 5 2 3</td><td>3\n1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '9\n1 5 10 10 5 2 3', expectedOutput: '3\n1 2 3' },
      { input: '5\n1 1 1 1 1', expectedOutput: '0', hidden: true },
      { input: '6\n1 2 3 4 5 6', expectedOutput: '6\n1 2 3 4 5 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_18',
    title: '18. Hiệu 2 ma trận',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hiệu 2 ma trận</h2>
      <p>Tính ma trận hiệu A - B với hai ma trận cùng cỡ n×m.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là A, n dòng tiếp theo là B.</p>
      <h3>Output</h3>
      <p>Ma trận hiệu, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11</td><td>-2 -2 -2\n-2 -2 -2\n-2 -2 -2</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11', expectedOutput: '-2 -2 -2\n-2 -2 -2\n-2 -2 -2' },
      { input: '2 2\n1 2\n3 4\n1 2\n3 4', expectedOutput: '0 0\n0 0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_19',
    title: '19. Dịch mảng sang trái',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Dịch mảng sang trái</h2>
      <p>Dịch các phần tử của mảng sang trái k vị trí (phần tử đầu quay về cuối).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên. Dòng 3: k.</p>
      <h3>Output</h3>
      <p>Mảng sau khi dịch, các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 10\n3</td><td>4 5 6 7 8 9 10 1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 10\n3', expectedOutput: '4 5 6 7 8 9 10 1 2 3' },
      { input: '5\n1 2 3 4 5\n1', expectedOutput: '2 3 4 5 1', hidden: true },
      { input: '4\n1 2 3 4\n4', expectedOutput: '1 2 3 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b14_20',
    title: '20. Lớn nhất và lớn thứ 2',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Lớn nhất và lớn thứ 2</h2>
      <p>Tìm giá trị lớn nhất và lớn thứ hai trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và max thứ 2 cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n80 23 79 58 11 10</td><td>80 79</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n80 23 79 58 11 10', expectedOutput: '80 79' },
      { input: '4\n5 5 5 5', expectedOutput: '5 5', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '30 20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
