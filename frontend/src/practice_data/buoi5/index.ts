// Buổi 5: ÔN TẬP - SỐ ĐẶC BIỆT VÀ XỬ LÝ CHUỖI

import { Lesson } from '../../courses';

const DEFAULT_CODE = `use std::io;

fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi5_lessons: Lesson[] = [
  {
    id: 'ch28_b5_01',
    title: '1. Kiểm tra số Strong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số Strong</h2>
      <p>Số Strong là số có tổng giai thừa các chữ số bằng chính nó. Ví dụ: 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145.</p>
      <p>Nhập số nguyên n, kiểm tra xem n có phải số Strong hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>1 nếu là số Strong, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>145</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '145', expectedOutput: '1' },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '2', expectedOutput: '0', hidden: true },
      { input: '40585', expectedOutput: '1', hidden: true },
      { input: '40584', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_02',
    title: '2. Chữ số đầu tiên và cuối cùng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số đầu tiên và cuối cùng</h2>
      <p>Nhập một số nguyên n bất kỳ, tìm và in ra chữ số đầu tiên và chữ số cuối cùng của n ghép liền nhau.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Chữ số đầu tiên và chữ số cuối cùng, viết liền nhau (không có khoảng trắng)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>14</td></tr>
      </table>
    `,
    testCases: [
      { input: '1234', expectedOutput: '14' },
      { input: '5', expectedOutput: '55', hidden: true },
      { input: '100', expectedOutput: '10', hidden: true },
      { input: '999', expectedOutput: '99', hidden: true },
      { input: '0', expectedOutput: '00', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_03',
    title: '3. Tổng chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng chữ số</h2>
      <p>Nhập một số nguyên n, tính tổng các chữ số của n và in ra.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng các chữ số của n</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>10</td></tr>
      </table>
    `,
    testCases: [
      { input: '1234', expectedOutput: '10' },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '9999', expectedOutput: '36', hidden: true },
      { input: '1000000', expectedOutput: '1', hidden: true },
      { input: '999999999', expectedOutput: '81', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_04',
    title: '4. Kiểm tra số nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số nguyên tố</h2>
      <p>Nhập một số nguyên n, kiểm tra xem n có phải là số nguyên tố hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>1 nếu là số nguyên tố, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>11</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '11', expectedOutput: '1' },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '2', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '0', hidden: true },
      { input: '999983', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_05',
    title: '5. Tính giai thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tính giai thừa</h2>
      <p>Nhập một số tự nhiên n, tính và in ra n! (n giai thừa). Với n = 0 thì 0! = 1.</p>
      <h3>Input</h3>
      <p>Một số tự nhiên n (0 ≤ n ≤ 20)</p>
      <h3>Output</h3>
      <p>n!</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>120</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '3628800', hidden: true },
      { input: '20', expectedOutput: '2432902008176640000', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_06',
    title: '6. Liệt kê số hoàn hảo nhỏ hơn n',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số hoàn hảo nhỏ hơn n</h2>
      <p>Nhập số nguyên n, liệt kê các số hoàn hảo nhỏ hơn n (các số cách nhau một khoảng trắng). Nếu không có, in 0.</p>
      <p><em>Số hoàn hảo là số có tổng các ước số nhỏ hơn nó bằng chính nó. Ví dụ: 6 = 1 + 2 + 3.</em></p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số hoàn hảo cách nhau một khoảng trắng, hoặc 0</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1000</td><td>6 28 496</td></tr>
      </table>
    `,
    testCases: [
      { input: '1000', expectedOutput: '6 28 496' },
      { input: '6', expectedOutput: '0', hidden: true },
      { input: '30', expectedOutput: '6 28', hidden: true },
      { input: '10000', expectedOutput: '6 28 496 8128', hidden: true },
      { input: '5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_07',
    title: '7. Đổi chữ số đầu và cuối',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đổi chữ số đầu và cuối</h2>
      <p>Nhập một số nguyên n, đổi vị trí chữ số đầu tiên và chữ số cuối cùng.</p>
      <p><strong>Lưu ý:</strong> Nếu chữ số cuối cùng là 0, thì sau khi đổi chỗ, các số 0 ở đầu (sau khi đổi) sẽ bị loại bỏ. Ví dụ: 9800 → đổi đầu '9' và cuối '0' → "0" + "800" → loại 0 đầu → 800.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số sau khi đổi chữ số đầu và cuối</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>4231</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1234 → đổi 1 và 4 → 4231</p>
    `,
    testCases: [
      { input: '1234', expectedOutput: '4231' },
      { input: '9800', expectedOutput: '800', hidden: true },
      { input: '5', expectedOutput: '5', hidden: true },
      { input: '1000', expectedOutput: '0', hidden: true },
      { input: '12345', expectedOutput: '52341', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_08',
    title: '8. Đếm chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số</h2>
      <p>Nhập một số nguyên n, đếm số lượng chữ số của n và in ra.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số chữ số của n</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>4</td></tr>
      </table>
    `,
    testCases: [
      { input: '1234', expectedOutput: '4' },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '9', expectedOutput: '1', hidden: true },
      { input: '1000000', expectedOutput: '7', hidden: true },
      { input: '999999999', expectedOutput: '9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_09',
    title: '9. Kiểm tra số Armstrong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số Armstrong</h2>
      <p>Số Armstrong (narcissistic number) là số A có n chữ số và thỏa mãn tổng của lũy thừa bậc n của từng chữ số trong A bằng chính nó.</p>
      <p>Ví dụ: 371 = 3³ + 7³ + 1³ = 27 + 343 + 1 = 371.</p>
      <p>Nhập số nguyên n, kiểm tra xem n có phải là số Armstrong hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>1 nếu là số Armstrong, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>371</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '371', expectedOutput: '1' },
      { input: '153', expectedOutput: '1', hidden: true },
      { input: '154', expectedOutput: '0', hidden: true },
      { input: '370', expectedOutput: '1', hidden: true },
      { input: '407', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_10',
    title: '10. Tam giác Pascal',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác Pascal</h2>
      <p>Nhập số nguyên dương n, in ra n hàng đầu tiên của tam giác Pascal (mỗi hàng trên một dòng, các phần tử cách nhau một khoảng trắng).</p>
      <p>Công thức: C(n,k) = n! / (k!(n-k)!)</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 15)</p>
      <h3>Output</h3>
      <p>n hàng của tam giác Pascal, mỗi hàng trên một dòng, các phần tử cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1<br>1 1<br>1 2 1<br>1 3 3 1<br>1 4 6 4 1</td></tr>
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
    id: 'ch28_b5_11',
    title: '11. Kiểm tra số Fibonacci',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số Fibonacci</h2>
      <p>Nhập số nguyên n, kiểm tra xem n có thuộc dãy Fibonacci hay không. In 1 nếu thỏa mãn, 0 nếu ngược lại.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>1 nếu là số Fibonacci, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '8', expectedOutput: '1' },
      { input: '13', expectedOutput: '1', hidden: true },
      { input: '7', expectedOutput: '0', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_12',
    title: '12. Số nguyên tố có tổng chữ số chia hết cho 5',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố có tổng chữ số chia hết cho 5</h2>
      <p>Nhập số nguyên n, liệt kê các số nguyên tố nhỏ hơn n và có tổng các chữ số chia hết cho 5 (các số cách nhau một khoảng trắng), rồi in ra số lượng.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (2 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Dòng 1: các số nguyên tố cách nhau một khoảng trắng<br>Dòng 2: số lượng các số đó</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100</td><td>5 19 23 37 41 73<br>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '100', expectedOutput: '5 19 23 37 41 73\n6' },
      { input: '50', expectedOutput: '5 19 23 37 41\n5', hidden: true },
      { input: '30', expectedOutput: '5 19 23\n3', hidden: true },
      { input: '10', expectedOutput: '5\n1', hidden: true },
      { input: '200', expectedOutput: '5 19 23 37 41 59 73 97 101 103 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199\n28', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_13',
    title: '13. Số thuận nghịch không chứa chữ số 9',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số thuận nghịch không chứa chữ số 9</h2>
      <p>Nhập số nguyên N. Liệt kê các số thuận nghịch (palindrome) lớn hơn 1 và nhỏ hơn N, thỏa mãn không chứa chữ số 9. Sau đó in ra số lượng.</p>
      <h3>Input</h3>
      <p>Một số nguyên N (2 ≤ N ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Dòng 1: các số thỏa mãn cách nhau một khoảng trắng<br>Dòng 2: số lượng các số đó</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100</td><td>2 3 4 5 6 7 8 11 22 33 44 55 66 77 88<br>15</td></tr>
      </table>
    `,
    testCases: [
      { input: '100', expectedOutput: '2 3 4 5 6 7 8 11 22 33 44 55 66 77 88\n15' },
      { input: '50', expectedOutput: '2 3 4 5 6 7 8 11 22 33 44\n11', hidden: true },
      { input: '10', expectedOutput: '2 3 4 5 6 7 8\n7', hidden: true },
      { input: '200', expectedOutput: '2 3 4 5 6 7 8 11 22 33 44 55 66 77 88 101 111 121 131 141 151 161 171 181 191\n25', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_14',
    title: '14. Số nguyên tố có chữ số cuối lớn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố có chữ số cuối lớn nhất</h2>
      <p>Nhập số nguyên n. Liệt kê các số nguyên tố nhỏ hơn n thỏa mãn có chữ số cuối cùng lớn hơn tất cả các chữ số còn lại (không tính chữ số 0 ở đầu). Sau đó in ra số lượng.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (2 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Dòng 1: các số thỏa mãn cách nhau một khoảng trắng<br>Dòng 2: số lượng các số đó</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>200</td><td>2 3 5 7 13 17 19 23 29 37 47 59 67 79 89 103 107 109 113 127 137 139 149 157 167 179<br>26</td></tr>
      </table>
    `,
    testCases: [
      { input: '200', expectedOutput: '2 3 5 7 13 17 19 23 29 37 47 59 67 79 89 103 107 109 113 127 137 139 149 157 167 179\n26' },
      { input: '100', expectedOutput: '2 3 5 7 13 17 19 23 29 37 47 59 67 79 89\n15', hidden: true },
      { input: '30', expectedOutput: '2 3 5 7 13 17 19 23 29\n9', hidden: true },
      { input: '10', expectedOutput: '2 3 5 7\n4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_15',
    title: '15. Sắp xếp theo tổng chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sắp xếp theo tổng chữ số</h2>
      <p>Nhập hai số nguyên a và b. Sắp xếp a, b theo thứ tự tăng dần tổng các chữ số.</p>
      <p>Nếu a và b có cùng tổng chữ số thì in a trước.</p>
      <h3>Input</h3>
      <p>Hai số nguyên a và b (1 ≤ a, b ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Hai số a, b theo thứ tự tăng dần tổng chữ số, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>99 1111</td><td>1111 99</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>99 có tổng chữ số = 18, 1111 có tổng chữ số = 4. Vì 4 < 18 nên 1111 in trước.</p>
    `,
    testCases: [
      { input: '99 1111', expectedOutput: '1111 99' },
      { input: '5 5', expectedOutput: '5 5', hidden: true },
      { input: '123 321', expectedOutput: '123 321', hidden: true },
      { input: '1000 19', expectedOutput: '19 1000', hidden: true },
      { input: '999 10', expectedOutput: '10 999', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_16',
    title: '16. Số đẹp (chia hết cho p và p²)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu tồn tại ít nhất một số nguyên tố p sao cho số đó đồng thời chia hết cho p và chia hết cho p².</p>
      <p>Liệt kê các số đẹp trong đoạn [L, R] (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương L và R (1 ≤ L ≤ R ≤ 10^4)</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 50</td><td>4 8 9 12 16 18 20 24 25 27 28 32 36 40 44 45 48 49 50</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Ví dụ: 4 chia hết cho 2 và 4 (2²), 9 chia hết cho 3 và 9 (3²), 12 chia hết cho 2 và 4 (2²), v.v.</p>
    `,
    testCases: [
      { input: '1 50', expectedOutput: '4 8 9 12 16 18 20 24 25 27 28 32 36 40 44 45 48 49 50' },
      { input: '1 20', expectedOutput: '4 8 9 12 16 18 20', hidden: true },
      { input: '10 30', expectedOutput: '12 16 18 20 24 25 27 28', hidden: true },
      { input: '1 10', expectedOutput: '4 8 9', hidden: true },
      { input: '1 100', expectedOutput: '4 8 9 12 16 18 20 24 25 27 28 32 36 40 44 45 48 49 50 52 54 56 60 63 64 68 72 75 76 80 84 88 90 92 96 98 99 100', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_17',
    title: '17. Phân tích thừa số nguyên tố (pxpxp)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân tích thừa số nguyên tố</h2>
      <p>Nhập một số nguyên n. Phân tích n thành các thừa số nguyên tố theo định dạng: mỗi thừa số nguyên tố được viết lặp lại đúng bằng số mũ của nó, các nhóm cách nhau bởi ký tự <code>x</code>.</p>
      <p>Ví dụ: 28 = 2² × 3⁰ × 7¹ → in ra: <code>2x2x7</code> (2 lặp 2 lần, không có 3, 7 lặp 1 lần)</p>
      <h3>Input</h3>
      <p>Một số nguyên n (2 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các thừa số nguyên tố theo định dạng p×p×...×p (không có ký tự giữa các số 2)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>28</td><td>2x2x7</td></tr>
      </table>
    `,
    testCases: [
      { input: '28', expectedOutput: '2x2x7' },
      { input: '12', expectedOutput: '2x2x3', hidden: true },
      { input: '100', expectedOutput: '2x2x5x5', hidden: true },
      { input: '360', expectedOutput: '2x2x2x3x3x5', hidden: true },
      { input: '7', expectedOutput: '7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_18',
    title: '18. Liệt kê chữ số nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê chữ số nguyên tố</h2>
      <p>Nhập một số nguyên n. Đếm số lần xuất hiện của các chữ số nguyên tố (2, 3, 5, 7) trong n. Liệt kê theo thứ tự xuất hiện của các chữ số nguyên tố (mỗi chữ số chỉ liệt kê một lần).</p>
      <p>Với mỗi chữ số nguyên tố xuất hiện, in ra dòng: <code>x:y</code> (chữ số:số lần xuất hiện).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Mỗi dòng ghi chữ số nguyên tố và số lần xuất hiện trong n, theo thứ tự xuất hiện trong số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3112345</td><td>3:2\n2:1\n5:1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>3112345 chứa các chữ số nguyên tố: 3 (xuất hiện 2 lần), 2 (1 lần), 5 (1 lần)</p>
    `,
    testCases: [
      { input: '3112345', expectedOutput: '3:2\n2:1\n5:1' },
      { input: '2357', expectedOutput: '2:1\n3:1\n5:1\n7:1', hidden: true },
      { input: '123', expectedOutput: '2:1\n3:1', hidden: true },
      { input: '222', expectedOutput: '2:3', hidden: true },
      { input: '999', expectedOutput: '', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_19',
    title: '19. Số nguyên tố thuận nghịch đôi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố thuận nghịch đôi</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu nó là số nguyên tố và số đảo ngược của nó cũng là số nguyên tố và khác với số ban đầu.</p>
      <p>Liệt kê các số đẹp trong đoạn [L, R] (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương L và R (1 ≤ L ≤ R ≤ 10^4)</p>
      <h3>Output</h3>
      <p>Các số thỏa mãn cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 50</td><td>13 17 31 37</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>13 là số nguyên tố, đảo ngược 31 cũng là số nguyên tố và khác 13 → thỏa mãn.</p>
    `,
    testCases: [
      { input: '1 50', expectedOutput: '13 17 31 37' },
      { input: '1 100', expectedOutput: '13 17 31 37 79 97', hidden: true },
      { input: '100 200', expectedOutput: '107 113 149 157 167 179', hidden: true },
      { input: '1 10', expectedOutput: '', hidden: true },
      { input: '200 300', expectedOutput: '211 227 229 239 241 269 277', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b5_20',
    title: '20. Số đẹp (điều kiện tương tự B16)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu với mỗi thừa số nguyên tố p của nó, số đó đều chia hết cho p².</p>
      <p>Nói cách khác: mỗi ước nguyên tố của n đều xuất hiện với số mũ ít nhất là 2.</p>
      <p>Liệt kê các số đẹp trong đoạn [L, R].</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương L và R (1 ≤ L ≤ R ≤ 10^4)</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 50</td><td>4 8 9 16 25 27 32 36 49</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>4=2² ✓, 8=2³ ✓ (2 có mũ 3≥2), 9=3² ✓, 16=2⁴ ✓, 25=5² ✓, 27=3³ ✓, 32=2⁵ ✓, 36=2²×3² ✓, 49=7² ✓.</p>
    `,
    testCases: [
      { input: '1 50', expectedOutput: '4 8 9 16 25 27 32 36 49' },
      { input: '1 20', expectedOutput: '4 8 9 16 18', hidden: true },
      { input: '1 100', expectedOutput: '4 8 9 16 18 25 27 32 36 49 50 52 54 56 60 63 64 68 72 75 76 80 84 88 90 92 96 98 99 100', hidden: true },
      { input: '1 10', expectedOutput: '4 8 9', hidden: true },
      { input: '50 100', expectedOutput: '50 52 54 56 60 63 64 68 72 75 76 80 84 88 90 92 96 98 99 100', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
