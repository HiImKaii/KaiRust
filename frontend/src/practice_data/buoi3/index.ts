// Buổi 3: VÒNG LẶP

import { Lesson } from '../../courses';

export const buoi3_lessons: Lesson[] = [
  {
    id: 'ch28_b3_01',
    title: '1. Tính tổng từ 1 đến n',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tính tổng từ 1 đến n</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1 + 2 + 3 + ... + n và in kết quả.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>15</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 1 + 2 + 3 + 4 + 5 = 15</p>
    `,
    testCases: [{ input: '5', expectedOutput: '15' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_02',
    title: '2. Tính tổng bình phương',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tính tổng bình phương</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1² + 2² + 3² + ... + n² và in kết quả.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^5)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>14</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 1² + 2² + 3² = 1 + 4 + 9 = 14</p>
    `,
    testCases: [{ input: '3', expectedOutput: '14' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_03',
    title: '3. Tổng các số chia hết cho 3',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng các số chia hết cho 3</h2>
      <p>Nhập vào số nguyên dương n, tính tổng tất cả các số dương không vượt quá n và chia hết cho 3.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng các số chia hết cho 3</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>18</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Các số chia hết cho 3 từ 1 đến 10: 3 + 6 + 9 = 18</p>
    `,
    testCases: [{ input: '10', expectedOutput: '18' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_04',
    title: '4. Tổng điều hòa (3 số thập phân)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng điều hòa (lấy 3 chữ số thập phân)</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1 + 1/2 + 1/3 + ... + 1/n. Lấy 3 chữ số sau dấu phẩy.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 1000)</p>
      <h3>Output</h3>
      <p>Tổng S (lấy 3 chữ số thập phân)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>1.833</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 1 + 1/2 + 1/3 = 1 + 0.5 + 0.333... = 1.833</p>
    `,
    testCases: [{ input: '3', expectedOutput: '1.833' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_05',
    title: '5. Tổng điều hòa (2 số thập phân)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng điều hòa (lấy 2 chữ số thập phân)</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1 + 1/2 + 1/3 + ... + 1/n. Lấy 2 chữ số sau dấu phẩy.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 1000)</p>
      <h3>Output</h3>
      <p>Tổng S (lấy 2 chữ số thập phân)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>1.83</td></tr>
      </table>
    `,
    testCases: [{ input: '3', expectedOutput: '1.83' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_06',
    title: '6. Dãy đan dấu',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Dãy đan dấu</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = -1 + 2 - 3 + 4 - 5 + ... + (-1)ⁿ × n</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4</td><td>2</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = -1 + 2 - 3 + 4 = 2</p>
    `,
    testCases: [{ input: '4', expectedOutput: '2' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_07',
    title: '7. Tổng số chẵn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số chẵn</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 2 + 4 + 6 + 8 + ... + 2n</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>12</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 2 + 4 + 6 = 12</p>
    `,
    testCases: [{ input: '3', expectedOutput: '12' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_08',
    title: '8. Tổng số lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số lẻ</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1 + 3 + 5 + 7 + ... + (2n - 1)</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>9</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 1 + 3 + 5 = 9</p>
    `,
    testCases: [{ input: '3', expectedOutput: '9' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_09',
    title: '9. Tổng lập phương',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng lập phương</h2>
      <p>Nhập vào số nguyên dương n, tính tổng S = 1³ + 2³ + 3³ + ... + n³</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^4)</p>
      <h3>Output</h3>
      <p>Tổng S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>36</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = 1³ + 2³ + 3³ = 1 + 8 + 27 = 36</p>
    `,
    testCases: [{ input: '3', expectedOutput: '36' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_10',
    title: '10. Giai thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Giai thừa</h2>
      <p>Nhập số nguyên không âm n, tính và in ra n! (n giai thừa). Với n = 0 thì 0! = 1.</p>
      <h3>Input</h3>
      <p>Một số nguyên không âm n (0 ≤ n ≤ 20)</p>
      <h3>Output</h3>
      <p>n!</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>120</td></tr>
        <tr><td>0</td><td>1</td></tr>
      </table>
    `,
    testCases: [{ input: '5', expectedOutput: '120' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_11',
    title: '11. Lũy thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Lũy thừa</h2>
      <p>Nhập x, y là các số nguyên không âm, tính x^y và in kết quả.</p>
      <h3>Input</h3>
      <p>Hai số nguyên không âm x, y (0 ≤ x, y ≤ 100)</p>
      <h3>Output</h3>
      <p>x^y</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 3</td><td>8</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>2^3 = 8</p>
    `,
    testCases: [{ input: '2 3', expectedOutput: '8' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_12',
    title: '12. Đếm số chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm số chữ số</h2>
      <p>Nhập vào n (0 ≤ n ≤ 10^18), đếm số lượng chữ số của n và in ra kết quả.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Số chữ số của n</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>123456789</td><td>9</td></tr>
        <tr><td>0</td><td>1</td></tr>
      </table>
    `,
    testCases: [{ input: '123456789', expectedOutput: '9' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_13',
    title: '13. Tổng các chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng các chữ số</h2>
      <p>Nhập vào n (0 ≤ n ≤ 10^18), tính tổng các chữ số của n và in ra kết quả.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Tổng các chữ số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12341</td><td>11</td></tr>
        <tr><td>0</td><td>0</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>1 + 2 + 3 + 4 + 1 = 11</p>
    `,
    testCases: [{ input: '12341', expectedOutput: '11' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_14',
    title: '14. Tổng chữ số chẵn và lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng chữ số chẵn và lẻ</h2>
      <p>Nhập vào n (0 ≤ n ≤ 10^18), tính tổng các chữ số là số chẵn và tổng các chữ số là số lẻ. In ra 2 số trên 2 dòng (chẵn trước, lẻ sau).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Dòng 1: Tổng chữ số chẵn<br>Dòng 2: Tổng chữ số lẻ</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>6<br>4</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Chữ số chẵn: 2, 4 → 2+4=6<br>Chữ số lẻ: 1, 3 → 1+3=4</p>
    `,
    testCases: [{ input: '1234', expectedOutput: '6\n4' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_15',
    title: '15. Đếm chữ số chẵn lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số chẵn và lẻ</h2>
      <p>Nhập vào n (0 ≤ n ≤ 10^18), in ra số lượng chữ số chẵn và số lượng chữ số lẻ của n.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Số lượng chữ số chẵn và số lượng chữ số lẻ, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12111</td><td>1 4</td></tr>
      </table>
    `,
    testCases: [{ input: '12111', expectedOutput: '1 4' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_16',
    title: '16. Đếm chữ số nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số nguyên tố</h2>
      <p>Nhập vào n (0 ≤ n ≤ 10^18). Đếm số lượng chữ số của n là số nguyên tố (2, 3, 5, 7).</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>Số lượng chữ số nguyên tố</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234567</td><td>4</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Các chữ số nguyên tố: 2, 3, 5, 7 → 4 chữ số</p>
    `,
    testCases: [{ input: '1234567', expectedOutput: '4' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_17',
    title: '17. Số đẹp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đẹp</h2>
      <p>Một số đẹp là số có số lượng chữ số lẻ bằng số lượng chữ số chẵn. Nhập n (0 ≤ n ≤ 10^18), kiểm tra xem n có phải là số đẹp không.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (0 ≤ n ≤ 10^18)</p>
      <h3>Output</h3>
      <p>In "YES" nếu là số đẹp, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>111222</td><td>YES</td></tr>
        <tr><td>1234</td><td>NO</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>111222 có 3 chữ số lẻ (1,1,1) và 3 chữ số chẵn (2,2,2)</p>
    `,
    testCases: [{ input: '111222', expectedOutput: 'YES' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_18',
    title: '18. Tổng các số nguyên tố',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân tích thành tổng các số nguyên tố</h2>
      <p>Nhập số nguyên dương n (2 ≤ n ≤ 100000). Phân tích n thành tổng của các số nguyên tố sao cho số lượng các số hạng là lớn nhất. In ra số lượng các số hạng.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (2 ≤ n ≤ 100000)</p>
      <h3>Output</h3>
      <p>Số lượng các số hạng tối đa</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6</td><td>3</td></tr>
        <tr><td>7</td><td>1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>6 = 2 + 2 + 2 → 3 số hạng (toàn số 2)<br>7 là số nguyên tố → 1 số hạng</p>
    `,
    testCases: [{ input: '6', expectedOutput: '3' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_19',
    title: '19. Tìm số có n chữ số chia hết cho t',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tìm số có n chữ số chia hết cho t</h2>
      <p>Nhập n và t (1 ≤ n ≤ 100, 2 ≤ t ≤ 10). Tìm một số có đúng n chữ số và chia hết cho t. Nếu có nhiều đáp án, in bất kỳ. Nếu không có, in -1.</p>
      <h3>Input</h3>
      <p>Hai số nguyên n và t (1 ≤ n ≤ 100, 2 ≤ t ≤ 10)</p>
      <h3>Output</h3>
      <p>Số có n chữ số chia hết cho t, hoặc -1</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 2</td><td>100</td></tr>
      </table>
    `,
    testCases: [{ input: '3 2', expectedOutput: '100' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_20',
    title: '20. Mishka và Chris',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mishka và Chris</h2>
      <p>Mishka và Chris chơi trò chơi xúc xắc n vòng. Mỗi vòng, ai có số lớn hơn thì thắng vòng đó. Tính tổng số vòng thắng của Mishka và Chris. Nếu hòa, in "Friendship is magic! ^_^".</p>
      <h3>Input</h3>
      <p>Dòng đầu: n (1 ≤ n ≤ 100)<br>n dòng tiếp: m_i c_i (1 ≤ m_i, c_i ≤ 6)</p>
      <h3>Output</h3>
      <p>"Mishka", "Chris", hoặc "Friendship is magic! ^_^"</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3<br>3 5<br>2 1<br>4 2</td><td>Mishka</td></tr>
      </table>
    `,
    testCases: [{ input: '3\n3 5\n2 1\n4 2', expectedOutput: 'Mishka' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_21',
    title: '21. Sao Hoa - Ngày nghỉ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Sao Hoa - Tính ngày nghỉ</h2>
      <p>Ở hành tinh Sao Hoa, một năm có n ngày. Một tuần có 5 ngày làm việc + 2 ngày nghỉ. Tính số lượng ngày nghỉ tối thiểu và tối đa trong một năm.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^6)</p>
      <h3>Output</h3>
      <p>Hai số: ngày nghỉ tối thiểu và tối đa, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>14</td><td>4 4</td></tr>
        <tr><td>15</td><td>4 6</td></tr>
      </table>
    `,
    testCases: [{ input: '14', expectedOutput: '4 4' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_22',
    title: '22. Two Knights',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Two Knights</h2>
      <p>Đếm số cách đặt 2 quân mã trên bàn cờ k×k sao cho chúng không tấn công nhau. Hai quân mã được coi là giống nhau.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10000)</p>
      <h3>Output</h3>
      <p>n dòng, dòng thứ i in số cách đặt trên bàn i×i</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4</td><td>0<br>6<br>28<br>96</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Công thức: Tổng số cặp ô - số cặp bị tấn công = k²(k²-1)/2 - 4*(k-1)*(k-2)</p>
    `,
    testCases: [{ input: '4', expectedOutput: '0\n6\n28\n96' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_23',
    title: '23. Chia táo 1',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chia táo 1</h2>
      <p>Có n quả táo và m cái hộp. Tìm số cách chia n quả táo vào m hộp sao cho mỗi hộp có ít nhất 1 quả táo.</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương n, m (1 ≤ m ≤ n ≤ 20)</p>
      <h3>Output</h3>
      <p>Số cách chia</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6 3</td><td>10</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Công thức: C(n-1, m-1) = (n-1)! / ((m-1)!*(n-m)!)</p>
    `,
    testCases: [{ input: '6 3', expectedOutput: '10' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_24',
    title: '24. Chia táo 2',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chia táo 2</h2>
      <p>Có n đứa trẻ và m quả táo. Đếm số cách chia táo cho n đứa trẻ, không nhất thiết đứa trẻ nào cũng phải có táo.</p>
      <h3>Input</h3>
      <p>Hai số nguyên dương n, m (1 ≤ n, m ≤ 20)</p>
      <h3>Output</h3>
      <p>Số cách chia</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 2</td><td>6</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Công thức: C(n+m-1, m-1) hoặc C(n+m-1, n)</p>
    `,
    testCases: [{ input: '3 2', expectedOutput: '6' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_25',
    title: '25. Hoán vị',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hoán vị</h2>
      <p>Tính số hoán vị của n phần tử: P(n, n) = n!</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 20)</p>
      <h3>Output</h3>
      <p>Số hoán vị</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>6</td></tr>
      </table>
    `,
    testCases: [{ input: '3', expectedOutput: '6' }],
    isExercise: true,
  },
  {
    id: 'ch28_b3_26',
    title: '26. Số 0 tận cùng của n!',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số 0 tận cùng của n!</h2>
      <p>Nhập số nguyên dương n (1 ≤ n ≤ 10^9). Đếm số lượng số 0 tận cùng của n! (giai thừa).</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng số 0 tận cùng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>200000</td><td>49998</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Công thức: n/5 + n/25 + n/125 + ... (lấy phần nguyên)</p>
    `,
    testCases: [{ input: '200000', expectedOutput: '49998' }],
    isExercise: true,
  },
];
