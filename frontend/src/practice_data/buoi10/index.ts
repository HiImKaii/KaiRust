// Buổi 10: ĐỆ QUY VÀ MẢNG CƠ BẢN

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi10_lessons: Lesson[] = [
  {
    id: 'ch28_b10_01',
    title: '1. Tổng 1+2+...+n (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng 1+2+...+n</h2>
      <p>Tính S = 1 + 2 + 3 + ... + n bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Giá trị S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '3', expectedOutput: '6' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '55', hidden: true },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '100', expectedOutput: '5050', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_02',
    title: '2. Tổng bình phương (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng bình phương</h2>
      <p>Tính S = 1² + 2² + 3² + ... + n² bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Giá trị S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: '5' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '3', expectedOutput: '14', hidden: true },
      { input: '5', expectedOutput: '55', hidden: true },
      { input: '10', expectedOutput: '385', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_03',
    title: '3. Fibonacci (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số Fibonacci thứ n</h2>
      <p>Tính số Fibonacci thứ n, với F₁=1, F₂=1, Fₙ=Fₙ₋₁+Fₙ₋₂, bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Giá trị Fₙ</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6</td><td>8</td></tr>
      </table>
    `,
    testCases: [
      { input: '6', expectedOutput: '8' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '2', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '55', hidden: true },
      { input: '92', expectedOutput: '7540113804746346429', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_04',
    title: '4. Đếm chữ số (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số</h2>
      <p>Đếm số lượng chữ số của n bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Số lượng chữ số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>4</td></tr>
      </table>
    `,
    testCases: [
      { input: '1234', expectedOutput: '4' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '9', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '2', hidden: true },
      { input: '1000000', expectedOutput: '7', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_05',
    title: '5. Giai thừa (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Giai thừa</h2>
      <p>Tính n! bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số tự nhiên n</p>
      <h3>Output</h3>
      <p>Giá trị n!</p>
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
    id: 'ch28_b10_06',
    title: '6. Số đảo ngược (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số đảo ngược</h2>
      <p>In số đảo ngược của n bằng đệ quy. Ví dụ: 12345 → 54321.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Số đảo ngược (in ra, không có newline sau)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12345</td><td>54321</td></tr>
      </table>
    `,
    testCases: [
      { input: '12345', expectedOutput: '54321' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '10', expectedOutput: '01', hidden: true },
      { input: '100', expectedOutput: '001', hidden: true },
      { input: '987654321', expectedOutput: '123456789', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_07',
    title: '7. UCLN (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>UCLN</h2>
      <p>Tìm ước chung lớn nhất của a và b bằng đệ quy (Euclid).</p>
      <h3>Input</h3>
      <p>Hai số nguyên a, b</p>
      <h3>Output</h3>
      <p>UCLN(a,b)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 20</td><td>10</td></tr>
      </table>
    `,
    testCases: [
      { input: '10 20', expectedOutput: '10' },
      { input: '17 29', expectedOutput: '1', hidden: true },
      { input: '100 25', expectedOutput: '25', hidden: true },
      { input: '0 5', expectedOutput: '5', hidden: true },
      { input: '48 18', expectedOutput: '6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_08',
    title: '8. Chữ số đầu tiên (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số đầu tiên</h2>
      <p>Tìm chữ số đầu tiên (hàng cao nhất) của n bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Chữ số đầu tiên</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>12345</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '12345', expectedOutput: '1' },
      { input: '5', expectedOutput: '5', hidden: true },
      { input: '100', expectedOutput: '1', hidden: true },
      { input: '9', expectedOutput: '9', hidden: true },
      { input: '999', expectedOutput: '9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_09',
    title: '9. Tổng đan dấu (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng đan dấu</h2>
      <p>Tính S = -1 + 2 - 3 + 4 - ... + (-1)ⁿ × n bằng đệ quy.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Giá trị S</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3</td><td>-2</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>S = -1 + 2 - 3 = -2</p>
    `,
    testCases: [
      { input: '3', expectedOutput: '-2' },
      { input: '1', expectedOutput: '-1', hidden: true },
      { input: '2', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '2', hidden: true },
      { input: '5', expectedOutput: '-3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_10',
    title: '10. Tổng điều hòa (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng điều hòa</h2>
      <p>Tính S = 1 + 1/2 + 1/3 + ... + 1/n bằng đệ quy. In kết quả với 2 chữ số thập phân.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Giá trị S với 2 chữ số thập phân</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>1.50</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: '1.50' },
      { input: '1', expectedOutput: '1.00', hidden: true },
      { input: '3', expectedOutput: '1.83', hidden: true },
      { input: '5', expectedOutput: '2.28', hidden: true },
      { input: '10', expectedOutput: '2.93', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_11',
    title: '11. Tổ hợp chập k (đệ quy)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổ hợp chập k của n</h2>
      <p>Tính C(n,k) = n! / (k! × (n-k)!) bằng đệ quy (dùng C(n,k) = C(n-1,k-1) + C(n-1,k)).</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số n và k</p>
      <h3>Output</h3>
      <p>Giá trị C(n,k)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 2</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 2', expectedOutput: '3' },
      { input: '5 2', expectedOutput: '10', hidden: true },
      { input: '10 3', expectedOutput: '120', hidden: true },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '10 0', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_12',
    title: '12. Toàn chữ số lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Toàn chữ số lẻ</h2>
      <p>Kiểm tra n có chứa toàn chữ số lẻ không. Đúng in 1, sai in 0.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>1 nếu đúng, 0 nếu sai</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1357</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '1357', expectedOutput: '1' },
      { input: '135', expectedOutput: '0', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '2', expectedOutput: '0', hidden: true },
      { input: '579', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_13',
    title: '13. Toàn chữ số chẵn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Toàn chữ số chẵn</h2>
      <p>Kiểm tra n có chứa toàn chữ số chẵn không (bao gồm cả số 0). Đúng in 1, sai in 0.</p>
      <h3>Input</h3>
      <p>Một số nguyên dương n</p>
      <h3>Output</h3>
      <p>1 nếu đúng, 0 nếu sai</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>24</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '24', expectedOutput: '1' },
      { input: '246', expectedOutput: '1', hidden: true },
      { input: '20', expectedOutput: '1', hidden: true },
      { input: '2468', expectedOutput: '1', hidden: true },
      { input: '135', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_14',
    title: '14. Tổng chữ số chẵn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng chữ số chẵn</h2>
      <p>Tính tổng các chữ số chẵn của n (không âm).</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Tổng các chữ số chẵn</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>13576</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '13576', expectedOutput: '6' },
      { input: '2468', expectedOutput: '20', hidden: true },
      { input: '135', expectedOutput: '0', hidden: true },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '123456', expectedOutput: '12', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_15',
    title: '15. Tổng chữ số lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng chữ số lẻ</h2>
      <p>Tính tổng các chữ số lẻ của n (không âm).</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Tổng các chữ số lẻ</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1235</td><td>9</td></tr>
      </table>
    `,
    testCases: [
      { input: '1235', expectedOutput: '9' },
      { input: '135', expectedOutput: '9', hidden: true },
      { input: '246', expectedOutput: '0', hidden: true },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '97531', expectedOutput: '25', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_16',
    title: '16. Tích chữ số',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tích chữ số</h2>
      <p>Tính tích các chữ số của n (không âm). Nếu n=0 thì tích=0.</p>
      <h3>Input</h3>
      <p>Một số nguyên n</p>
      <h3>Output</h3>
      <p>Tích các chữ số</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1234</td><td>24</td></tr>
      </table>
    `,
    testCases: [
      { input: '1234', expectedOutput: '24' },
      { input: '0', expectedOutput: '0', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '100', expectedOutput: '0', hidden: true },
      { input: '555', expectedOutput: '125', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_17',
    title: '17. Đếm chữ số chẵn trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số chẵn trong mảng</h2>
      <p>Nhập n và n số nguyên. Đếm số phần tử có toàn chữ số chẵn.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng phần tử có toàn chữ số chẵn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n123456</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>123(đủ chẵn=không), 2(chẵn✓), 3(không), 4(chẵn✓), 5(không), 6(chẵn✓) → 3</p>
    `,
    testCases: [
      { input: '6\n123456', expectedOutput: '3' },
      { input: '5\n24680', expectedOutput: '5', hidden: true },
      { input: '3\n135', expectedOutput: '0', hidden: true },
      { input: '4\n20 40 60 80', expectedOutput: '4', hidden: true },
      { input: '2\n13 24', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_18',
    title: '18. Đếm chữ số lẻ trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số lẻ trong mảng</h2>
      <p>Nhập n và n số nguyên. Đếm số phần tử có toàn chữ số lẻ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng phần tử có toàn chữ số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1113326896</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1113326896', expectedOutput: '6' },
      { input: '5\n13579', expectedOutput: '5', hidden: true },
      { input: '3\n246', expectedOutput: '0', hidden: true },
      { input: '4\n13 57 91 33', expectedOutput: '4', hidden: true },
      { input: '2\n13 24', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_19',
    title: '19. Tổng số chẵn trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số chẵn trong mảng</h2>
      <p>Tính tổng các phần tử có giá trị chẵn trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng các số chẵn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n123556</td><td>2</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n123556', expectedOutput: '2' },
      { input: '5\n1 2 3 4 5', expectedOutput: '6', hidden: true },
      { input: '3\n1 3 5', expectedOutput: '0', hidden: true },
      { input: '4\n2 4 6 8', expectedOutput: '20', hidden: true },
      { input: '1\n0', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_20',
    title: '20. Tổng số lẻ trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số lẻ trong mảng</h2>
      <p>Tính tổng các phần tử có giá trị lẻ trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng các số lẻ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\n77812</td><td>15</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n77812', expectedOutput: '15' },
      { input: '4\n1 3 5 7', expectedOutput: '16', hidden: true },
      { input: '3\n2 4 6', expectedOutput: '0', hidden: true },
      { input: '5\n1 2 3 4 5', expectedOutput: '9', hidden: true },
      { input: '1\n9', expectedOutput: '9', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_21',
    title: '21. Xuất mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xuất mảng</h2>
      <p>Nhập n và n số nguyên, in ra các phần tử trên một dòng, cách nhau bởi khoảng trắng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các phần tử cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n123456</td><td>1 2 3 4 5 6</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n123456', expectedOutput: '1 2 3 4 5 6' },
      { input: '3\n10 20 30', expectedOutput: '10 20 30', hidden: true },
      { input: '1\n42', expectedOutput: '42', hidden: true },
      { input: '5\n1 1 1 1 1', expectedOutput: '1 1 1 1 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_22',
    title: '22. Xuất mảng đảo ngược',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xuất mảng đảo ngược</h2>
      <p>Nhập n và n số nguyên, in ra các phần tử theo thứ tự đảo ngược trên một dòng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Các phần tử đảo ngược, cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\n123456</td><td>6 5 4 3 2 1</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n123456', expectedOutput: '6 5 4 3 2 1' },
      { input: '3\n10 20 30', expectedOutput: '30 20 10', hidden: true },
      { input: '1\n42', expectedOutput: '42', hidden: true },
      { input: '4\n1 2 3 4', expectedOutput: '4 3 2 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_23',
    title: '23. Đếm chữ số phân biệt trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm chữ số phân biệt trong mảng</h2>
      <p>Nhập n và n số nguyên. Đếm số lượng chữ số phân biệt xuất hiện trong mảng.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Số lượng chữ số phân biệt.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8\n11254331</td><td>5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Các chữ số: 1,1,2,5,4,3,3,1. Các chữ số phân biệt: 1,2,3,4,5 → 5.</p>
    `,
    testCases: [
      { input: '8\n11254331', expectedOutput: '5' },
      { input: '5\n11111', expectedOutput: '1', hidden: true },
      { input: '6\n123456', expectedOutput: '6', hidden: true },
      { input: '4\n1000', expectedOutput: '2', hidden: true },
      { input: '3\n101', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_24',
    title: '24. Kiểm tra mảng toàn âm',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra mảng toàn âm</h2>
      <p>Kiểm tra mảng có chứa toàn số âm không. Đúng in 1, sai in 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>1 nếu toàn âm, 0 nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1 2 -5 -5 -92 -95 -88 23 -11 -74</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1 2 -5 -5 -92 -95 -88 23 -11 -74', expectedOutput: '0' },
      { input: '3\n-1 -2 -3', expectedOutput: '1', hidden: true },
      { input: '2\n-1 0', expectedOutput: '0', hidden: true },
      { input: '1\n-5', expectedOutput: '1', hidden: true },
      { input: '5\n-1 -3 -5 -7 -9', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_25',
    title: '25. Tìm max trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tìm số lớn nhất</h2>
      <p>Tìm số lớn nhất trong mảng n phần tử.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Giá trị lớn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>7\n9 1 2 3 11 0 -9</td><td>11</td></tr>
      </table>
    `,
    testCases: [
      { input: '7\n9 1 2 3 11 0 -9', expectedOutput: '11' },
      { input: '3\n5 5 5', expectedOutput: '5', hidden: true },
      { input: '1\n42', expectedOutput: '42', hidden: true },
      { input: '5\n-1 -2 -3 -4 -5', expectedOutput: '-1', hidden: true },
      { input: '4\n0 0 0 1', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b10_26',
    title: '26. Kiểm tra mảng đối xứng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra mảng đối xứng</h2>
      <p>Kiểm tra mảng có đối xứng qua giữa không (đọc xuôi = đọc ngược). Đúng in 1, sai in 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>1 nếu đối xứng, 0 nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10\n1234554321</td><td>1</td></tr>
        <tr><td>6\n123322</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '10\n1234554321', expectedOutput: '1' },
      { input: '6\n123322', expectedOutput: '0' },
      { input: '1\n42', expectedOutput: '1', hidden: true },
      { input: '4\n1 2 2 1', expectedOutput: '1', hidden: true },
      { input: '5\n1 2 3 2 1', expectedOutput: '1', hidden: true },
      { input: '3\n1 2 1', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
