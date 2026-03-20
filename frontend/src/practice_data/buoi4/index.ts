// Buổi 4: SỐ NGUYÊN TỐ VÀ CÁC DẠNG ĐẶC BIỆT

import { Lesson } from '../../courses';

const DEFAULT_CODE = `use std::io;

fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi4_lessons: Lesson[] = [
  {
    id: 'ch28_b4_01',
    title: '1. Tìm số thuần nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tìm số thuần nguyên tố</h2>
      <p>Một số được coi là <strong>thuần nguyên tố</strong> nếu nó là số nguyên tố, tất cả các chữ số là nguyên tố và tổng chữ số của nó cũng là một số nguyên tố.</p>
      <p>Đếm xem trong đoạn [L, R] có bao nhiêu số thuần nguyên tố.</p>
      <h3>Input</h3>
      <p>Hai số nguyên L và R (1 ≤ L ≤ R ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Số lượng số thuần nguyên tố trong đoạn</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>23 199</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '23 199', expectedOutput: '1' },
      { input: '1 100', expectedOutput: '5', hidden: true },
      { input: '100 300', expectedOutput: '2', hidden: true },
      { input: '1 1000', expectedOutput: '15', hidden: true },
      { input: '500 1000', expectedOutput: '5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_02',
    title: '2. Số hoàn hảo trong đoạn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số hoàn hảo trong đoạn</h2>
      <p>Viết chương trình nhập vào hai số nguyên dương a và b (a có thể lớn hơn b), tìm tất cả các số hoàn hảo trong khoảng đó.</p>
      <p><em>Số hoàn hảo là số có tổng các ước số nhỏ hơn nó bằng chính nó. Ví dụ: 6 = 1 + 2 + 3.</em></p>
      <p>Nếu không tồn tại số nào thì in ra 0.</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương a và b (1 ≤ a, b ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số hoàn hảo cách nhau một khoảng trắng, hoặc 0 nếu không có</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 100</td><td>6 28</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 100', expectedOutput: '6 28' },
      { input: '1 1000', expectedOutput: '6 28 496', hidden: true },
      { input: '100 500', expectedOutput: '496', hidden: true },
      { input: '500 1000', expectedOutput: '0', hidden: true },
      { input: '1 10000', expectedOutput: '6 28 496 8128', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_03',
    title: '3. Số tăng giảm nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số tăng giảm nguyên tố</h2>
      <p>Một số được gọi là <strong>số tăng giảm</strong> nếu các chữ số thỏa mãn hoặc tăng dần, hoặc giảm dần từ trái qua phải.</p>
      <p>Đếm các số nguyên tố là số tăng giảm với số chữ số cho trước.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10)</p>
      <h3>Output</h3>
      <p>Số lượng số nguyên tố là số tăng giảm có n chữ số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>20</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: '20' },
      { input: '1', expectedOutput: '4', hidden: true },
      { input: '3', expectedOutput: '38', hidden: true },
      { input: '4', expectedOutput: '50', hidden: true },
      { input: '5', expectedOutput: '38', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_04',
    title: '4. Số đẹp (tổng chữ số thuộc Fibonacci)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu nó là số nguyên tố và tổng các chữ số là một số trong dãy Fibonacci.</p>
      <p>Liệt kê các số đẹp trong đoạn [L, R] (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Hai số nguyên L và R (1 ≤ L ≤ R ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 50</td><td>2 3 5 11 17 23 41</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 50', expectedOutput: '2 3 5 11 17 23 41' },
      { input: '1 100', expectedOutput: '2 3 5 11 17 23 41 53 67 71', hidden: true },
      { input: '100 200', expectedOutput: '101 107 113 131 139 157 193', hidden: true },
      { input: '1 10', expectedOutput: '2 3 5', hidden: true },
      { input: '50 100', expectedOutput: '53 67 71', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_05',
    title: '5. Dãy Fibonacci',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Dãy Fibonacci</h2>
      <p>Dãy số Fibonacci được định nghĩa: F₀ = 0, F₁ = 1; Fᵢ = Fᵢ₋₁ + Fᵢ₋₂.</p>
      <p>Nhập số nguyên dương n (2 ≤ n ≤ 92), in ra n số Fibonacci đầu tiên <strong>liền nhau không có khoảng trắng</strong>.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (2 ≤ n ≤ 92)</p>
      <h3>Output</h3>
      <p>n số Fibonacci đầu tiên, viết liền nhau không có khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>01123</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>F₀=0, F₁=1, F₂=1, F₃=2, F₄=3 → "01123"</p>
    `,
    testCases: [
      { input: '5', expectedOutput: '01123' },
      { input: '10', expectedOutput: '0112358132134', hidden: true },
      { input: '2', expectedOutput: '01', hidden: true },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '15', expectedOutput: '01123581321345589144233377', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_06',
    title: '6. Phân tích thừa số nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân tích thừa số nguyên tố</h2>
      <p>Viết chương trình phân tích một số nguyên dương n thành các thừa số nguyên tố theo dạng:</p>
      <p style="font-weight:bold; text-align:center;">n = p₁<sup>e₁</sup> × p₂<sup>e₂</sup> × ...</p>
      <p>In ra: với mỗi thừa số nguyên tố, in liền nhau <code>prime</code> rồi <code>exponent</code> (không có khoảng trắng).</p>
      <p>Ví dụ: 28 = 2² × 7¹ → in ra: <code>227</code> (= 2, exponent 2, 7, exponent 1)</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (2 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các cặp "p e" cách nhau một khoảng trắng (p là thừa số nguyên tố, e là số mũ)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>28</td><td>2 3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>28 = 2² × 3¹ → in ra: "2 3" (2 có mũ 2, 3 có mũ 1)</p>
    `,
    testCases: [
      { input: '28', expectedOutput: '227' },
      { input: '12', expectedOutput: '223', hidden: true },
      { input: '100', expectedOutput: '2255', hidden: true },
      { input: '360', expectedOutput: '222335', hidden: true },
      { input: '7', expectedOutput: '7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_07',
    title: '7. Số đẹp (thuận nghịch, ≥3 ước nguyên tố)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu nó là số thuận nghịch (palindrome) và có ít nhất 3 ước số nguyên tố khác nhau.</p>
      <p>Liệt kê các số đẹp trong đoạn [L, R].</p>
      <h3>Input</h3>
      <p>Hai số nguyên L và R (1 ≤ L ≤ R ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau một khoảng trắng (hoặc dòng trống nếu không có)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 100</td><td></td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Trong đoạn [2, 100], không có số nào vừa là palindrome vừa có ít nhất 3 ước nguyên tố khác nhau.</p>
    `,
    testCases: [
      { input: '2 100', expectedOutput: '' },
      { input: '1 100', expectedOutput: '66', hidden: true },
      { input: '100 500', expectedOutput: '222 252 282 414 434 444 474 494', hidden: true },
      { input: '1 1000', expectedOutput: '66 222 252 282 414 434 444 474 494 525 555 585 595 606 616 636 646 666 696 777 828 858 868 888 969', hidden: true },
      { input: '1000 2000', expectedOutput: '1001 1221 1551 1771 1881', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_08',
    title: '8. Số đẹp (thuận nghịch, tổng chia hết cho 10)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu nó có tính chất thuận nghịch (palindrome) và tổng các chữ số chia hết cho 10.</p>
      <p>Cho trước số chữ số, đếm xem có bao nhiêu số đẹp có số chữ số như vậy.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10)</p>
      <h3>Output</h3>
      <p>Số lượng số đẹp có n chữ số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: '1' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '3', expectedOutput: '9', hidden: true },
      { input: '4', expectedOutput: '18', hidden: true },
      { input: '5', expectedOutput: '90', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_09',
    title: '9. Số nguyên tố trong đoạn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố trong đoạn</h2>
      <p>Viết chương trình nhập vào hai số nguyên dương L và R, liệt kê tất cả các số nguyên tố nằm trong khoảng đó (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương L và R (1 ≤ L ≤ R ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số nguyên tố cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 50</td><td>11 13 17 19 23 29 31 37 41 43 47</td></tr>
      </table>
    `,
    testCases: [
      { input: '10 50', expectedOutput: '11 13 17 19 23 29 31 37 41 43 47' },
      { input: '1 10', expectedOutput: '2 3 5 7', hidden: true },
      { input: '1 100', expectedOutput: '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97', hidden: true },
      { input: '50 100', expectedOutput: '53 59 61 67 71 73 79 83 89 97', hidden: true },
      { input: '100 200', expectedOutput: '101 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_10',
    title: '10. Đếm chữ số chẵn lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số chẵn lẻ</h2>
      <p>Nhập một số nguyên dương N không quá 9 chữ số. Đếm xem N có bao nhiêu chữ số chẵn và bao nhiêu chữ số lẻ. In ra hai số cách nhau một khoảng trắng (chẵn trước, lẻ sau).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương N (1 ≤ N ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Hai số: số chữ số chẵn và số chữ số lẻ, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12345678</td><td>4 4</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>12345678 có 4 chữ số chẵn (2, 4, 6, 8) và 4 chữ số lẻ (1, 3, 5, 7)</p>
    `,
    testCases: [
      { input: '12345678', expectedOutput: '4 4' },
      { input: '111111', expectedOutput: '0 6', hidden: true },
      { input: '246810', expectedOutput: '5 1', hidden: true },
      { input: '13579', expectedOutput: '0 5', hidden: true },
      { input: '5', expectedOutput: '0 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_11',
    title: '11. Số Strong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Strong</h2>
      <p>Số Strong là số có tổng giai thừa các chữ số bằng chính nó. Ví dụ: 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145.</p>
      <p>Nhập hai số nguyên dương a và b, liệt kê các số Strong trong khoảng đó (các số cách nhau một khoảng trắng). Nếu không có, in 0.</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương a và b (1 ≤ a, b ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số Strong cách nhau một khoảng trắng, hoặc 0</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 1000</td><td>1 2 145</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 1000', expectedOutput: '1 2 145' },
      { input: '1 100', expectedOutput: '1 2', hidden: true },
      { input: '100 1000', expectedOutput: '145', hidden: true },
      { input: '1 20000', expectedOutput: '1 2 145', hidden: true },
      { input: '20000 50000', expectedOutput: '40585', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_12',
    title: '12. Số lộc phát',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số lộc phát</h2>
      <p>Một số được gọi là <strong>lộc phát</strong> nếu chỉ chứa các chữ số 0, 6, 8.</p>
      <p>Nhập một số nguyên dương không quá 9 chữ số, kiểm tra xem có phải số lộc phát hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương N (1 ≤ N ≤ 10^9)</p>
      <h3>Output</h3>
      <p>1 nếu là số lộc phát, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6068</td><td>1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>6068 chỉ chứa các chữ số 6, 0, 6, 8 → là số lộc phát → 1</p>
    `,
    testCases: [
      { input: '6068', expectedOutput: '1' },
      { input: '123', expectedOutput: '0', hidden: true },
      { input: '888', expectedOutput: '1', hidden: true },
      { input: '6800', expectedOutput: '1', hidden: true },
      { input: '123456', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_13',
    title: '13. Số đẹp (thuận nghịch, chứa 6, tổng có chữ số cuối là 8)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số được coi là <strong>đẹp</strong> nếu thỏa mãn đồng thời:</p>
      <ul>
        <li>Là số thuận nghịch (palindrome)</li>
        <li>Có chứa ít nhất một chữ số 6</li>
        <li>Tổng các chữ số có chữ số cuối cùng là 8 (tức tổng % 10 == 8)</li>
      </ul>
      <p>Liệt kê các số đẹp trong đoạn [L, R].</p>
      <h3>Input</h3>
      <p>Hai số nguyên L và R (1 ≤ L ≤ R ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số đẹp cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 500</td><td>161</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 500', expectedOutput: '161' },
      { input: '1 100', expectedOutput: '', hidden: true },
      { input: '100 500', expectedOutput: '161', hidden: true },
      { input: '1 1000', expectedOutput: '161 666', hidden: true },
      { input: '500 1000', expectedOutput: '666', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_14',
    title: '14. Tích các chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tích các chữ số</h2>
      <p>Nhập vào một số nguyên dương n, tính tích của các chữ số của n. Nếu n có chữ số 0, tích = 0.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tích các chữ số của n</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>24</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1 × 2 × 3 × 4 = 24</p>
    `,
    testCases: [
      { input: '1234', expectedOutput: '24' },
      { input: '100', expectedOutput: '0', hidden: true },
      { input: '5', expectedOutput: '5', hidden: true },
      { input: '999', expectedOutput: '729', hidden: true },
      { input: '1010', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_15',
    title: '15. Liệt kê ước số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê ước số</h2>
      <p>Nhập vào một số nguyên dương n, in ra tất cả các ước số của n theo thứ tự tăng dần (các ước cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các ước số cách nhau một khoảng trắng, theo thứ tự tăng dần</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12</td><td>1 2 3 4 6 12</td></tr>
      </table>
    `,
    testCases: [
      { input: '12', expectedOutput: '1 2 3 4 6 12' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '1 2 4 5 10 20 25 50 100', hidden: true },
      { input: '36', expectedOutput: '1 2 3 4 6 9 12 18 36', hidden: true },
      { input: '7', expectedOutput: '1 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_16',
    title: '16. Số nguyên tố nhỏ hơn n',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số nguyên tố nhỏ hơn n</h2>
      <p>Nhập vào số nguyên dương n, liệt kê tất cả các số nguyên tố nhỏ hơn n (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (2 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số nguyên tố nhỏ hơn n, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>20</td><td>2 3 5 7 11 13 17 19</td></tr>
      </table>
    `,
    testCases: [
      { input: '20', expectedOutput: '2 3 5 7 11 13 17 19' },
      { input: '2', expectedOutput: '', hidden: true },
      { input: '30', expectedOutput: '2 3 5 7 11 13 17 19 23 29', hidden: true },
      { input: '100', expectedOutput: '2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97', hidden: true },
      { input: '10', expectedOutput: '2 3 5 7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_17',
    title: '17. Số Armstrong',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Armstrong</h2>
      <p>Số Armstrong (còn gọi là narcissistic number) là số có tổng lũy thừa bậc n của các chữ số bằng chính nó, trong đó n là số chữ số.</p>
      <p>Ví dụ: 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153.</p>
      <p>Nhập n, liệt kê các số Armstrong nhỏ hơn n (các số cách nhau một khoảng trắng).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các số Armstrong cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1000</td><td>1 2 3 4 5 6 7 8 9 153 370 371 407</td></tr>
      </table>
    `,
    testCases: [
      { input: '1000', expectedOutput: '1 2 3 4 5 6 7 8 9 153 370 371 407' },
      { input: '10', expectedOutput: '1 2 3 4 5 6 7 8 9', hidden: true },
      { input: '200', expectedOutput: '1 2 3 4 5 6 7 8 9 153', hidden: true },
      { input: '10000', expectedOutput: '1 2 3 4 5 6 7 8 9 153 370 371 407 1634 8208 9474', hidden: true },
      { input: '500', expectedOutput: '1 2 3 4 5 6 7 8 9 153 370 371 407', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_18',
    title: '18. Kiểm tra số hoàn hảo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số hoàn hảo</h2>
      <p>Số hoàn hảo là số có tổng các ước số nhỏ hơn nó bằng chính nó. Ví dụ: 6 = 1 + 2 + 3.</p>
      <p>Nhập số nguyên dương n, kiểm tra xem n có phải là số hoàn hảo hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>1 nếu là số hoàn hảo, 0 nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '6', expectedOutput: '1' },
      { input: '28', expectedOutput: '1', hidden: true },
      { input: '1', expectedOutput: '0', hidden: true },
      { input: '12', expectedOutput: '0', hidden: true },
      { input: '496', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_19',
    title: '19. Liệt kê số hoàn hảo',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê số hoàn hảo</h2>
      <p>Nhập vào hai số a và b (a có thể lớn hơn b). Liệt kê các số hoàn hảo trong khoảng [a, b] (các số cách nhau một khoảng trắng). Nếu không có, in 0.</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương a và b (1 ≤ a, b ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Các số hoàn hảo cách nhau một khoảng trắng, hoặc 0</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 1000</td><td>6 28 496</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 1000', expectedOutput: '6 28 496' },
      { input: '1 100', expectedOutput: '6 28', hidden: true },
      { input: '100 500', expectedOutput: '496', hidden: true },
      { input: '500 1000', expectedOutput: '0', hidden: true },
      { input: '1 10000', expectedOutput: '6 28 496 8128', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b4_20',
    title: '20. Phân tích thừa số nguyên tố (mỗi thừa số liệt kê một lần)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân tích thừa số nguyên tố (mỗi thừa số một lần)</h2>
      <p>Nhập vào một số nguyên dương n. Phân tích n thành các thừa số nguyên tố, mỗi thừa số nguyên tố chỉ liệt kê một lần (không liệt kê theo số mũ).</p>
      <p>Ví dụ: 28 = 2² × 7 → liệt kê: 2 7</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (2 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Các thừa số nguyên tố cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>2 5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>10 = 2 × 5 → in ra: "2 5"</p>
    `,
    testCases: [
      { input: '10', expectedOutput: '2 5' },
      { input: '12', expectedOutput: '2 3', hidden: true },
      { input: '28', expectedOutput: '2 7', hidden: true },
      { input: '100', expectedOutput: '2 5', hidden: true },
      { input: '360', expectedOutput: '2 3 5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
