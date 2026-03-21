// Buổi 13: MA TRẬN VÀ MẢNG (PHẦN 2)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi13_lessons: Lesson[] = [
  {
    id: 'ch28_b13_01',
    title: '1. Tổng số nguyên tố tam giác dưới',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số nguyên tố tam giác dưới</h2>
      <p>Tính tổng các phần tử là số nguyên tố thuộc tam giác dưới (i ≥ j). Nếu không có in ra 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là n số nguyên của mỗi hàng.</p>
      <h3>Output</h3>
      <p>Tổng các số nguyên tố trong tam giác dưới.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>29</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '29' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '10', hidden: true },
      { input: '2\n1 1\n1 2', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_02',
    title: '2. Đếm nguyên tố trên 2 đường chéo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm nguyên tố trên đường chéo</h2>
      <p>Đếm các số nguyên tố trên đường chéo chính và đường chéo phụ (mỗi phần tử chỉ đếm một lần).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Số lượng số nguyên tố trên cả hai đường chéo.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '3' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1', hidden: true },
      { input: '3\n2 3 5\n7 11 13\n17 19 23', expectedOutput: '9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_03',
    title: '3. Xoay ma trận 180 độ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xoay ma trận 180 độ</h2>
      <p>Thực hiện xoay ma trận vuông một góc 180 độ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi xoay 180 độ, mỗi hàng trên một dòng, các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>16 15 14 13\n12 11 10 9\n8 7 6 5\n4 3 2 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '16 15 14 13\n12 11 10 9\n8 7 6 5\n4 3 2 1' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '9 8 7\n6 5 4\n3 2 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_04',
    title: '4. Đếm số chẵn và lẻ trong mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đếm chẵn lẻ</h2>
      <p>Đếm số phần tử chẵn và số phần tử lẻ trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số phần tử chẵn và số phần tử lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 3 7 9 1</td><td>1 4</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 3 7 9 1', expectedOutput: '1 4' },
      { input: '4\n1 3 5 7', expectedOutput: '0 4', hidden: true },
      { input: '6\n2 4 6 8 10 12', expectedOutput: '6 0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_05',
    title: '5. Ma trận chuyển vị',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Ma trận chuyển vị</h2>
      <p>Chuyển ma trận vuông từ hàng thành cột (đảo hàng thành cột).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận chuyển vị, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '1 4 7\n2 5 8\n3 6 9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_06',
    title: '6. Kiểm tra mảng đối xứng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra mảng đối xứng</h2>
      <p>Kiểm tra xem mảng có đối xứng hay không. Nếu đối xứng in ra 1, không đối xứng in ra 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>1 nếu đối xứng, 0 nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12\n1 2 3 4 5 6 5 4 3 2 1</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '12\n1 2 3 4 5 6 5 4 3 2 1', expectedOutput: '1' },
      { input: '5\n1 2 3 4 5', expectedOutput: '0', hidden: true },
      { input: '6\n1 2 3 3 2 1', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_07',
    title: '7. Loại bỏ hàng cột (tính lại trên ma trận ban đầu)',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ hàng cột</h2>
      <p>Loại bỏ hàng và cột có tổng lớn nhất khỏi ma trận. Trước hết loại bỏ hàng có tổng lớn nhất, sau đó tính toán lại trên ma trận ban đầu và loại tiếp cột có tổng lớn nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận còn lại, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 4\n3 4 0\n6 3 5</td><td>2 4\n4 0</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Tổng hàng: [7, 7, 14] → loại hàng 3. Tổng cột (trên ma trận ban đầu): [10, 9, 9] → loại cột 1.</p>
    `,
    testCases: [
      { input: '3 3\n1 2 4\n3 4 0\n6 3 5', expectedOutput: '2 4\n4 0' },
      { input: '4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '2 3 4\n6 7 8\n10 11 12', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_08',
    title: '8. Xoay ma trận 90 độ theo chiều kim đồng hồ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xoay ma trận 90 độ CW</h2>
      <p>Thực hiện xoay ma trận vuông một góc 90 độ theo chiều kim đồng hồ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi xoay, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '7 4 1\n8 5 2\n9 6 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_09',
    title: '9. Đếm và liệt kê số chẵn/lẻ trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm và liệt kê chẵn lẻ</h2>
      <p>Đếm và liệt kê các phần tử chẵn và lẻ trong mảng theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số chẵn và liệt kê các số chẵn. Dòng 2: số lẻ và liệt kê các số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 5 8 1 5 12 11</td><td>3 2 8 12\n4 5 1 5 11</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 5 8 1 5 12 11', expectedOutput: '3 2 8 12\n4 5 1 5 11' },
      { input: '4\n1 3 5 7', expectedOutput: '0\n4 1 3 5 7', hidden: true },
      { input: '3\n2 4 6', expectedOutput: '3 2 4 6\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_10',
    title: '10. Tìm phần tử lớn thứ hai',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Phần tử lớn thứ hai</h2>
      <p>Tìm phần tử lớn thứ hai trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Phần tử lớn thứ hai.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 3 7 9 1</td><td>7</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 3 7 9 1', expectedOutput: '7' },
      { input: '4\n5 5 5 5', expectedOutput: '5', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_11',
    title: '11. Liệt kê phần tử xuất hiện nhiều hơn một lần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phần tử xuất hiện nhiều hơn một lần</h2>
      <p>Liệt kê các phần tử xuất hiện nhiều hơn 1 lần theo thứ tự xuất hiện. Nếu không có in ra 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các phần tử thỏa mãn cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 3 3 2 1 9 5</td><td>2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 3 3 2 1 9 5', expectedOutput: '2 3' },
      { input: '5\n1 2 3 4 5', expectedOutput: '0', hidden: true },
      { input: '6\n1 1 1 2 2 3', expectedOutput: '1 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_12',
    title: '12. Loại bỏ hàng cột (cách khác)',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ hàng và cột có tổng lớn nhất</h2>
      <p>Loại bỏ hàng có tổng lớn nhất trước, sau đó tiếp tục loại cột có tổng lớn nhất (tính trên ma trận đã loại hàng).</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận còn lại, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 4\n1 2 4 3\n3 4 0 6\n6 3 5 0</td><td>2 4 0\n4 3 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 4\n1 2 4 3\n3 4 0 6\n6 3 5 0', expectedOutput: '2 4 0\n4 3 5' },
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '2 3\n5 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_13',
    title: '13. Tìm cột có tổng lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Cột có tổng lớn nhất</h2>
      <p>Tìm cột có tổng các phần tử lớn nhất. In ra thứ tự cột (1-indexed) và các giá trị của cột đó.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Dòng 1: thứ tự cột. Dòng 2: các giá trị của cột đó.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>4\n4 8 12 16</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '4\n4 8 12 16' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '3\n3 6 9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_14',
    title: '14. Đếm số nguyên tố và tần suất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm nguyên tố và tần suất</h2>
      <p>Tìm các số nguyên tố trong dãy, liệt kê theo thứ tự từ nhỏ đến lớn kèm số lần xuất hiện. Mỗi số in trên một dòng gồm giá trị và số lần xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: số nguyên tố và số lần xuất hiện.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 3 2 1 3 2 7 8</td><td>2 3\n3 3\n7 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 3 2 1 3 2 7 8', expectedOutput: '2 3\n3 3\n7 1' },
      { input: '5\n1 4 6 8 9', expectedOutput: '0', hidden: true },
      { input: '6\n2 3 5 2 3 5', expectedOutput: '2 2\n3 2\n5 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_15',
    title: '15. Tìm cột có tổng nhỏ nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Cột có tổng nhỏ nhất</h2>
      <p>Tìm cột có tổng các phần tử nhỏ nhất. In ra thứ tự cột (1-indexed) và các giá trị của cột đó.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Dòng 1: thứ tự cột. Dòng 2: các giá trị của cột đó.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>1\n1 5 9 13</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '1\n1 5 9 13' },
      { input: '3\n3 2 1\n6 5 4\n9 8 7', expectedOutput: '3\n1 4 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_16',
    title: '16. Xoay ma trận 90 độ ngược chiều kim đồng hồ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xoay ma trận 90 độ CCW</h2>
      <p>Thực hiện xoay ma trận vuông một góc 90 độ ngược chiều kim đồng hồ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi xoay, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>4 8 12 16\n3 7 11 15\n2 6 10 14\n1 5 9 13</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '4 8 12 16\n3 7 11 15\n2 6 10 14\n1 5 9 13' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '3 6 9\n2 5 8\n1 4 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b13_17',
    title: '17. Tìm max và min trong mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Max và min</h2>
      <p>Tìm phần tử lớn nhất và nhỏ nhất trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max. Dòng 2: min.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 3 7 9 1</td><td>9\n1</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 3 7 9 1', expectedOutput: '9\n1' },
      { input: '3\n5 5 5', expectedOutput: '5\n5', hidden: true },
      { input: '4\n10 20 30 40', expectedOutput: '40\n10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
