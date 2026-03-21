// Buổi 7: VẼ HÌNH (NÂNG CAO)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi7_lessons: Lesson[] = [
  {
    id: 'ch28_b7_01',
    title: '1. Hình chữ nhật 1 và 0',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật 1 và 0</h2>
      <p>Viết chương trình nhập vào n và in ra hình chữ nhật n x n theo quy luật xen kẽ 1 và 0 theo ô.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ô (i,j) có giá trị 1 nếu (i+j) chẵn, 0 nếu lẻ. Không có khoảng trắng giữa các số.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>10101\n01010\n10101\n01010\n10101</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '10101\n01010\n10101\n01010\n10101' },
      { input: '3', expectedOutput: '101\n010\n101', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1010\n0101\n1010\n0101', hidden: true },
      { input: '2', expectedOutput: '10\n01', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_02',
    title: '2. Hình chữ nhật số tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật số tăng dần</h2>
      <p>Viết chương trình nhập vào n và in ra hình chữ nhật n x n. Ô (i,j) có giá trị i+j+1 (không có khoảng trắng giữa các số).</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i có các số i+1, i+2, ..., i+n ghép liền nhau.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>12345\n23456\n34567\n45678\n56789</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '12345\n23456\n34567\n45678\n56789' },
      { input: '3', expectedOutput: '123\n234\n345', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1234\n2345\n3456\n4567', hidden: true },
      { input: '2', expectedOutput: '12\n23', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_03',
    title: '3. Hình chữ nhật số tăng dần có khoảng trắng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật số tăng dần có khoảng trắng</h2>
      <p>Viết chương trình nhập vào n và in ra hình chữ nhật n x n với các số từ 1 đến n*n điền theo thứ tự, mỗi số cách nhau một khoảng trắng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i chứa n số từ i*n+1 đến (i+1)*n, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '1 2 3 4 5\n6 7 8 9 10\n11 12 13 14 15\n16 17 18 19 20\n21 22 23 24 25' },
      { input: '3', expectedOutput: '1 2 3\n4 5 6\n7 8 9', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16', hidden: true },
      { input: '2', expectedOutput: '1 2\n3 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_04',
    title: '4. Hình chữ nhật số xiên',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật số xiên</h2>
      <p>Viết chương trình nhập vào n và in ra hình chữ nhật n x n theo quy luật: dòng i có (n-i-1) dấu ngã và (i+1) số (i+1) ghép liền nhau.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng đầu: (n-1) dấu ngã + "1". Dòng tiếp: (n-2) dấu ngã + "22". Cứ thế đến dòng cuối: (n-1) số n ghép liền.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~1\n~~~22\n~~333\n~4444\n55555</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~1\n~~~22\n~~333\n~4444\n55555' },
      { input: '3', expectedOutput: '~~1\n~22\n333', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '~~~1\n~~22\n~333\n4444', hidden: true },
      { input: '2', expectedOutput: '~1\n22', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_05',
    title: '5. Ma trận đường chéo rắn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận đường chéo rắn</h2>
      <p>Viết chương trình nhập vào n và in ra ma trận n x n theo quy luật đường chéo rắn. Các đường chéo song song với đường chéo chính được đánh số theo thứ tự từ trên xuống, đường chéo đi lên thì điền ngược.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ma trận n x n, mỗi dòng chỉ hiển thị các phần tử nằm trên đường chéo, các vị trí trống bỏ qua.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15' },
      { input: '3', expectedOutput: '1\n2 3\n4 5 6', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1\n2 3\n4 5 6\n7 8 9 10', hidden: true },
      { input: '2', expectedOutput: '1\n2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_06',
    title: '6. Ma trận đồng tâm',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận đồng tâm</h2>
      <p>Viết chương trình nhập vào n và in ra ma trận vuông (2n-1) x (2n-1) gồm các vòng đồng tâm. Vòng ngoài cùng điền toàn số n, vòng trong điền n-1, cứ thế đến vòng trong cùng điền 1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ma trận (2n-1) dòng, mỗi dòng (2n-1) ký tự số, không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>555555555\n544444445\n543333345\n543222345\n543212345\n543222345\n543333345\n544444445\n555555555</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '555555555\n544444445\n543333345\n543222345\n543212345\n543222345\n543333345\n544444445\n555555555' },
      { input: '3', expectedOutput: '33333\n32223\n32123\n32223\n33333', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '44444\n43334\n43234\n43334\n44444', hidden: true },
      { input: '2', expectedOutput: '222\n212\n222', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_07',
    title: '7. Tam giác số giảm dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số giảm dần</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số n x n: ô (i,j) nếu j <= i thì = n-i+j, ngược lại = n-i.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Tam giác vuông n dòng, mỗi dòng n ký tự số không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>55555\n45444\n34533\n23452\n12345</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '55555\n45444\n34533\n23452\n12345' },
      { input: '3', expectedOutput: '333\n232\n123', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '4444\n3433\n2322\n1231', hidden: true },
      { input: '2', expectedOutput: '22\n12', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_08',
    title: '8. Ma trận xoắn ốc',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoắn ốc</h2>
      <p>Viết chương trình nhập vào n và in ra ma trận vuông n x n được điền theo thứ tự xoắn ốc ngược chiều kim đồng hồ bắt đầu từ góc trên trái.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ma trận n x n, các số ghép liền nhau không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>12345\n16171819\n21222324\n31323334\n4142434445</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '12345\n16171819\n21222324\n31323334\n4142434445' },
      { input: '3', expectedOutput: '123\n161718\n212223', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1234\n161718\n212223\n313233', hidden: true },
      { input: '2', expectedOutput: '12\n34', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_09',
    title: '9. Ma trận max',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận max</h2>
      <p>Viết chương trình nhập vào n và in ra ma trận n x n với quy luật: ô (i,j) = max(i,j) + 1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ma trận n dòng, mỗi dòng n ký tự số không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>12345\n22345\n33345\n44445\n55555</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '12345\n22345\n33345\n44445\n55555' },
      { input: '3', expectedOutput: '123\n223\n333', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1234\n2234\n3334\n4444', hidden: true },
      { input: '2', expectedOutput: '12\n22', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_10',
    title: '10. Tam giác số tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số tăng dần</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số: dòng i có i số từ 1 đến i, căn phải bằng dấu ngã.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i: (n-i) dấu ngã + chuỗi "123...i".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~1\n~~~12\n~~123\n~1234\n12345</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~1\n~~~12\n~~123\n~1234\n12345' },
      { input: '3', expectedOutput: '~~1\n~12\n123', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '~~~1\n~~12\n~123\n1234', hidden: true },
      { input: '2', expectedOutput: '~1\n12', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_11',
    title: '11. Tam giác số xiên',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số xiên</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số xiên. Các đường chéo được điền số tăng dần theo thứ tự, đường chéo đi lên thì điền ngược.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Tam giác với các số từ 1 đến n*(n+1)/2, hiển thị theo quy luật đường chéo xiên, căn phải bằng dấu ngã.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~1\n~~~2 3\n~~4 5 6\n~7 8 9 10\n11 12 13 14 15</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~1\n~~~2 3\n~~4 5 6\n~7 8 9 10\n11 12 13 14 15' },
      { input: '3', expectedOutput: '~~1\n~2 3\n4 5 6', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '~~~1\n~~2 3\n~4 5 6\n7 8 9 10', hidden: true },
      { input: '2', expectedOutput: '~1\n2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_12',
    title: '12. Tam giác lũy thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác lũy thừa</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số: dòng i (1-indexed) chứa i số đầu tiên của dãy lũy thừa 2 (1, 2, 4, 8, ...), căn phải bằng dấu ngã.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i: (n-i) dấu ngã + i số lũy thừa 2 đầu tiên, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~1\n~~~1 2\n~~1 2 4\n~1 2 4 8\n1 2 4 8 16</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~1\n~~~1 2\n~~1 2 4\n~1 2 4 8\n1 2 4 8 16' },
      { input: '3', expectedOutput: '~~1\n~1 2\n1 2 4', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '~~~1\n~~1 2\n~1 2 4\n1 2 4 8', hidden: true },
      { input: '2', expectedOutput: '~1\n1 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_13',
    title: '13. Ma trận xoắn ốc tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Ma trận xoắn ốc tăng dần</h2>
      <p>Viết chương trình nhập vào n và in ra ma trận vuông n x n được điền xoắn ốc từ ngoài vào trong theo chiều kim đồng hồ, bắt đầu từ 1 ở góc trên trái.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Ma trận n x n, các số ghép liền nhau không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4</td><td>1234\n12131415\n11161516\n1098767</td></tr>
      </table>
    `,
    testCases: [
      { input: '4', expectedOutput: '1234\n12131415\n11161516\n1098767' },
      { input: '3', expectedOutput: '123\n161718\n212223', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '12345\n16171819\n21222324\n31323334\n4142434445', hidden: true },
      { input: '2', expectedOutput: '12\n34', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_14',
    title: '14. Tam giác Fibonacci',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác Fibonacci</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số: dòng i chứa i số Fibonacci đầu tiên, mỗi số cách nhau bởi khoảng trắng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i (1-indexed) chứa i số Fibonacci đầu tiên (bắt đầu từ F1=1, F2=1).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1\n1 1\n1 1 2\n1 1 2 3\n1 1 2 3 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '1\n1 1\n1 1 2\n1 1 2 3\n1 1 2 3 5' },
      { input: '3', expectedOutput: '1\n1 1\n1 1 2', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1\n1 1\n1 1 2\n1 1 2 3', hidden: true },
      { input: '2', expectedOutput: '1\n1 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_15',
    title: '15. Tam giác số lẻ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số lẻ</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số lẻ: bắt đầu từ 2, dòng i chứa i số lẻ đầu tiên.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i chứa i số lẻ đầu tiên, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>2\n2 4\n2 4 6\n2 4 6 8\n2 4 6 8 10</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '2\n2 4\n2 4 6\n2 4 6 8\n2 4 6 8 10' },
      { input: '3', expectedOutput: '2\n2 4\n2 4 6', hidden: true },
      { input: '1', expectedOutput: '2', hidden: true },
      { input: '4', expectedOutput: '2\n2 4\n2 4 6\n2 4 6 8', hidden: true },
      { input: '2', expectedOutput: '2\n2 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b7_16',
    title: '16. Tam giác số lẻ có dấu ngã',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số lẻ có dấu ngã</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số lẻ căn phải bằng dấu ngã. Bắt đầu từ 2, dòng i chứa i số lẻ đầu tiên.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i: (n-i) dấu ngã + i số lẻ đầu tiên, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~2\n~~~2 4\n~~2 4 6\n~2 4 6 8\n2 4 6 8 10</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~2\n~~~2 4\n~~2 4 6\n~2 4 6 8\n2 4 6 8 10' },
      { input: '3', expectedOutput: '~~2\n~2 4\n2 4 6', hidden: true },
      { input: '1', expectedOutput: '2', hidden: true },
      { input: '4', expectedOutput: '~~~2\n~~2 4\n~2 4 6\n2 4 6 8', hidden: true },
      { input: '2', expectedOutput: '~2\n2 4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
