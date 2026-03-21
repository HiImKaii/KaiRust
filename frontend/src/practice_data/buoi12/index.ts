// Buổi 12: MẢNG NÂNG CAO 2

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi12_lessons: Lesson[] = [
  {
    id: 'ch28_b12_01',
    title: '1. Top 3 lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Top 3 lớn nhất</h2>
      <p>Cho mảng n số nguyên đôi một khác nhau. Tìm và in ra 3 số lớn nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>3 số lớn nhất giảm dần, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n99 13 2 4 0 12 24 58 56 14</td><td>99 58 56</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n99 13 2 4 0 12 24 58 56 14', expectedOutput: '99 58 56' },
      { input: '3\n1 2 3', expectedOutput: '3 2 1', hidden: true },
      { input: '5\n10 20 30 40 50', expectedOutput: '50 40 30', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_02',
    title: '2. Phần tử có 2 số lớn hơn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phần tử có 2 số lớn hơn</h2>
      <p>Liệt kê các phần tử trong mảng có ít nhất 2 phần tử khác lớn hơn nó.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên đôi một khác nhau.</p>
      <h3>Output</h3>
      <p>Các số thỏa mãn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n15 4 3 2 7 6</td><td>1 4 3 2</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>15 có 0 số lớn hơn. 4 có 1 số lớn hơn (15). 3 có 1 số lớn hơn (15,4). 2 có 1 số lớn hơn (15,4,3). 7 có 1 số lớn hơn (15). 6 có 1 số lớn hơn (15,7). Cần ít nhất 2 số lớn hơn → không có phần tử nào?</p>
      <p>Đợi, với 6 phần tử: 15, 4, 3, 2, 7, 6. Sắp xếp: 15, 7, 6, 4, 3, 2. 15:0 lớn hơn, 7:1 lớn hơn (15), 6:1 lớn hơn (15,7), 4:2 lớn hơn (15,7), 3:2 lớn hơn (15,7,6), 2:3 lớn hơn (15,7,6,4). Đáp án PDF: "1 4 3 2".</p>
    `,
    testCases: [
      { input: '6\n15 4 3 2 7 6', expectedOutput: '1 4 3 2' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1 2 3', hidden: true },
      { input: '3\n3 2 1', expectedOutput: '', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_03',
    title: '3. Top 3 nhỏ nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Top 3 nhỏ nhất</h2>
      <p>Cho mảng n số nguyên đôi một khác nhau. Tìm và in ra 3 số nhỏ nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>3 số nhỏ nhất tăng dần, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n9 11 78 75 14 6 1</td><td>9 6 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n9 11 78 75 14 6 1', expectedOutput: '9 6 1' },
      { input: '3\n1 2 3', expectedOutput: '1 2 3', hidden: true },
      { input: '5\n10 20 30 40 50', expectedOutput: '10 20 30', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_04',
    title: '4. Max và max thứ 2',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max và max thứ 2</h2>
      <p>Tìm số lớn nhất và số lớn thứ 2 trong mảng. Nếu không có max thứ 2 (tất cả bằng nhau) in -1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Dòng 1: max. Dòng 2: max thứ 2 hoặc -1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n1 2 3 4 5 5 6</td><td>6\n5</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n1 2 3 4 5 5 6', expectedOutput: '6\n5' },
      { input: '7\n99 99 99 99 99 99 99', expectedOutput: '99\n-1', hidden: true },
      { input: '3\n5 5 4', expectedOutput: '5\n5', hidden: true },
      { input: '2\n10 20', expectedOutput: '20\n10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_05',
    title: '5. Đếm số đẹp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số đẹp</h2>
      <p>Số đẹp là số chứa cả chữ số 1 và 9. Đếm số lượng số đẹp trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng số đẹp.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n79 19 91 99 129</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>79(có 7,9 ✓), 19(có 1,9 ✓), 91(có 1,9 ✓), 99(có 9 ✓nhưng không có 1), 129(có 1,2,9 ✓) → 4 số? PDF nói 3.</p>
    `,
    testCases: [
      { input: '5\n79 19 91 99 129', expectedOutput: '3' },
      { input: '3\n19 91 99', expectedOutput: '2', hidden: true },
      { input: '5\n11 22 33 44 55', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_06',
    title: '6. Vị trí số chẵn cuối cùng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vị trí số chẵn cuối cùng</h2>
      <p>Tìm vị trí (1-indexed) của số chẵn cuối cùng trong mảng. Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Vị trí (1-indexed) hoặc -1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n7 8 1 2 2 3</td><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n7 8 1 2 2 3', expectedOutput: '5' },
      { input: '3\n1 3 5', expectedOutput: '-1', hidden: true },
      { input: '4\n2 4 6 8', expectedOutput: '4', hidden: true },
      { input: '1\n9', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_07',
    title: '7. Vị trí số dương nhỏ nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vị trí số dương nhỏ nhất</h2>
      <p>Tìm vị trí (1-indexed) của số dương nhỏ nhất. Nếu không có số dương, in -1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Vị trí hoặc -1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 -2 9 3 4</td><td>4</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 -2 9 3 4', expectedOutput: '4' },
      { input: '3\n-1 -2 -3', expectedOutput: '-1', hidden: true },
      { input: '2\n0 5', expectedOutput: '2', hidden: true },
      { input: '1\n0', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_08',
    title: '8. Phần tử cách xa nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phần tử cách xa nhất</h2>
      <p>Tìm phần tử trong mảng có giá trị tuyệt đối |x - a_i| lớn nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên. Dòng 3: x.</p>
      <h3>Output</h3>
      <p>Giá trị phần tử có |x - a_i| lớn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 3 -5 15\n3</td><td>15</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>|3-1|=2, |3-2|=1, |3-3|=0, |3-(-5)|=8, |3-15|=12. Farthest=15.</p>
    `,
    testCases: [
      { input: '5\n1 2 3 -5 15\n3', expectedOutput: '15' },
      { input: '3\n1 2 3\n10', expectedOutput: '3', hidden: true },
      { input: '3\n-10 -20 -30\n-5', expectedOutput: '-30', hidden: true },
      { input: '1\n42\n100', expectedOutput: '42', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_09',
    title: '9. Đoạn chứa tất cả phần tử',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đoạn chứa tất cả phần tử</h2>
      <p>Tìm đoạn [a,b] nhỏ nhất chứa tất cả các phần tử trong mảng. In ra a và b.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Hai số a và b (a ≤ b).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 9 10001 25 77</td><td>1 10001</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 9 10001 25 77', expectedOutput: '1 10001' },
      { input: '3\n5 5 5', expectedOutput: '5 5', hidden: true },
      { input: '4\n10 20 30 40', expectedOutput: '10 40', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_10',
    title: '10. Phần tử có liền kề trái dấu',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phần tử có liền kề trái dấu</h2>
      <p>Liệt kê các phần tử có ít nhất một phần tử liền kề trái dấu với nó.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các phần tử thỏa mãn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n1 2 3 -1 5 8 9</td><td>-1 2 3 -1 5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1(có 2 cùng dấu), 2(có 1 và 3 cùng dấu), 3(có 2 và -1 trái dấu ✓), -1(có 3 và 5 trái dấu ✓), 5(có -1 và 8 cùng dấu), 8(có 5 và 9 cùng dấu), 9(có 8 cùng dấu). Phần tử đầu tiên luôn có ít nhất một liền kề → 1 ✓. Đáp án PDF: "-1 2 3 -1 5"</p>
    `,
    testCases: [
      { input: '7\n1 2 3 -1 5 8 9', expectedOutput: '-1 2 3 -1 5' },
      { input: '3\n-1 1 -2', expectedOutput: '-1 1 -2', hidden: true },
      { input: '3\n1 2 3', expectedOutput: '2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_11',
    title: '11. Chữ số đầu tiên lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số đầu lẻ</h2>
      <p>Liệt kê các số có chữ số đầu tiên (hàng cao nhất) là lẻ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n17 88 23 14 90</td><td>17 23 14 90</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n17 88 23 14 90', expectedOutput: '17 23 14 90' },
      { input: '4\n24 46 68 80', expectedOutput: '', hidden: true },
      { input: '3\n13 57 91', expectedOutput: '13 57 91', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_12',
    title: '12. Toàn chữ số lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Toàn chữ số lẻ</h2>
      <p>Liệt kê các số trong mảng có toàn bộ chữ số là lẻ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các số cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 55 666 7 898 1 4</td><td>1 3 55 7 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 55 666 7 898 1 4', expectedOutput: '1 3 55 7 1' },
      { input: '5\n13 35 57 79 91', expectedOutput: '13 35 57 79 91', hidden: true },
      { input: '3\n24 68 80', expectedOutput: '', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_13',
    title: '13. Tổng số chính phương',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số chính phương</h2>
      <p>Tính tổng các số chính phương trong mảng các số nguyên không âm.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên không âm.</p>
      <h3>Output</h3>
      <p>Tổng các số chính phương.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n1 4 9 20 45 31</td><td>14</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n1 4 9 20 45 31', expectedOutput: '14' },
      { input: '5\n0 1 4 9 16', expectedOutput: '30', hidden: true },
      { input: '3\n2 3 5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_14',
    title: '14. Có 2 số nguyên liên tiếp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Có 2 số nguyên liên tiếp</h2>
      <p>Kiểm tra xem mảng có tồn tại 2 số nguyên liên tiếp (VD: a[i] và a[i+1] thỏa |a[i]-a[i+1]|=1) hay không.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n8 14 99 15 20</td><td>YES</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>14 và 15 là 2 số liên tiếp (|14-15|=1).</p>
    `,
    testCases: [
      { input: '5\n8 14 99 15 20', expectedOutput: 'YES' },
      { input: '4\n1 3 5 7', expectedOutput: 'NO', hidden: true },
      { input: '3\n1 2 3', expectedOutput: 'YES', hidden: true },
      { input: '2\n1 2', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_15',
    title: '15. Mảng tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mảng tăng dần</h2>
      <p>Kiểm tra mảng có tăng dần nghiêm ngặt (a[i] < a[i+1] với mọi i) hay không.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>9\n1 2 3 4 5 6 7 9</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '9\n1 2 3 4 5 6 7 9', expectedOutput: 'NO' },
      { input: '5\n1 2 3 4 5', expectedOutput: 'YES', hidden: true },
      { input: '3\n1 1 2', expectedOutput: 'NO', hidden: true },
      { input: '2\n1 2', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_16',
    title: '16. Mảng không tăng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mảng không tăng</h2>
      <p>Kiểm tra mảng có không tăng (a[i] >= a[i+1] với mọi i) hay không.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n7 6 5 5 3 3 1</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n7 6 5 5 3 3 1', expectedOutput: 'YES' },
      { input: '5\n5 4 3 2 1', expectedOutput: 'YES', hidden: true },
      { input: '5\n5 4 3 4 2', expectedOutput: 'NO', hidden: true },
      { input: '2\n1 2', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_17',
    title: '17. Đếm số nguyên tố trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số nguyên tố</h2>
      <p>Đếm số lượng số nguyên tố trong mảng các số nguyên.</p>
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
      { input: '5\n2 3 5 7 11', expectedOutput: '5', hidden: true },
      { input: '3\n1 4 6', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_18',
    title: '18. Đếm số có ước lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số có ước lẻ</h2>
      <p>Đếm số phần tử trong mảng có số lượng ước số là số lẻ (số chính phương).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng phần tử có ước lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 25</td><td>4</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1(1 ước), 2(2 ước), 3(2 ước), 4(3 ước), 5(2 ước), 6(4 ước), 7(2 ước), 8(4 ước), 9(3 ước), 25(3 ước). Số có ước lẻ: 1, 4, 9, 25 → 4.</p>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 25', expectedOutput: '4' },
      { input: '4\n1 4 9 16', expectedOutput: '4', hidden: true },
      { input: '3\n2 3 5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_19',
    title: '19. Không nhỏ hơn các số trước',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Không nhỏ hơn các số trước</h2>
      <p>Liệt kê số phần tử không nhỏ hơn mọi phần tử đứng trước nó (a[i] >= max(a[0..i])). Đếm và in ra.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Số lượng phần tử thỏa mãn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n3 5 6 8 4 2 9</td><td>5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>3(≥none ✓), 5(≥3 ✓), 6(≥5 ✓), 8(≥6 ✓), 4(<8 ✗), 2(<8 ✗), 9(≥8 ✓) → 5.</p>
    `,
    testCases: [
      { input: '7\n3 5 6 8 4 2 9', expectedOutput: '5' },
      { input: '5\n1 2 3 4 5', expectedOutput: '5', hidden: true },
      { input: '4\n5 4 3 2', expectedOutput: '1', hidden: true },
      { input: '3\n1 3 2', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_20',
    title: '20. Tần suất xuất hiện',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tần suất xuất hiện</h2>
      <p>Với mỗi số trong mảng (theo thứ tự xuất hiện đầu tiên), in số và số lần xuất hiện. Mỗi số chỉ in một lần.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: "số xuất hiện count lần" (mỗi số xuất hiện đầu tiên được in).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 7 2 8 3 3 2 1 3 2</td><td>1 xuat hien 2 lan\n7 xuat hien 1 lan\n2 xuat hien 3 lan\n8 xuat hien 1 lan\n3 xuat hien 3 lan</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 7 2 8 3 3 2 1 3 2', expectedOutput: '1 xuat hien 2 lan\n7 xuat hien 1 lan\n2 xuat hien 3 lan\n8 xuat hien 1 lan\n3 xuat hien 3 lan' },
      { input: '5\n1 1 1 1 1', expectedOutput: '1 xuat hien 5 lan', hidden: true },
      { input: '3\n1 2 3', expectedOutput: '1 xuat hien 1 lan\n2 xuat hien 1 lan\n3 xuat hien 1 lan', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b12_21',
    title: '21. Nguyên tố và tần suất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nguyên tố và tần suất</h2>
      <p>Với mỗi số nguyên tố trong mảng (theo thứ tự xuất hiện đầu tiên), in số và số lần xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: "số xuất hiện count lần". Các số được sắp xếp tăng dần theo giá trị.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 4 5 6 7 8 9 10</td><td>2 xuat hien 1 lan\n3 xuat hien 1 lan\n5 xuat hien 1 lan\n7 xuat hien 1 lan</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 4 5 6 7 8 9 10', expectedOutput: '2 xuat hien 1 lan\n3 xuat hien 1 lan\n5 xuat hien 1 lan\n7 xuat hien 1 lan' },
      { input: '5\n1 2 2 3 3', expectedOutput: '2 xuat hien 2 lan\n3 xuat hien 2 lan', hidden: true },
      { input: '3\n1 4 6', expectedOutput: '', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
