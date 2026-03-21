// Buổi 15: MA TRẬN VÀ MẢNG (PHẦN 4)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi15_lessons: Lesson[] = [
  {
    id: 'ch28_b15_01',
    title: '1. Loại bỏ trùng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ trùng</h2>
      <p>Loại bỏ các phần tử đã xuất hiện trước đó, giữ lại thứ tự xuất hiện đầu tiên.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mảng sau khi loại bỏ trùng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n1 5 10 10 5 2 3</td><td>1 5 10 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n1 5 10 10 5 2 3', expectedOutput: '1 5 10 2 3' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', hidden: true },
      { input: '4\n5 5 5 5', expectedOutput: '5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_02',
    title: '2. Tổng tam giác trên và tam giác dưới',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng tam giác trên và dưới</h2>
      <p>Tính tổng các phần tử tam giác trên (i < j) và tam giác dưới (i > j), không bao gồm đường chéo chính.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Dòng 1: tổng tam giác trên. Dòng 2: tổng tam giác dưới.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3\n1 2 3\n4 5 6\n7 8 9</td><td>11\n19</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '11\n19' },
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '70\n98', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_03',
    title: '3. Tổng nguyên tố tam giác trên',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng nguyên tố tam giác trên</h2>
      <p>Tính tổng các phần tử là số nguyên tố thuộc tam giác trên (i < j).</p>
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
      { input: '3\n2 3 5\n7 11 13\n17 19 23', expectedOutput: '45', hidden: true },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_04',
    title: '4. Max, min và vị trí (vị trí cuối)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max, min và vị trí cuối</h2>
      <p>Tìm max, min và vị trí xuất hiện cuối cùng của chúng (1-indexed).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và vị trí. Dòng 2: min và vị trí.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n9 1 2 1 18 16 5 9</td><td>18 5\n1 4</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n9 1 2 1 18 16 5 9', expectedOutput: '18 5\n1 4' },
      { input: '3\n5 3 5', expectedOutput: '5 3\n3 2', hidden: true },
      { input: '1\n42', expectedOutput: '42 1\n42 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_05',
    title: '5. Sắp xếp theo cột giảm dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp theo cột giảm dần</h2>
      <p>Sắp xếp các phần tử trong mỗi cột theo thứ tự giảm dần từ trên xuống dưới.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi sắp xếp, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3\n7 2 9\n4 5 6\n1 8 3</td><td>7 8 9\n4 5 6\n1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\n7 2 9\n4 5 6\n1 8 3', expectedOutput: '7 8 9\n4 5 6\n1 2 3' },
      { input: '2\n5 1\n3 4', expectedOutput: '5 4\n3 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_06',
    title: '6. Tổng nguyên tố tam giác dưới',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng nguyên tố tam giác dưới</h2>
      <p>Tính tổng các phần tử là số nguyên tố thuộc tam giác dưới (i > j). Nếu không có in ra 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
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
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '0', hidden: true },
      { input: '3\n2 3 5\n7 11 13\n17 19 23', expectedOutput: '78', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_07',
    title: '7. Nhỏ nhất và nhỏ thứ 2',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Nhỏ nhất và nhỏ thứ 2</h2>
      <p>Tìm giá trị nhỏ nhất và nhỏ thứ hai trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>min và min thứ 2.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n80 23 79 58 11 10</td><td>10 11</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n80 23 79 58 11 10', expectedOutput: '10 11' },
      { input: '4\n5 5 5 5', expectedOutput: '5 5', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '10 20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_08',
    title: '8. Tổng nguyên tố trên 2 đường chéo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng nguyên tố trên đường chéo</h2>
      <p>Tính tổng các số nguyên tố trên đường chéo chính và đường chéo phụ (mỗi phần tử được cộng riêng biệt).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Tổng các số nguyên tố trên cả hai đường chéo.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16</td><td>31</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '31' },
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '0', hidden: true },
      { input: '3\n2 3 5\n7 11 13\n17 19 23', expectedOutput: '85', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_09',
    title: '9. Đếm và liệt kê phần tử xuất hiện nhiều lần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm và liệt kê phần tử xuất hiện nhiều hơn một lần</h2>
      <p>Đếm và liệt kê các phần tử xuất hiện nhiều hơn 1 lần theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng. Dòng 2: các phần tử.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n1 5 10 10 5 2 3</td><td>2\n5 10</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n1 5 10 10 5 2 3', expectedOutput: '2\n5 10' },
      { input: '5\n1 2 3 4 5', expectedOutput: '0', hidden: true },
      { input: '6\n1 1 2 2 3 3', expectedOutput: '3\n1 2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_10',
    title: '10. Ma trận xoáy ốc Fibonacci',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoáy ốc Fibonacci</h2>
      <p>Ma trận xoáy ốc cấp N: các số Fibonacci từ 0, 1, 1, 2, 3... được điền theo chiều kim đồng hồ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n.</p>
      <h3>Output</h3>
      <p>Ma trận xoáy ốc Fibonacci, mỗi hàng trên một dòng (không có khoảng trắng giữa các số).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>0\n1\n1 3 2\n8 5 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3', expectedOutput: '0\n1\n1 3 2\n8 5 3' },
      { input: '2', expectedOutput: '0\n1\n1 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_11',
    title: '11. Liệt kê và đếm tần suất từng phần tử',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tần suất từng phần tử</h2>
      <p>Liệt kê mỗi phần tử cùng số lần xuất hiện theo thứ tự xuất hiện đầu tiên. Mỗi dòng gồm giá trị và số lần xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: giá trị và số lần xuất hiện.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 3 3 2 1 9 5</td><td>2 2\n3 2\n1 1\n9 1\n5 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 3 3 2 1 9 5', expectedOutput: '2 2\n3 2\n1 1\n9 1\n5 1' },
      { input: '5\n5 5 5 5 5', expectedOutput: '5 5', hidden: true },
      { input: '4\n1 2 3 4', expectedOutput: '1 1\n2 1\n3 1\n4 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_12',
    title: '12. Liệt kê số chẵn và số lẻ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê chẵn và lẻ</h2>
      <p>Liệt kê các số lẻ trước (số lượng + danh sách), sau đó các số chẵn (số lượng + danh sách). Mỗi loại in trên một dòng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lẻ và danh sách lẻ. Dòng 2: số chẵn và danh sách chẵn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n2 5 8 1 5 12 11</td><td>4 5 1 5 11\n3 2 8 12</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n2 5 8 1 5 12 11', expectedOutput: '4 5 1 5 11\n3 2 8 12' },
      { input: '4\n1 3 5 7', expectedOutput: '4 1 3 5 7\n0', hidden: true },
      { input: '4\n2 4 6 8', expectedOutput: '0\n4 2 4 6 8', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_13',
    title: '13. Đảo ngược mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đảo ngược mảng</h2>
      <p>Đảo ngược mảng và in ra kết quả.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mảng đảo ngược.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 3 4 5</td><td>5 4 3 2 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { input: '3\n1 2 3', expectedOutput: '3 2 1', hidden: true },
      { input: '2\n10 20', expectedOutput: '20 10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_14',
    title: '14. Tách mảng chẵn lẻ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tách mảng chẵn lẻ</h2>
      <p>Tách mảng thành mảng chẵn và mảng lẻ, giữ thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: các số chẵn. Dòng 2: các số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 3 4 5</td><td>2 4\n1 3 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '2 4\n1 3 5' },
      { input: '4\n1 3 5 7', expectedOutput: '0\n1 3 5 7', hidden: true },
      { input: '4\n2 4 6 8', expectedOutput: '2 4 6 8\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_15',
    title: '15. Sắp xếp chẵn lẻ tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp chẵn lẻ tăng dần</h2>
      <p>Sắp xếp chẵn tăng dần rồi lẻ tăng dần, giữ nguyên thứ tự ban đầu cho cặp chẵn-lẻ xen kẽ (chẵn đứng trước vị trí chẵn, lẻ đứng trước vị trí lẻ).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mảng sau khi sắp xếp.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 3 8 2 9 7 6 5</td><td>2 6 8 1 3 5 7 9</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 3 8 2 9 7 6 5', expectedOutput: '2 6 8 1 3 5 7 9' },
      { input: '5\n1 2 3 4 5', expectedOutput: '2 4 1 3 5', hidden: true },
      { input: '4\n1 3 5 7', expectedOutput: '1 3 5 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_16',
    title: '16. Chèn mảng B vào mảng A tại vị trí P',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chèn mảng</h2>
      <p>Chèn mảng B vào mảng A tại vị trí P (1-indexed, chèn trước phần tử tại vị trí P).</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. Dòng 2: n số nguyên (A). Dòng 3: m số nguyên (B). Dòng 4: P.</p>
      <h3>Output</h3>
      <p>Mảng kết quả.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 3\n1 2 3 4 5\n6 7 8\n3</td><td>1 2 6 7 8 3 4 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5 3\n1 2 3 4 5\n6 7 8\n3', expectedOutput: '1 2 6 7 8 3 4 5' },
      { input: '3 2\n1 2 3\n4 5\n1', expectedOutput: '4 5 1 2 3', hidden: true },
      { input: '4 2\n1 2 3 4\n5 6\n4', expectedOutput: '1 2 3 5 6 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_17',
    title: '17. Sắp xếp giảm dần',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp giảm dần</h2>
      <p>Sắp xếp các phần tử mảng theo thứ tự giảm dần.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mảng giảm dần.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 3 8 2 9 7 6 5</td><td>9 8 7 6 5 3 2 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 3 8 2 9 7 6 5', expectedOutput: '9 8 7 6 5 3 2 1' },
      { input: '5\n5 4 3 2 1', expectedOutput: '5 4 3 2 1', hidden: true },
      { input: '3\n1 2 3', expectedOutput: '3 2 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_18',
    title: '18. Chuyển 2 cột trong ma trận',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuyển 2 cột</h2>
      <p>Đổi chỗ hai cột a và b trong ma trận (1-indexed).</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là ma trận. Dòng cuối: a b.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi đổi, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 3\n4 5 6\n7 8 9\n1 3</td><td>3 2 1\n6 5 4\n9 8 7</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n1 3', expectedOutput: '3 2 1\n6 5 4\n9 8 7' },
      { input: '2 2\n1 2\n3 4\n1 2', expectedOutput: '2 1\n4 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_19',
    title: '19. Chuyển đổi 2 đường chéo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuyển đổi 2 đường chéo</h2>
      <p>Đổi chỗ các phần tử trên đường chéo chính và đường chéo phụ của ma trận vuông.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo là các phần tử của ma trận.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi đổi, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3\n1 2 3\n4 5 6\n7 8 9</td><td>3 2 1\n4 5 6\n9 8 7</td></tr>
      </table>
    `,
    testCases: [
      { input: '3\n1 2 3\n4 5 6\n7 8 9', expectedOutput: '3 2 1\n4 5 6\n9 8 7' },
      { input: '2\n1 2\n3 4', expectedOutput: '4 2\n3 1', hidden: true },
      { input: '4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', expectedOutput: '4 2 3 1\n5 6 7 8\n9 10 11 12\n16 14 15 13', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_20',
    title: '20. Chuyển đổi 2 hàng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển đổi 2 hàng</h2>
      <p>Đổi chỗ hai hàng a và b trong ma trận (1-indexed).</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là ma trận. Dòng cuối: a b.</p>
      <h3>Output</h3>
      <p>Ma trận sau khi đổi, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 3\n4 5 6\n7 8 9\n1 3</td><td>7 8 9\n4 5 6\n1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n1 3', expectedOutput: '7 8 9\n4 5 6\n1 2 3' },
      { input: '2 2\n1 2\n3 4\n1 2', expectedOutput: '3 4\n1 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_21',
    title: '21. Tổng 2 ma trận',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tổng 2 ma trận</h2>
      <p>Tính ma trận tổng A + B của hai ma trận cùng cỡ n×m.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo là A, n dòng tiếp theo là B.</p>
      <h3>Output</h3>
      <p>Ma trận tổng, mỗi hàng trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11</td><td>4 6 8\n10 12 14\n16 18 20</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n3 4 5\n6 7 8\n9 10 11', expectedOutput: '4 6 8\n10 12 14\n16 18 20' },
      { input: '2 2\n1 2\n3 4\n1 2\n3 4', expectedOutput: '2 4\n6 8', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_22',
    title: '22. Sắp xếp nổi bọt (bubble sort) - in từng bước',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Bubble Sort - từng bước</h2>
      <p>Sắp xếp tăng dần bằng thuật toán nổi bọt. In ra mảng sau mỗi lần đổi chỗ. Dừng sớm nếu mảng đã được sắp xếp.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: trạng thái mảng sau mỗi lần đổi chỗ. Dừng khi mảng tăng dần.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 3 8 2 9 7 6 5</td><td>1 3 2 8 9 7 6 5\n1 3 2 8 7 9 6 5\n1 3 2 8 7 6 9 5\n1 3 2 8 7 6 5 9\n1 3 2 7 8 6 5 9\n1 3 2 7 6 8 5 9\n1 3 2 7 6 5 8 9\n1 3 2 6 7 5 8 9\n1 3 2 6 5 7 8 9\n1 3 2 5 6 7 8 9\n1 2 3 5 6 7 8 9</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 3 8 2 9 7 6 5', expectedOutput: '1 3 2 8 9 7 6 5\n1 3 2 8 7 9 6 5\n1 3 2 8 7 6 9 5\n1 3 2 8 7 6 5 9\n1 3 2 7 8 6 5 9\n1 3 2 7 6 8 5 9\n1 3 2 7 6 5 8 9\n1 3 2 6 7 5 8 9\n1 3 2 6 5 7 8 9\n1 3 2 5 6 7 8 9\n1 2 3 5 6 7 8 9' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_23',
    title: '23. Sắp xếp chèn (insertion sort) - in từng bước',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Insertion Sort - từng bước</h2>
      <p>Sắp xếp tăng dần bằng thuật toán chèn. In ra mảng sau mỗi lần chèn phần tử vào đúng vị trí.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: trạng thái mảng sau mỗi lần chèn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 3 8 2 9 7 6 5</td><td>1 3 8 2 9 7 6 5\n1 3 8 2 9 7 6 5\n1 2 3 8 9 7 6 5\n1 2 3 8 9 7 6 5\n1 2 3 7 8 9 6 5\n1 2 3 6 7 8 9 5\n1 2 3 5 6 7 8 9</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 3 8 2 9 7 6 5', expectedOutput: '1 3 8 2 9 7 6 5\n1 3 8 2 9 7 6 5\n1 2 3 8 9 7 6 5\n1 2 3 8 9 7 6 5\n1 2 3 7 8 9 6 5\n1 2 3 6 7 8 9 5\n1 2 3 5 6 7 8 9' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b15_24',
    title: '24. Sắp xếp chọn (selection sort) - in từng bước',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Selection Sort - từng bước</h2>
      <p>Sắp xếp tăng dần bằng thuật toán chọn. Sau mỗi lần chọn phần tử nhỏ nhất còn lại và đổi chỗ với vị trí hiện tại, in ra mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: trạng thái mảng sau mỗi lần đổi chỗ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n64 25 12 22 11</td><td>11 25 12 22 64\n11 12 25 22 64\n11 12 22 25 64\n11 12 22 25 64</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n64 25 12 22 11', expectedOutput: '11 25 12 22 64\n11 12 25 22 64\n11 12 22 25 64\n11 12 22 25 64' },
      { input: '4\n1 2 3 4', expectedOutput: '1 2 3 4', hidden: true },
      { input: '3\n3 2 1', expectedOutput: '1 2 3\n1 2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
