// Buổi 16: ÔN TẬP MẢNG (STRING VÀ ARRAY NÂNG CAO)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi16_lessons: Lesson[] = [
  {
    id: 'ch28_b16_01',
    title: '1. Max, min và tổng chẵn/lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max, min, đếm chẵn/lẻ</h2>
      <p>Cho mảng n phần tử. Thực hiện: (a) tìm max và min; (b) đếm số chẵn và số lẻ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và min. Dòng 2: số chẵn và số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n-2 10 2 9 3</td><td>10 -2\n3 2</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n-2 10 2 9 3', expectedOutput: '10 -2\n3 2' },
      { input: '4\n1 3 5 7', expectedOutput: '7 1\n0 4', hidden: true },
      { input: '3\n-5 -2 -10', expectedOutput: '-2 -10\n2 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_02',
    title: '2. Liệt kê số nguyên tố trong mảng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố trong mảng</h2>
      <p>Liệt kê các số nguyên tố trong mảng theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các số nguyên tố cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 10 2 9 3</td><td>2 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 10 2 9 3', expectedOutput: '2 2 3' },
      { input: '4\n1 4 6 8', expectedOutput: '0', hidden: true },
      { input: '5\n2 3 5 7 11', expectedOutput: '2 3 5 7 11', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_03',
    title: '3. Vị trí min và max (lần đầu và cuối)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vị trí min và max</h2>
      <p>Tìm vị trí (0-indexed) của số nhỏ nhất (lần đầu) và số lớn nhất (lần cuối) trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: vị trí min (đầu tiên). Dòng 2: vị trí max (cuối cùng).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 10 2 9 3</td><td>0\n1</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 10 2 9 3', expectedOutput: '0\n1' },
      { input: '5\n1 2 3 4 5', expectedOutput: '0\n4', hidden: true },
      { input: '3\n5 3 5', expectedOutput: '1\n2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_04',
    title: '4. Max thứ 2 và min thứ 2 (có thể trùng)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max thứ 2 và min thứ 2</h2>
      <p>Tìm max, max thứ 2 và min, min thứ 2 (các giá trị có thể bằng nhau).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và max thứ 2. Dòng 2: min và min thứ 2.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 10 2 9 10</td><td>10 10\n2 2</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 10 2 9 10', expectedOutput: '10 10\n2 2' },
      { input: '4\n5 5 5 5', expectedOutput: '5 5\n5 5', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '30 20\n10 20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_05',
    title: '5. Max thứ 2 và min thứ 2 (giá trị khác nhau)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Max thứ 2 và min thứ 2 (khác nhau)</h2>
      <p>Tìm max và max thứ 2 (giá trị khác nhau). Nếu không có, in -1. Tương tự cho min.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: max và max thứ 2. Dòng 2: min và min thứ 2.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n5 2 10 2 9</td><td>10 9\n2 5</td></tr>
        <tr><td>5\n99999</td><td>9 -1\n9 -1</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n5 2 10 2 9', expectedOutput: '10 9\n2 5' },
      { input: '5\n9 9 9 9 9', expectedOutput: '9 -1\n9 -1', hidden: true },
      { input: '3\n10 20 30', expectedOutput: '30 20\n10 20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_06',
    title: '6. Đếm số toàn chữ số lẻ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Số toàn chữ số lẻ</h2>
      <p>Liệt kê các số trong mảng mà tất cả chữ số đều là lẻ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Các số toàn chữ số lẻ cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n3 5 7 11 23</td><td>3 5 7 11 23</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n3 5 7 11 23', expectedOutput: '3 5 7 11 23' },
      { input: '4\n2 4 6 8', expectedOutput: '0', hidden: true },
      { input: '5\n13 57 99 24 79', expectedOutput: '13 57 99 79', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_07',
    title: '7. Số đẹp (chứa cả 1 và 9)',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Liệt kê các số trong mảng có chứa cả chữ số 1 và chữ số 9. Nếu không có in -1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n3 5 7 11 91900</td><td>91900</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n3 5 7 11 91900', expectedOutput: '91900' },
      { input: '4\n12 29 39 91', expectedOutput: '12 29 39 91', hidden: true },
      { input: '3\n100 200 300', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_08',
    title: '8. Kiểm tra mảng đối xứng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra mảng đối xứng</h2>
      <p>Kiểm tra xem mảng có đối xứng hay không. In YES hoặc NO.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>YES hoặc NO.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n1 2 3 4 3 2 1</td><td>YES</td></tr>
        <tr><td>5\n1 2 3 4 5</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n1 2 3 4 3 2 1', expectedOutput: 'YES' },
      { input: '5\n1 2 3 4 5', expectedOutput: 'NO', hidden: true },
      { input: '4\n1 2 2 1', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_09',
    title: '9. Kiểm tra mảng tăng dần',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra mảng tăng dần</h2>
      <p>Kiểm tra xem mảng có tăng dần không (phần tử đứng sau lớn hơn đứng trước). In YES hoặc NO.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>YES hoặc NO.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 2 3 5</td><td>NO</td></tr>
        <tr><td>5\n1 2 3 4 5</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 2 3 5', expectedOutput: 'NO' },
      { input: '5\n1 2 3 4 5', expectedOutput: 'YES', hidden: true },
      { input: '3\n5 4 3', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_10',
    title: '10. Lineland',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Lineland</h2>
      <p>Có n thành phố tại vị trí xi (đã sắp xếp tăng dần). Với mỗi thành phố, tính chi phí gửi thư tối thiểu (đến thành phố gần nhất khác) và tối đa (đến thành phố xa nhất).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên xi (đã sắp xếp tăng dần).</p>
      <h3>Output</h3>
      <p>n dòng, mỗi dòng: min_i max_i.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\n-5 -2 2 7</td><td>3 12\n3 9\n4 7\n5 12</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n-5 -2 2 7', expectedOutput: '3 12\n3 9\n4 7\n5 12' },
      { input: '2\n0 10', expectedOutput: '10 10\n10 10', hidden: true },
      { input: '3\n-5 0 5', expectedOutput: '5 10\n5 10\n5 10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_11',
    title: '11. Vé xem phim (Die Hard)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Vé xem phim</h2>
      <p>Mỗi người có tiền 25, 50 hoặc 100. Vé giá 25. Kiểm tra xem có thể đổi tiền cho tất cả không, ban đầu không có tiền.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số (25, 50 hoặc 100).</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n25 25 50 50 25 25 50 25</td><td>YES</td></tr>
        <tr><td>3\n50 100 50</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '8\n25 25 50 50 25 25 50 25', expectedOutput: 'YES' },
      { input: '3\n50 100 50', expectedOutput: 'NO', hidden: true },
      { input: '4\n25 50 100 25', expectedOutput: 'YES', hidden: true },
      { input: '1\n100', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_12',
    title: '12. Đếm cặp nguyên tố cùng nhau',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Cặp nguyên tố cùng nhau</h2>
      <p>Đếm số cặp (i, j) với i < j sao cho GCD(arr[i], arr[j]) = 1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên dương.</p>
      <h3>Output</h3>
      <p>Số cặp nguyên tố cùng nhau.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 4 8 3 6</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 4 8 3 6', expectedOutput: '3' },
      { input: '3\n2 3 5', expectedOutput: '3', hidden: true },
      { input: '4\n2 4 6 8', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_13',
    title: '13. Tích lớn nhất của 2 số trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tích lớn nhất của 2 số</h2>
      <p>Tìm tích lớn nhất của 2 phần tử bất kỳ trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tích lớn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n2 4 8 3 6</td><td>48</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 4 8 3 6', expectedOutput: '48' },
      { input: '3\n-5 -2 -10', expectedOutput: '20', hidden: true },
      { input: '3\n-5 2 10', expectedOutput: '20', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_14',
    title: '14. Dãy con liên tiếp dài nhất với phần tử khác nhau',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Dãy con liên tiếp dài nhất</h2>
      <p>Tìm độ dài dãy con liên tiếp có các phần tử kề nhau đều khác nhau và dài nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Độ dài dài nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 3 3 4 5 2 1 -3</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 3 3 4 5 2 1 -3', expectedOutput: '6' },
      { input: '5\n1 2 3 4 5', expectedOutput: '5', hidden: true },
      { input: '6\n1 1 1 1 1 1', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_15',
    title: '15. Kadane - Tổng dãy con lớn nhất',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Kadane Algorithm</h2>
      <p>Tìm tổng lớn nhất của một dãy con liên tiếp trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng lớn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 -9 3 5</td><td>8</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 -9 3 5', expectedOutput: '8' },
      { input: '4\n-1 -2 -3 -4', expectedOutput: '-1', hidden: true },
      { input: '3\n1 2 3', expectedOutput: '6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_16',
    title: '16. Sliding Window - Tổng lớn nhất k phần tử liên tiếp',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Sliding Window</h2>
      <p>Tìm dãy con có k phần tử liên tiếp có tổng lớn nhất. Nếu có nhiều dãy cùng tổng, in dãy xuất hiện cuối cùng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n k. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: tổng lớn nhất. Dòng 2: các phần tử của dãy con đó.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 3\n1 2 4 4 8 1 3 3 9 4</td><td>16\n3 9 4</td></tr>
      </table>
    `,
    testCases: [
      { input: '10 3\n1 2 4 4 8 1 3 3 9 4', expectedOutput: '16\n3 9 4' },
      { input: '5 2\n1 2 3 4 5', expectedOutput: '9\n4 5', hidden: true },
      { input: '4 2\n-1 -2 -3 -4', expectedOutput: '-3\n-4 -3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_17',
    title: '17. Phần tử lặp đầu tiên',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phần tử lặp đầu tiên</h2>
      <p>Tìm phần tử xuất hiện lần thứ 2 đầu tiên trong mảng. Nếu không có in -1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Phần tử lặp đầu tiên.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n1 2 3 2 4</td><td>2</td></tr>
        <tr><td>4\n1 2 3 4</td><td>-1</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 3 2 4', expectedOutput: '2' },
      { input: '4\n1 2 3 4', expectedOutput: '-1', hidden: true },
      { input: '6\n1 2 2 3 3 4', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_18',
    title: '18. Sửa đèn đường',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Sửa đèn đường</h2>
      <p>Có N đèn đường, B đèn bị hỏng tại các vị trí cho trước. Cần sửa ít nhất bao nhiêu đèn để có ít nhất K đèn liên tiếp hoạt động.</p>
      <h3>Input</h3>
      <p>Dòng 1: N K B. B dòng tiếp theo: vị trí đèn hỏng.</p>
      <h3>Output</h3>
      <p>Số đèn ít nhất cần sửa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 6 5\n2\n10\n1\n5\n9</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '10 6 5\n2\n10\n1\n5\n9', expectedOutput: '1' },
      { input: '5 3 2\n1\n3\n5', expectedOutput: '1', hidden: true },
      { input: '8 4 3\n2\n4\n6', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_19',
    title: '19. Trộn 2 dãy đã sắp xếp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Trộn 2 dãy đã sắp xếp</h2>
      <p>Cho 2 dãy đã sắp xếp tăng dần. Trộn thành một dãy tăng dần.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. Dòng 2: n số nguyên. Dòng 3: m số nguyên.</p>
      <h3>Output</h3>
      <p>Dãy đã trộn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4 5\n1 1 2 2 3\n1 2 3 5 9</td><td>1 1 1 2 2 2 3 3 5 9</td></tr>
      </table>
    `,
    testCases: [
      { input: '4 5\n1 1 2 2 3\n1 2 3 5 9', expectedOutput: '1 1 1 2 2 2 3 3 5 9' },
      { input: '2 2\n1 3\n2 4', expectedOutput: '1 2 3 4', hidden: true },
      { input: '3 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3 4 5 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_20',
    title: '20. Hợp và giao của 2 mảng đã sắp xếp',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Hợp và giao của 2 mảng</h2>
      <p>Cho 2 mảng đã sắp xếp tăng dần (phần tử đôi một khác nhau trong mỗi mảng). Tìm hợp và giao.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. Dòng 2: n số. Dòng 3: m số.</p>
      <h3>Output</h3>
      <p>Dòng 1: hợp. Dòng 2: giao.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 5\n1 2 3\n1 2 3 5 9</td><td>1 2 3 5 9\n1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 5\n1 2 3\n1 2 3 5 9', expectedOutput: '1 2 3 5 9\n1 2 3' },
      { input: '2 2\n1 3\n2 4', expectedOutput: '1 2 3 4\n0', hidden: true },
      { input: '3 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3 4 5 6\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_21',
    title: '21. Tần suất lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tần suất lớn nhất</h2>
      <p>Tìm số có số lần xuất hiện nhiều nhất. Nếu có nhiều số cùng tần suất, lấy số nhỏ hơn.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: số. Dòng 2: số lần xuất hiện.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 3 3 3 9 9 9 9</td><td>3\n4</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 3 3 3 9 9 9 9', expectedOutput: '3\n4' },
      { input: '5\n1 2 3 4 5', expectedOutput: '1\n1', hidden: true },
      { input: '6\n2 2 3 3 1 1', expectedOutput: '1\n2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_22',
    title: '22. Sắp xếp chẵn lẻ 2',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp chẵn lẻ 2</h2>
      <p>Đưa tất cả số chẵn về đầu (sắp xếp tăng dần), số lẻ về cuối (sắp xếp tăng dần), giữ nguyên vị trí tương đối giữa chẵn và lẻ.</p>
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
    id: 'ch28_b16_23',
    title: '23. Đổi tiền (Tham lam)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đổi tiền</h2>
      <p>Đếm số tờ tiền cần dùng để đổi N đồng với các loại tiền có sẵn: 1, 2, 5, 10, 20, 50, 100. Dùng thuật toán tham lam.</p>
      <h3>Input</h3>
      <p>Dòng 1: N (số tiền cần đổi).</p>
      <h3>Output</h3>
      <p>Số tờ tiền tối thiểu.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>125</td><td>3</td></tr>
        <tr><td>43</td><td>4</td></tr>
      </table>
    `,
    testCases: [
      { input: '125', expectedOutput: '3' },
      { input: '43', expectedOutput: '4', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '99', expectedOutput: '6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b16_24',
    title: '24. Liệt kê dãy tăng dài nhất',
    duration: '20 phút',
    type: 'practice',
    content: `
      <h2>Dãy tăng liên tiếp dài nhất</h2>
      <p>Tìm dãy con liên tiếp có các phần tử tăng dần và dài nhất. In ra độ dài và dãy đó. Nếu có nhiều, in dãy cuối cùng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Dòng 1: độ dài. Dòng 2: các phần tử của dãy.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 3 3 3 4 5 2 1 -3</td><td>4\n2 3 4 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 3 3 3 4 5 2 1 -3', expectedOutput: '4\n2 3 4 5' },
      { input: '5\n5 4 3 2 1', expectedOutput: '1\n5', hidden: true },
      { input: '6\n1 2 3 4 5 6', expectedOutput: '6\n1 2 3 4 5 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
