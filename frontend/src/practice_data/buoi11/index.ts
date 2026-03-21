// Buổi 11: MẢNG NÂNG CAO

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi11_lessons: Lesson[] = [
  {
    id: 'ch28_b11_01',
    title: '1. Max và Max thứ 2',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max và Max thứ 2</h2>
      <p>Tìm số lớn nhất và số lớn thứ 2 trong mảng. In trên 2 dòng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (2 ≤ n ≤ 100). Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lớn nhất. Dòng 2: số lớn thứ 2.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 9</td><td>9\n9</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 9', expectedOutput: '9\n9' },
      { input: '5\n1 2 3 4 5', expectedOutput: '5\n4', hidden: true },
      { input: '2\n10 20', expectedOutput: '20\n10', hidden: true },
      { input: '3\n5 5 5', expectedOutput: '5\n5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_02',
    title: '2. Đếm số nguyên tố trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số nguyên tố</h2>
      <p>Đếm số lượng số nguyên tố trong mảng n phần tử.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng số nguyên tố.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 11</td><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 11', expectedOutput: '5' },
      { input: '5\n1 2 4 6 8', expectedOutput: '1', hidden: true },
      { input: '3\n2 3 5', expectedOutput: '3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_03',
    title: '3. Số thuận nghịch trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số thuận nghịch trong mảng</h2>
      <p>Đếm và liệt kê các số thuận nghịch trong mảng theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng. Dòng 2: các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n22 556 787 121 1 2 3 4 5 9899</td><td>8\n22 787 121 1 2 3 4 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n22 556 787 121 1 2 3 4 5 9899', expectedOutput: '8\n22 787 121 1 2 3 4 5' },
      { input: '5\n1 2 3 4 5', expectedOutput: '5\n1 2 3 4 5', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_04',
    title: '4. Đếm chữ số chẵn/lẻ trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số chẵn/lẻ</h2>
      <p>Đếm số lượng chữ số chẵn và lẻ trong tất cả các phần tử của mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên không âm.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng chữ số chẵn. Dòng 2: số lượng chữ số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n1 98 13 24 76 8723</td><td>8\n5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1(0), 98(2 chẵn), 13(1 lẻ), 24(2 chẵn), 76(2 chẵn), 8723(3 chẵn, 2 lẻ) → chẵn=0+2+0+2+2+3=8, lẻ=1+0+1+0+0+2=5</p>
    `,
    testCases: [
      { input: '6\n1 98 13 24 76 8723', expectedOutput: '8\n5' },
      { input: '3\n1 3 5', expectedOutput: '0\n3', hidden: true },
      { input: '2\n2 4', expectedOutput: '2\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_05',
    title: '5. Trung bình cộng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Trung bình cộng</h2>
      <p>Tính giá trị trung bình cộng của các phần tử trong mảng, in với 2 chữ số thập phân.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Giá trị trung bình với 2 chữ số thập phân.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n1 2 3 4</td><td>2.50</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1 2 3 4', expectedOutput: '2.50' },
      { input: '2\n1 2', expectedOutput: '1.50', hidden: true },
      { input: '5\n5 5 5 5 5', expectedOutput: '5.00', hidden: true },
      { input: '1\n100', expectedOutput: '100.00', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_06',
    title: '6. Số chính phương trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số chính phương trong mảng</h2>
      <p>Đếm và liệt kê các số chính phương trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên không âm.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng. Dòng 2: các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 1000000000000</td><td>4\n1 4 9 1000000000000</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 1000000000000', expectedOutput: '4\n1 4 9 1000000000000' },
      { input: '5\n1 4 9 16 25', expectedOutput: '5\n1 4 9 16 25', hidden: true },
      { input: '3\n2 3 5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_07',
    title: '7. Đếm xuất hiện của x',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm xuất hiện</h2>
      <p>Đếm số lần xuất hiện của x trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên. Dòng 3: x.</p>
      <h3>Output</h3>
      <p>Số lần xuất hiện của x.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n9 8 66 775 13 14 14 1 94 114\n15</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n9 8 66 775 13 14 14 1 94 114\n15', expectedOutput: '0' },
      { input: '5\n1 2 2 2 3\n2', expectedOutput: '3', hidden: true },
      { input: '3\n5 5 5\n5', expectedOutput: '3', hidden: true },
      { input: '1\n42\n42', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_08',
    title: '8. Số nguyên tố cùng nhau với x',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nguyên tố cùng nhau với x</h2>
      <p>Đếm và liệt kê các số nguyên tố cùng nhau với x (GCD=1) trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên. Dòng 3: x.</p>
      <h3>Output</h3>
      <p>Dòng 1: số lượng. Dòng 2: các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n4 6 2 3 4 5 6 7 8 9 10\n6</td><td>9\n2 3 4 5 6 7 8 9 10</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n4 6 2 3 4 5 6 7 8 9 10\n6', expectedOutput: '9\n2 3 4 5 6 7 8 9 10' },
      { input: '5\n1 2 3 4 5\n1', expectedOutput: '5\n1 2 3 4 5', hidden: true },
      { input: '3\n2 4 6\n2', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_09',
    title: '9. Max, min và vị trí',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max, min và vị trí</h2>
      <p>Tìm số lớn nhất và nhỏ nhất trong mảng cùng vị trí xuất hiện cuối cùng của chúng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và vị trí (1-indexed). Dòng 2: min và vị trí (1-indexed).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n1 2 3 4 5 5 -1 5</td><td>5 5\n-1 7</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n1 2 3 4 5 5 -1 5', expectedOutput: '5 5\n-1 7' },
      { input: '3\n5 3 5', expectedOutput: '5 3\n3 2', hidden: true },
      { input: '1\n42', expectedOutput: '42 1\n42 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_10',
    title: '10. Vị trí min và min thứ 2',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vị trí min và min thứ 2</h2>
      <p>Tìm vị trí của số nhỏ nhất và nhỏ thứ 2 trong mảng đôi một khác nhau.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên đôi một khác nhau.</p>
      <h3>Output</h3>
      <p>Dòng 1: vị trí min (1-indexed). Dòng 2: vị trí min thứ 2 (1-indexed).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 9 8 7 6 5 4 10</td><td>1\n4</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 9 8 7 6 5 4 10', expectedOutput: '1\n4' },
      { input: '5\n5 4 3 2 1', expectedOutput: '5\n4', hidden: true },
      { input: '2\n10 20', expectedOutput: '1\n2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_11',
    title: '11. Lineland',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Lineland</h2>
      <p>Có n thành phố trên trục Ox theo thứ tự tăng dần. Với mỗi thành phố, tính chi phí gửi thư tối thiểu (đến thành phố gần nhất khác) và tối đa (đến thành phố xa nhất).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên xi (đã sắp xếp tăng dần).</p>
      <h3>Output</h3>
      <p>n dòng, mỗi dòng: min_i max_i cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n-1 2 2 7</td><td>3 12\n3 9\n4 7\n5 12</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n-1 2 2 7', expectedOutput: '3 12\n3 9\n4 7\n5 12' },
      { input: '2\n0 10', expectedOutput: '10 10\n10 10', hidden: true },
      { input: '3\n-5 0 5', expectedOutput: '5 10\n5 10\n5 10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b11_12',
    title: '12. Die Hard - Đổi tiền',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Die Hard - Đổi tiền</h2>
      <p>Mỗi người có tiền 25, 50 hoặc 100. Vé giá 25. Kiểm tra xem có thể đổi tiền cho tất cả không, ban đầu không có tiền.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số (25, 50 hoặc 100).</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n25 25 50 50</td><td>YES</td></tr>
        <tr><td>5\n25 25 100</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n25 25 50 50', expectedOutput: 'YES' },
      { input: '3\n25 50 100', expectedOutput: 'YES', hidden: true },
      { input: '2\n50 100', expectedOutput: 'NO', hidden: true },
      { input: '5\n25 25 25 25 100', expectedOutput: 'YES', hidden: true },
      { input: '1\n100', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
