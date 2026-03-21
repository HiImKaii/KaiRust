// Buổi 9: ÔN TẬP SỐ HỌC

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi9_lessons: Lesson[] = [
  {
    id: 'ch28_b9_01',
    title: '1. Số thuận nghịch',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số thuận nghịch</h2>
      <p>Kiểm tra số thuận nghịch (đọc xuôi và ngược giống nhau).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu n thuận nghịch, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10019</td><td>NO</td></tr>
        <tr><td>9999999999999999</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '10019', expectedOutput: 'NO' },
      { input: '9999999999999999', expectedOutput: 'YES' },
      { input: '1', expectedOutput: 'YES', hidden: true },
      { input: '12321', expectedOutput: 'YES', hidden: true },
      { input: '12345', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_02',
    title: '2. Số chính phương',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số chính phương</h2>
      <p>Kiểm tra xem n có phải là số chính phương không (là bình phương của một số nguyên).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu n là số chính phương, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>24</td><td>NO</td></tr>
        <tr><td>10000000000000000</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '24', expectedOutput: 'NO' },
      { input: '10000000000000000', expectedOutput: 'YES' },
      { input: '1', expectedOutput: 'YES', hidden: true },
      { input: '16', expectedOutput: 'YES', hidden: true },
      { input: '18', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_03',
    title: '3. Số chính phương trong đoạn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số chính phương trong đoạn</h2>
      <p>In ra các số chính phương trong đoạn từ a đến b.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (1 ≤ a ≤ b ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số chính phương trong đoạn, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 50</td><td>1 4 9 16 25 36 49</td></tr>
        <tr><td>10 20</td><td>16</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 50', expectedOutput: '1 4 9 16 25 36 49' },
      { input: '10 20', expectedOutput: '16' },
      { input: '50 50', expectedOutput: '', hidden: true },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '20 30', expectedOutput: '25', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_04',
    title: '4. Đếm số chính phương trong đoạn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số chính phương trong đoạn</h2>
      <p>Đếm số lượng số chính phương trong đoạn từ a đến b.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (1 ≤ a ≤ b ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Số lượng số chính phương trong đoạn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 50</td><td>7</td></tr>
        <tr><td>10 20</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 50', expectedOutput: '7' },
      { input: '10 20', expectedOutput: '1' },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '2 3', expectedOutput: '0', hidden: true },
      { input: '100 200', expectedOutput: '4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_05',
    title: '5. Tổng ước',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng ước</h2>
      <p>Tính tổng tất cả các ước số dương của n (không tính chính n).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng các ước số của n.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>18</td></tr>
        <tr><td>28</td><td>56</td></tr>
      </table>
    `,
    testCases: [
      { input: '10', expectedOutput: '18' },
      { input: '28', expectedOutput: '56' },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '6', expectedOutput: '6', hidden: true },
      { input: '100', expectedOutput: '217', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_06',
    title: '6. Đếm số ước',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số ước</h2>
      <p>Đếm số lượng ước số dương của n (bao gồm 1 và n).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng ước số của n.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>4</td></tr>
        <tr><td>28</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '10', expectedOutput: '4' },
      { input: '28', expectedOutput: '6' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '9', hidden: true },
      { input: '60', expectedOutput: '12', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_07',
    title: '7. Số có ước lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số có ước lẻ</h2>
      <p>Kiểm tra xem n có số lượng ước số là số lẻ không. (Đúng khi và chỉ khi n là số chính phương.)</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu n có số lượng ước lẻ, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10000000000000000</td><td>YES</td></tr>
        <tr><td>6</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '10000000000000000', expectedOutput: 'YES' },
      { input: '6', expectedOutput: 'NO' },
      { input: '1', expectedOutput: 'YES', hidden: true },
      { input: '16', expectedOutput: 'YES', hidden: true },
      { input: '12', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_08',
    title: '8. Số hoàn hảo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số hoàn hảo</h2>
      <p>Kiểm tra n có phải là số hoàn hảo không (tổng ước thực sự = chính nó).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu n là số hoàn hảo, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>28</td><td>YES</td></tr>
        <tr><td>2305843008139952128</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '28', expectedOutput: 'YES' },
      { input: '2305843008139952128', expectedOutput: 'YES' },
      { input: '6', expectedOutput: 'YES', hidden: true },
      { input: '496', expectedOutput: 'YES', hidden: true },
      { input: '12', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_09',
    title: '9. Tổng chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng chữ số</h2>
      <p>Tính tổng các chữ số của n.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Tổng các chữ số của n.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10000000000000000</td><td>1</td></tr>
        <tr><td>124</td><td>7</td></tr>
      </table>
    `,
    testCases: [
      { input: '10000000000000000', expectedOutput: '1' },
      { input: '124', expectedOutput: '7' },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '999', expectedOutput: '27', hidden: true },
      { input: '100', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_10',
    title: '10. Số tăng giảm nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số tăng giảm nguyên tố</h2>
      <p>Đếm số nguyên tố có n chữ số sao cho các chữ số tăng dần hoặc giảm dần nghiêm ngặt từ trái qua phải.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 6)</p>
      <h3>Output</h3>
      <p>Số lượng số nguyên tố có n chữ số thỏa mãn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>20</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Với n=2: các số nguyên tố tăng dần: 13, 17, 19, 23, 29, 37, 47, 59, 67, 89 (10 số). Các số giảm dần: 31, 41, 43, 53, 61, 71, 73, 83, 97 (9 số). Tổng = 20 (31, 53, 71, 79 xuất hiện trong cả 2 dạng nên chỉ đếm 1 lần).</p>
    `,
    testCases: [
      { input: '2', expectedOutput: '20' },
      { input: '1', expectedOutput: '4', hidden: true },
      { input: '3', expectedOutput: '26', hidden: true },
      { input: '4', expectedOutput: '37', hidden: true },
      { input: '5', expectedOutput: '35', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_11',
    title: '11. Dãy Fibonacci',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Dãy Fibonacci</h2>
      <p>In n số Fibonacci đầu tiên (F0=0, F1=1).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (2 ≤ n ≤ 92)</p>
      <h3>Output</h3>
      <p>n số Fibonacci đầu tiên, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>0 1 1 2 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '0 1 1 2 3' },
      { input: '2', expectedOutput: '0 1', hidden: true },
      { input: '10', expectedOutput: '0 1 1 2 3 5 8 13 21 34', hidden: true },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '92', expectedOutput: '0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155 165580141 267914296 433494437 701408733 1134903170 1836311903 2971215073 4807526976 7778742049 12586269025 20365011074 32951280099 53316291173 86267571272 139583862445 225851433717 365435296162 591286729879 956722026041 1548008755920 2504730781961 4052739537881 6557470319842 10610209857723 17167680177565 27777890035288 44945570212853 72723460248141 117669030460994 190392490709135 308061521170129 498454011879264 806515533049393 1304969544928657 2111485077978050 3416454622906707 5527939700884757 8944394323791464 14472334024676221 23416728348467685 37889062373143906 61305790721611591 99194853094755497 160500643816367088 259695496911122585 420196140727489673', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_12',
    title: '12. Kiểm tra số Fibonacci',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số Fibonacci</h2>
      <p>Kiểm tra xem n có phải là số trong dãy Fibonacci không.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu n là số Fibonacci, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>YES</td></tr>
        <tr><td>4</td><td>NO</td></tr>
        <tr><td>420196140727489673</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: 'YES' },
      { input: '4', expectedOutput: 'NO' },
      { input: '420196140727489673', expectedOutput: 'YES' },
      { input: '1', expectedOutput: 'YES', hidden: true },
      { input: '3', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_13',
    title: '13. Số đẹp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Số đẹp là số nguyên tố có tổng chữ số nằm trong dãy Fibonacci. Liệt kê các số đẹp trong đoạn [a,b]. Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (1 ≤ a ≤ b ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các số đẹp trong đoạn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 50</td><td>2 3 5 11 17 23 41</td></tr>
        <tr><td>24 30</td><td>-1</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 50', expectedOutput: '2 3 5 11 17 23 41' },
      { input: '24 30', expectedOutput: '-1' },
      { input: '1 10', expectedOutput: '2 3 5 7', hidden: true },
      { input: '50 100', expectedOutput: '53 83 89 97', hidden: true },
      { input: '100 100', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_14',
    title: '14. Thuận nghịch có 3 ước nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Thuận nghịch có 3 ước nguyên tố</h2>
      <p>Liệt kê các số thuận nghịch trong [a,b] có ít nhất 3 ước số nguyên tố khác nhau. Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (1 ≤ a ≤ b ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các số thỏa mãn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 1000</td><td>66 222 252 282 414 434 444 474 494 525 555 585 595 606 616 636 646 666 696 777 828 858 868 888 969</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 1000', expectedOutput: '66 222 252 282 414 434 444 474 494 525 555 585 595 606 616 636 646 666 696 777 828 858 868 888 969' },
      { input: '1 100', expectedOutput: '66', hidden: true },
      { input: '1000 2000', expectedOutput: '1111 1221 1331 1441 1551 1661 1771 1881 1991', hidden: true },
      { input: '1 50', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_15',
    title: '15. Đếm chữ số chẵn lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số chẵn lẻ</h2>
      <p>Đếm số chữ số chẵn và số chữ số lẻ trong N (N có tối đa 9 chữ số).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương N</p>
      <h3>Output</h3>
      <p>Hai số: số chữ số chẵn và số chữ số lẻ, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12345678</td><td>4 4</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1 lẻ, 2 chẵn, 3 lẻ, 4 chẵn, 5 lẻ, 6 chẵn, 7 lẻ, 8 chẵn → 4 chẵn, 4 lẻ.</p>
    `,
    testCases: [
      { input: '12345678', expectedOutput: '4 4' },
      { input: '246810', expectedOutput: '5 1', hidden: true },
      { input: '13579', expectedOutput: '0 5', hidden: true },
      { input: '2222', expectedOutput: '4 0', hidden: true },
      { input: '1', expectedOutput: '0 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_16',
    title: '16. Số Strong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Strong</h2>
      <p>Liệt kê các số Strong (tổng giai thừa các chữ số = chính nó) trong đoạn [a,b]. Nếu không có in 0.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b</p>
      <h3>Output</h3>
      <p>Các số Strong, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 1000</td><td>1 2 145</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 1000', expectedOutput: '1 2 145' },
      { input: '1 20000', expectedOutput: '1 2 145', hidden: true },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '100 200', expectedOutput: '0', hidden: true },
      { input: '140 150', expectedOutput: '145', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_17',
    title: '17. Số Lộc phát',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Lộc phát</h2>
      <p>Số Lộc phát là số chỉ chứa các chữ số 0, 6, 8. Kiểm tra n có phải số Lộc phát không. Đúng in 1, sai in 0.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (có tối đa 9 chữ số)</p>
      <h3>Output</h3>
      <p>1 nếu n là số Lộc phát, 0 nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6808</td><td>1</td></tr>
        <tr><td>16808</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '6808', expectedOutput: '1' },
      { input: '16808', expectedOutput: '0' },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '6', expectedOutput: '1', hidden: true },
      { input: '8', expectedOutput: '1', hidden: true },
      { input: '123', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_18',
    title: '18. Thuận nghịch và Lộc phát',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Thuận nghịch và Lộc phát</h2>
      <p>Liệt kê các số thuận nghịch trong [a,b] có chứa ít nhất một chữ số 6 và tổng chữ số có chữ số cuối cùng là 8. Nếu không có in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b</p>
      <h3>Output</h3>
      <p>Các số thỏa mãn, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 500</td><td>161</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>161: thuận nghịch (161=161), chứa 6, tổng chữ số=8.</p>
    `,
    testCases: [
      { input: '1 500', expectedOutput: '161' },
      { input: '1 1000', expectedOutput: '161 666', hidden: true },
      { input: '1 100', expectedOutput: '-1', hidden: true },
      { input: '500 1000', expectedOutput: '616 666', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_19',
    title: '19. Giai thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Giai thừa</h2>
      <p>Tính n! (giai thừa của n).</p>
      <h3>Input</h3>
      <p>Một số tự nhiên n</p>
      <h3>Output</h3>
      <p>Giá trị của n!</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>3628800</td></tr>
      </table>
    `,
    testCases: [
      { input: '10', expectedOutput: '3628800' },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '120', hidden: true },
      { input: '20', expectedOutput: '2432902008176640000', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_20',
    title: '20. Số Armstrong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Armstrong</h2>
      <p>Kiểm tra n có phải là số Armstrong không (tổng lũy thừa bậc n (số chữ số) của các chữ số = chính nó).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>1 nếu là Armstrong, 0 nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>371</td><td>1</td></tr>
        <tr><td>24</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '371', expectedOutput: '1' },
      { input: '24', expectedOutput: '0' },
      { input: '153', expectedOutput: '1', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_21',
    title: '21. Thuận nghịch không chứa 9',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Thuận nghịch không chứa 9</h2>
      <p>Liệt kê các số thuận nghịch lớn hơn 1 và nhỏ hơn n, không chứa chữ số 9. Đếm có bao nhiêu số như vậy.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Dòng 1: các số, cách nhau khoảng trắng. Dòng 2: số lượng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100</td><td>2 3 4 5 6 7 8 11 22 33 44 55 66 77 88\n15</td></tr>
      </table>
    `,
    testCases: [
      { input: '100', expectedOutput: '2 3 4 5 6 7 8 11 22 33 44 55 66 77 88\n15' },
      { input: '12', expectedOutput: '2 3 4 5 6 7 8 11\n9', hidden: true },
      { input: '10', expectedOutput: '2 3 4 5 6 7 8 9\n8', hidden: true },
      { input: '1', expectedOutput: '\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_22',
    title: '22. Số nguyên tố có chữ số cuối lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nguyên tố có chữ số cuối lớn nhất</h2>
      <p>Liệt kê các số nguyên tố nhỏ hơn n có chữ số cuối lớn hơn chữ số cuối của mọi số nguyên tố nhỏ hơn nó. Đếm có bao nhiêu.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Dòng 1: các số, cách nhau khoảng trắng. Dòng 2: số lượng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>200</td><td>2 3 5 7 19\n5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Primes up to 200: 2(last=2), 3(last=3), 5(last=5), 7(last=7), 11(last=1<7), 13(last=3<7), ... 19(last=9>7). Next max last digit = 9.</p>
    `,
    testCases: [
      { input: '200', expectedOutput: '2 3 5 7 19\n5' },
      { input: '10', expectedOutput: '2 3 5 7\n4', hidden: true },
      { input: '50', expectedOutput: '2 3 5 7 19 29 37 47\n8', hidden: true },
      { input: '2', expectedOutput: '2\n1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_23',
    title: '23. Nguyên tố cùng nhau',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nguyên tố cùng nhau</h2>
      <p>Kiểm tra hai số a và b có nguyên tố cùng nhau không (GCD(a,b) = 1).</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (1 ≤ a,b ≤ 10^12)</p>
      <h3>Output</h3>
      <p>In "YES" nếu nguyên tố cùng nhau, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>20 17</td><td>YES</td></tr>
        <tr><td>14 15</td><td>YES</td></tr>
        <tr><td>8 128</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '20 17', expectedOutput: 'YES' },
      { input: '14 15', expectedOutput: 'YES' },
      { input: '8 128', expectedOutput: 'NO' },
      { input: '1 100', expectedOutput: 'YES', hidden: true },
      { input: '100 100', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_24',
    title: '24. Phi hàm Euler',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phi hàm Euler</h2>
      <p>Tính φ(n) - số lượng số nguyên trong đoạn [1,n] nguyên tố cùng nhau với n.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^16)</p>
      <h3>Output</h3>
      <p>Giá trị φ(n).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>9</td><td>6</td></tr>
        <tr><td>10000000000000000</td><td>4000000000000000</td></tr>
      </table>
    `,
    testCases: [
      { input: '9', expectedOutput: '6' },
      { input: '10000000000000000', expectedOutput: '4000000000000000' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '2', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_25',
    title: '25. Thừa số nguyên tố thứ k',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Thừa số nguyên tố thứ k</h2>
      <p>Đưa ra thừa số nguyên tố thứ k trong phân tích thừa số nguyên tố của n (theo thứ tự không giảm). Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số n, k (1 ≤ n,k ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Thừa số nguyên tố thứ k hoặc -1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>28 3</td><td>7</td></tr>
        <tr><td>85 3</td><td>-1</td></tr>
        <tr><td>60 3</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>28 = 2 × 2 × 7 → thừa số thứ 3 = 7. 85 = 5 × 17 → chỉ có 2 thừa số, k=3 không tồn tại.</p>
    `,
    testCases: [
      { input: '28 3', expectedOutput: '7' },
      { input: '85 3', expectedOutput: '-1' },
      { input: '60 3', expectedOutput: '3' },
      { input: '12 2', expectedOutput: '2', hidden: true },
      { input: '7 1', expectedOutput: '7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_26',
    title: '26. Chữ số nguyên tố (sắp xếp)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số nguyên tố (sắp xếp)</h2>
      <p>Liệt kê số lần xuất hiện của các chữ số nguyên tố (2,3,5,7) trong n theo thứ tự từ nhỏ đến lớn.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Mỗi dòng: chữ số nguyên tố và số lần xuất hiện (VD: "2 6" nghĩa là chữ số 2 xuất hiện 6 lần).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>722334123232277</td><td>2 6\n3 4\n7 3</td></tr>
      </table>
    `,
    testCases: [
      { input: '722334123232277', expectedOutput: '2 6\n3 4\n7 3' },
      { input: '123', expectedOutput: '2 1\n3 1', hidden: true },
      { input: '555', expectedOutput: '5 3', hidden: true },
      { input: '2468', expectedOutput: '2 1', hidden: true },
      { input: '777', expectedOutput: '7 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_27',
    title: '27. Chữ số nguyên tố (thứ tự xuất hiện)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số nguyên tố (thứ tự xuất hiện)</h2>
      <p>Liệt kê số lần xuất hiện của các chữ số nguyên tố (2,3,5,7) trong n theo thứ tự xuất hiện trong số.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Mỗi dòng: chữ số nguyên tố và số lần xuất hiện, theo thứ tự xuất hiện trong n.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>722334123232277</td><td>7 3\n2 6\n3 4</td></tr>
      </table>
    `,
    testCases: [
      { input: '722334123232277', expectedOutput: '7 3\n2 6\n3 4' },
      { input: '2357', expectedOutput: '2 1\n3 1\n5 1\n7 1', hidden: true },
      { input: '222', expectedOutput: '2 3', hidden: true },
      { input: '123', expectedOutput: '2 1\n3 1', hidden: true },
      { input: '567', expectedOutput: '5 1\n7 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_28',
    title: '28. Số nhỏ nhất có n chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nhỏ nhất có n chữ số</h2>
      <p>Tìm số nguyên dương nhỏ nhất có n chữ số chia hết cho cả x, y, z. Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa x, y, z, n (1 ≤ x,y,z ≤ 10^4, n ≤ 16)</p>
      <h3>Output</h3>
      <p>Số nhỏ nhất hoặc -1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 3 5 4</td><td>1020</td></tr>
        <tr><td>3 5 7 2</td><td>-1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>BCNN(2,3,5)=30. Số nhỏ nhất có 4 chữ số chia hết cho 30 là 1020.</p>
    `,
    testCases: [
      { input: '2 3 5 4', expectedOutput: '1020' },
      { input: '3 5 7 2', expectedOutput: '-1' },
      { input: '1 1 1 1', expectedOutput: '1', hidden: true },
      { input: '2 4 6 3', expectedOutput: '108', hidden: true },
      { input: '10 20 30 3', expectedOutput: '120', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_29',
    title: '29. Tam giác Pascal',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác Pascal</h2>
      <p>In tam giác Pascal với chiều cao n.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10)</p>
      <h3>Output</h3>
      <p>Tam giác Pascal, mỗi dòng có n số cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '3', expectedOutput: '1\n1 1\n1 2 1', hidden: true },
      { input: '10', expectedOutput: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n1 6 15 20 15 6 1\n1 7 21 35 35 21 7 1\n1 8 28 56 70 56 28 8 1\n1 9 36 84 126 126 84 36 9 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_30',
    title: '30. UCLN và BCNN',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>UCLN và BCNN</h2>
      <p>Tìm ước chung lớn nhất và bội chung nhỏ nhất của a và b.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (0 ≤ a,b ≤ 10^9)</p>
      <h3>Output</h3>
      <p>UCLN và BCNN, cách nhau bởi khoảng trắng. Nếu a=0 hoặc b=0 thì BCNN=0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100 20</td><td>20 100</td></tr>
        <tr><td>17 29</td><td>1 493</td></tr>
      </table>
    `,
    testCases: [
      { input: '100 20', expectedOutput: '20 100' },
      { input: '17 29', expectedOutput: '1 493' },
      { input: '0 5', expectedOutput: '5 0', hidden: true },
      { input: '0 0', expectedOutput: '0 0', hidden: true },
      { input: '12 18', expectedOutput: '6 36', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_31',
    title: '31. Phi hàm Euler cho nhiều n',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phi hàm Euler cho nhiều n</h2>
      <p>Với mỗi test case, in φ(i) cho 1 ≤ i ≤ n trên một dòng duy nhất (liền nhau không có khoảng trắng).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Một dòng chứa φ(1)φ(2)...φ(n) liền nhau.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>1122426464</td></tr>
      </table>
    `,
    testCases: [
      { input: '10', expectedOutput: '1122426464' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '11224', hidden: true },
      { input: '15', expectedOutput: '1122426464648', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_32',
    title: '32. Lũy thừa nhị phân',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Lũy thừa nhị phân</h2>
      <p>Tính a^b (a mũ b), với a,b không âm.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a, b (0 ≤ a,b ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Giá trị a^b.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 10</td><td>1024</td></tr>
        <tr><td>3 3</td><td>27</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 10', expectedOutput: '1024' },
      { input: '3 3', expectedOutput: '27' },
      { input: '0 0', expectedOutput: '1', hidden: true },
      { input: '10 0', expectedOutput: '1', hidden: true },
      { input: '2 0', expectedOutput: '1', hidden: true },
      { input: '5 3', expectedOutput: '125', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b9_33',
    title: '33. Đếm ước của n!',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm ước của n!</h2>
      <p>Đếm số lượng ước số dương của n! (giai thừa của n).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 100)</p>
      <h3>Output</h3>
      <p>Số lượng ước của n!.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>540</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>10! = 3628800 có 540 ước. Với mỗi số nguyên tố p ≤ n, số mũ trong n! = floor(n/p) + floor(n/p^2) + floor(n/p^3) + ... Số ước = tích của (e_i + 1).</p>
    `,
    testCases: [
      { input: '10', expectedOutput: '540' },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '36', hidden: true },
      { input: '3', expectedOutput: '4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
